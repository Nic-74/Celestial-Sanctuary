import { contentCollections, replaceContent, setContentPersistence, AppState, EDITABLE_CONFIG } from './common.js?v=20260917-savefix';
import { sealLetter, openLetter } from './letter-lock.js?v=20260917-savefix';
export const CONTENT_LABELS = {gallery:'Gallery',timeline:'Chronicles',letter:'Letters to Zoya',universes:'Alternate Chronicles',voice:'Voice Garden',tome:'Stardust Tome',discover:'Discovery',music:'Music & recordings',extras:'Games, guide & sanctuary',site:'Entrance & site words'};
let driver, base, revisions=[], latest=new Map(), urls=new Set(), ready=false;
const mediaRefs = new Map();
let activeType='gallery', editing, activeFile, epoch=0;
const clone = value=>structuredClone(value);
function serializeAssets(value) {
 if(value instanceof Date)return Number.isNaN(value.getTime())?'':value.toISOString();
 if(Array.isArray(value))return value.map(serializeAssets);
 if(value && typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,serializeAssets(v)]));
 return typeof value==='string' && mediaRefs.has(value)?`drive:${mediaRefs.get(value)}`:value;
}
async function hydrateAssets(value,newURLs) {
 if(value instanceof Date)return Number.isNaN(value.getTime())?'':value.toISOString();
 if(Array.isArray(value))return Promise.all(value.map(v=>hydrateAssets(v,newURLs)));
 if(value&&typeof value==='object')return Object.fromEntries(await Promise.all(Object.entries(value).map(async([k,v])=>[k,await hydrateAssets(v,newURLs)])));
 if(typeof value==='string'&&/^drive:[a-zA-Z0-9_-]+$/.test(value)) {
  const id=value.slice(6);const blob=await(await driver.request(`drive/v3/files/${id}?alt=media`)).blob();const url=URL.createObjectURL(blob);newURLs.add(url);mediaRefs.set(url,id);return url;
 }
 return value;
}
export function requireContentSignIn(type='gallery') {
 if(driver?.signedIn())return true;
 openContentManager(type);
 driver.status('Sign in and connect the private folder, then return to your page’s upload button.');
 return false;
}
export async function uploadContentMedia(file) {
 if(!driver.signedIn()){openContentManager();throw new Error('Sign in before uploading.');}
 if(file.size>20*1024*1024)throw new Error('Choose a file up to 20 MB.');
 await driver.verifyFolder();const asset=await driver.upload({name:file.name,parents:[driver.folder]},file);
 const url=URL.createObjectURL(file);urls.add(url);mediaRefs.set(url,asset.id);return url;
}
const key = (type,id)=>`${type}:${id}`;
const templates = {
 gallery:{caption:'A new memory',year:new Date().getFullYear(),category:'travel',src:''},
 timeline:{title:'A new chapter',year:new Date().toISOString().slice(0,10),desc:'',icon:'✦'},
 letter:{title:'For a future day',date:new Date().toISOString().slice(0,10),text:''},
 universes:{title:'In another universe',era:'',premise:'',icon:'∞',image:'',chapters:[],stats:{chapters:0,words:0,lastUpdated:''}},
 voice:{from:'Nic',to:'Zoya',textNote:'',recordedDate:new Date().toISOString(),audioFile:'',lang:'en',flower:{type:'rose',position:{x:50,y:50}}},
 tome:{title:'A new chapter',author:'Nic',date:new Date().toISOString().slice(0,10),content:''},
 discover:{title:'Somewhere together',date:new Date().toISOString().slice(0,10),description:'',status:'planned',photos:[],link:''},
 music:{title:'Our new song',artist:'Nini & Zoya',src:'',albumArt:'',lyrics:''},extras:{title:'New content',data:[]},site:{title:'Site text',text:''}
};
const titleOf = item=>item.title||item.caption||item.textNote||item.from||item.id;
function message(text) { driver.status(text); }
function safeHTML(html) {
 const template=document.createElement('template');template.innerHTML=html;
 const allowed=new Set(['P','BR','STRONG','EM','B','I','U','UL','OL','LI','BLOCKQUOTE','H2','H3','SPAN']);
 for(const el of [...template.content.querySelectorAll('*')]) {
  if(!allowed.has(el.tagName)){el.replaceWith(document.createTextNode(el.textContent));continue;}
  for(const attr of [...el.attributes])el.removeAttribute(attr.name);
 }
 return template.innerHTML;
}
const escape = text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeItem(value,field='') {
 if(value instanceof Date)return Number.isNaN(value.getTime())?'':value.toISOString();
 if(Array.isArray(value))return value.map(v=>safeItem(v,field));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,safeItem(v,k)]));
 if(typeof value!=='string')return value;
 if(['src','image','audioFile','albumArt','link','then','now'].includes(field)) {
  if(/^(?:https?:\/\/|blob:|photos\/|recordings\/|music\/|$)/.test(value))return value.replace(/["<>]/g,'');
  return '';
 }
 if(field==='lyrics')return value;
 if(field==='content')return safeHTML(value);
 if(['id','driveAssetId'].includes(field))return value.replace(/[^a-zA-Z0-9_-]/g,'');
 if(['year','date','recordedDate','category','status','lang'].includes(field))return escape(value);
 return escape(value);
}
function rawCollection(type) {
 const items=clone(base[type]||[]);const map=new Map(items.map(i=>[i.id,i]));
 for(const record of latest.values())if(record.type===type) {
  if(record.deleted)map.delete(record.itemId);else map.set(record.itemId,{...record.body,id:record.itemId});
 }
 return [...map.values()];
}
export function currentLetters(){return ready?rawCollection('letter'):[];}
async function apply(deferRefresh=false) {
 const myEpoch=epoch;
 const nextURLs=new Set();
 const collections={};
 try {
  for(const type of Object.keys(base)) {
   const items=await hydrateAssets(rawCollection(type),nextURLs);
   for(const item of items) {
    if(item.driveAssetId) {
     const blob=await (await driver.request(`drive/v3/files/${encodeURIComponent(item.driveAssetId)}?alt=media`)).blob();
     if(myEpoch!==epoch){nextURLs.forEach(url=>URL.revokeObjectURL(url));return;}
     const url=URL.createObjectURL(blob);nextURLs.add(url);
     item[type==='voice'?'audioFile':type==='universes'?'image':'src']=url;
    }
   }
   collections[type]=items.map(item=>type==='letter'?item:safeItem(item));
  }
  if(myEpoch!==epoch){nextURLs.forEach(url=>URL.revokeObjectURL(url));return;}
  document.querySelectorAll('audio,video').forEach(el=>el.pause());AppState.music.player?.pause();
  for(const [type,items] of Object.entries(collections))replaceContent(type,items);
  applySiteWords();
  const previous=urls;urls=nextURLs;
  const refresh=()=>{if(myEpoch===epoch)document.dispatchEvent(new Event('sanctuary:content-changed'));};
  // Native save handlers must finish closing their forms before routing tears them down.
  if(deferRefresh)setTimeout(refresh,0);else refresh();
  previous.forEach(url=>URL.revokeObjectURL(url));
 } catch(error) {nextURLs.forEach(url=>URL.revokeObjectURL(url));throw error;}
}
export function resetVault() {
 document.querySelector('#vault-form')?.replaceChildren();
 epoch++;ready=false;revisions=[];latest.clear();editing=null;activeFile=null;
 document.querySelectorAll('.modal-backdrop.active').forEach(el=>{el.classList.remove('active');el.querySelectorAll('input,textarea').forEach(field=>{field.value='';});});
 AppState.quill?.setText('');AppState.gallery.currentPhotoList=[];AppState.chronicleEvents=[];AppState.music.player?.pause();
 if(base)for(const [type,items] of Object.entries(base))replaceContent(type,clone(items));
 urls.forEach(url=>URL.revokeObjectURL(url));urls.clear();mediaRefs.clear();
 document.querySelectorAll('[data-private-letter]').forEach(el=>el.remove());
 applySiteWords();
 document.dispatchEvent(new Event('sanctuary:content-changed'));
}
export async function loadVault() {
 const myEpoch=epoch;
 await driver.verifyFolder();
 const params=new URLSearchParams({q:`'${driver.folder}' in parents and trashed = false and appProperties has { key='sanctuaryMemory' and value='1' }`,fields:'nextPageToken,files(id,createdTime)',pageSize:'100',orderBy:'createdTime'});
 const found=[];let page;
 do {
  if(page)params.set('pageToken',page);
  const result=await (await driver.request(`drive/v3/files?${params}`)).json();
  for(const file of result.files||[]) {
   const record=await (await driver.request(`drive/v3/files/${file.id}?alt=media`)).json();
   if(record.schema===2 && CONTENT_LABELS[record.type] && record.itemId)found.push({...record,fileId:file.id,createdTime:file.createdTime});
   else if(record.schema===1)found.push({schema:2,type:record.attachment?'gallery':'timeline',itemId:`legacy-${file.id}`,fileId:file.id,body:record.attachment?{caption:record.title,year:Number(record.date?.slice(0,4))||2026,category:'memory',driveAssetId:record.attachment.id,src:''}:{title:record.title,year:record.date,desc:record.text,icon:'✦'},createdTime:file.createdTime});
  }
  page=result.nextPageToken;
 }while(page);
 if(myEpoch!==epoch)return;
 revisions=found;latest=new Map();for(const record of found)latest.set(key(record.type,record.itemId),record);
 ready=true;try { await apply();renderManager(); } catch(error) {ready=false;throw error;}
}
async function persist(action,type,id,data,expected) {
 const operationEpoch=epoch;
 if(!driver.signedIn()){openContentManager(type);throw new Error('Sign in to Google Drive, then save again.');}
 if(!ready)await loadVault();
 const rendered=contentCollections()[type]?.find(item=>item.id===id||item.src===id);
 const existing=rawCollection(type).find(item=>item.id===(rendered?.id||id)||item.src===id);
 const itemId=existing?.id||id||crypto.randomUUID();
 const prior=latest.get(key(type,itemId));
 if(expected!==undefined && (prior?.fileId||null)!==expected)throw new Error('This entry changed since you opened it. Reopen the editor before saving.');
 let body=serializeAssets({...existing,...data,id:itemId});
 if(body.driveAssetId)delete body[type==='voice'?'audioFile':type==='universes'?'image':'src'];
 if(type==='letter'&&body.sealed)delete body.text;
 const record={schema:2,type,itemId,previous:prior?.fileId||null,deleted:action==='delete',body:action==='delete'?null:body};
 await driver.verifyFolder();
 const saved=await driver.upload({name:`${type}-${itemId}-${crypto.randomUUID()}.json`,parents:[driver.folder],appProperties:{sanctuaryMemory:'1'}},new Blob([JSON.stringify(record)],{type:'application/json'}));
 if(operationEpoch!==epoch)throw new Error('Session changed. Sign in again to view the saved revision.');
 latest.set(key(type,itemId),{...record,fileId:saved.id});revisions.push({...record,fileId:saved.id});
 await apply(true);renderManager();
 return action==='delete'?true:contentCollections()[type].find(item=>item.id===itemId);
}
function fieldEditor(value,label,onChange) {
 const box=document.createElement('div');box.className='vault-field';
 if(value&&typeof value==='object') {
  const details=document.createElement('details');details.open=label==='Content';
  const summary=document.createElement('summary');summary.textContent=label;details.append(summary);box.append(details);
  const build=()=>{
   [...details.children].slice(1).forEach(el=>el.remove());
   for(const [k,v] of Object.entries(value)) {
    if(['driveAssetId','sealed'].includes(k)||(k==='id'&&label==='Content'))continue;
    const child=fieldEditor(v,Array.isArray(value)?`Item ${Number(k)+1}`:k,next=>{value[k]=next;onChange(value);});
    if(Array.isArray(value)){const remove=document.createElement('button');remove.type='button';remove.textContent='Remove item';remove.onclick=()=>{value.splice(Number(k),1);onChange(value);build();};child.append(remove);}
    details.append(child);
   }
   if(Array.isArray(value)){const add=document.createElement('button');add.type='button';add.textContent='Add item';add.onclick=()=>{value.push(value.length?clone(value[value.length-1]):label==='chapters'?{title:'A new chapter',author:'Nic',date:new Date().toISOString().slice(0,10),content:''}:'');onChange(value);build();};details.append(add);}
  };build();
 }else {
  const labelEl=document.createElement('label');labelEl.textContent=({recordedDate:'Recording date',from:'From',to:'For',text:'Your letter',date:'Date',title:'Title',q:'Question',o:'Answer choices',a:'Correct answer (option number starts at 0)',ans:'Correct option (starts at 0)',src:'Media URL (or upload a file below)',audioFile:'Audio URL (or upload a recording below)',textNote:'Message beside the recording',content:'Chapter text',desc:'Story',premise:'The beginning of this universe'})[label]||label.replace(/([A-Z])/g,' $1');
  const input=document.createElement(typeof value==='string'&&(['text','content','desc','description','premise','textNote','lyrics'].includes(label)||value.length>120)?'textarea':'input');
  if(typeof value==='boolean'){input.type='checkbox';input.checked=value;input.onchange=()=>onChange(input.checked);}
  else {input.value=value??'';if(typeof value==='number')input.type='number';input.oninput=()=>onChange(typeof value==='number'?Number(input.value):input.value);}
  labelEl.append(input);box.append(labelEl);
 }
 return box;
}
function startEdit(type,item) {
 activeType=type;activeFile=latest.get(key(type,item?.id))?.fileId||null;
 editing=serializeAssets(clone(item||templates[type]));delete editing.sealed;
 const form=document.querySelector('#vault-form');form.replaceChildren();
 const fields={voice:['from','to','textNote','recordedDate'],letter:['title','date','text'],music:['title','artist','lyrics'],gallery:['caption','year','category'],timeline:['title','year','desc'],discover:['title','location','date','description','status','link'],tome:['title','author','date','content'],site:['title','eyebrow','tagline','button','photo'] }[type];
 if(fields){for(const name of fields){if(editing[name]===undefined)continue;form.append(fieldEditor(editing[name],name,next=>{editing[name]=next;}));}}
 else form.append(fieldEditor(editing,'Content',next=>{editing=next;}));

 if(['gallery','voice','music','universes'].includes(type)){
  const label=document.createElement('label');label.textContent=type==='voice'?'Choose your voice recording (up to 20 MB)':type==='music'?'Choose an audio file (up to 20 MB)':'Choose a photograph (up to 20 MB)';
  const input=document.createElement('input');input.type='file';input.name='vault-file';input.accept=type==='voice'||type==='music'?'audio/*':'image/jpeg,image/png,image/webp,image/gif';label.append(input);form.append(label);
 }
 if(type==='letter') {
  const label=document.createElement('label');label.textContent='Unlock word or phrase — required for sealed letters';
  const input=document.createElement('input');input.type='password';input.name='unlock-word';input.autocomplete='new-password';label.append(input);form.append(label);
  const note=document.createElement('p');note.textContent='The letter text is encrypted before saving. Keep the exact phrase: it cannot be recovered here. A longer phrase is harder to guess. The title and date remain visible to you both.';form.append(note);
 }
 const save=document.createElement('button');save.type='submit';save.textContent=item?'Save changes to Drive':'Add to this section';form.append(save);
 form.hidden=false;
 form.onsubmit=async event=>{
  event.preventDefault();const editEpoch=epoch;save.disabled=true;const input=form.querySelector('[name=vault-file]');
  try {
   const draft=clone(editing);const file=input?.files?.[0];
   if(file){await driver.verifyFolder();if(file.size>20*1024*1024)throw new Error('Choose a file up to 20 MB.');const asset=await driver.upload({name:file.name,parents:[driver.folder]},file);draft.driveAssetId=asset.id;}
   if(type==='letter'){const word=form.querySelector('[name=unlock-word]').value;if(!word.trim())throw new Error('Enter an unlock word or phrase.');draft.sealed=await sealLetter(draft.text||'',word);delete draft.text;}
   if(editEpoch!==epoch)throw new Error('Session changed. Reopen the editor.');
   message('Saving to Google Drive…');await persist(item?'update':'add',type,item?.id,draft,activeFile);form.reset();form.replaceChildren();form.hidden=true;editing=null;message('Saved permanently to Drive. Open its section to see the update.');
  }catch(error){message(error.message);}finally{save.disabled=false;}
 };
}
function renderManager() {
 const list=document.querySelector('#private-list');if(!list||!base)return;list.replaceChildren();document.querySelector('#vault-add').hidden=['extras','site'].includes(activeType);
 for(const item of rawCollection(activeType)) {
  const article=document.createElement('article'),title=document.createElement('h3');title.textContent=titleOf(item);article.append(title);
  const edit=document.createElement('button');edit.type='button';edit.textContent='Edit';edit.onclick=async()=>{
   if(item.sealed){const word=prompt('Enter this letter’s unlock phrase to edit it:');if(word===null)return;try{const text=await openLetter(item.sealed,word);startEdit(activeType,{...item,text});}catch{message('That phrase did not unlock the letter.');}}else startEdit(activeType,item);
  };article.append(edit);
  const remove=document.createElement('button');remove.type='button';remove.textContent='Archive';remove.onclick=async()=>{if(!confirm('Archive this entry? Its previous versions remain in Drive.'))return;try{await persist('delete',activeType,item.id);message('Entry archived. Previous revisions remain in Drive.');}catch(error){message(error.message);}};if(!['extras','site'].includes(activeType))article.append(remove);
  const history=revisions.filter(record=>record.type===activeType&&record.itemId===item.id&&!record.deleted);
  if(history.length>1){const versions=document.createElement('details');const summary=document.createElement('summary');summary.textContent=`${history.length} saved versions`;versions.append(summary);history.slice().reverse().forEach((record,i)=>{const restore=document.createElement('button');restore.type='button';restore.textContent=`Restore version ${history.length-i}`;restore.onclick=async()=>{try{await persist('update',activeType,item.id,record.body);message('Previous version restored as a new saved revision.');}catch(error){message(error.message);}};versions.append(restore);});article.append(versions);}
  list.append(article);
 }
 const archived=[...latest.values()].filter(record=>record.type===activeType&&record.deleted);
 if(archived.length){const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent=`Archived entries (${archived.length})`;details.append(summary);for(const record of archived){const previous=revisions.filter(r=>r.type===record.type&&r.itemId===record.itemId&&!r.deleted).at(-1);const original=previous?.body||base[activeType]?.find(item=>item.id===record.itemId);if(!original)continue;const restore=document.createElement('button');restore.type='button';restore.textContent=`Restore ${titleOf(original)}`;restore.onclick=async()=>{try{await persist('update',activeType,record.itemId,original);message('Entry restored to its section.');}catch(error){message(error.message);}};details.append(restore);}list.append(details);}
}
export function openContentManager(type='gallery') {
 activeType=CONTENT_LABELS[type]?type:'gallery';driver.open();
 document.querySelector('#vault-type').value=activeType;renderManager();
}
export function mountContentTools(panelId,container) {
 const type={chronicle:'timeline','voice-garden':'voice',oursong:'music',guide:'extras',games:'extras',sanctum:'extras',journey:'extras'}[panelId]||panelId;
 if(!CONTENT_LABELS[type])return;
 const hasOwnEditor=['gallery','discover','chronicle','tome','book','universes','oursong'].includes(panelId);
 const toolbar=document.createElement('div');toolbar.className='vault-toolbar';
 const button=document.createElement('button');button.textContent=({letter:'Write a sealed letter',voice:'Plant a voice message',extras:'Edit this collection',site:'Edit our story'})[type]||`Add / edit ${CONTENT_LABELS[type]}`;button.onclick=()=>{openContentManager(type);if(ready&&['letter','voice'].includes(type))startEdit(type);};toolbar.append(button);if(!hasOwnEditor)container.prepend(toolbar);
 if(type==='letter'&&ready){
  const letters=document.createElement('section');letters.dataset.privateLetter='true';letters.className='sealed-letter-shelf';
  for(const item of currentLetters().filter(item=>item.sealed)){
   const card=document.createElement('article'),title=document.createElement('h3'),date=document.createElement('p'),input=document.createElement('input'),unlock=document.createElement('button'),body=document.createElement('p');
   title.textContent=`✧ ${item.title}`;date.textContent=item.date?`For ${item.date}`:'For a future moment';input.type='password';input.placeholder='Our secret word';input.setAttribute('aria-label','Letter unlock phrase');unlock.textContent='Break the seal';
   const letterEpoch=epoch;unlock.onclick=async()=>{try{const text=await openLetter(item.sealed,input.value);if(letterEpoch!==epoch)return;body.textContent=text;input.value='';}catch{body.textContent='That word did not open this letter. Try again.';}};
   card.append(title,date,input,unlock,body);letters.append(card);
  }container.insertBefore(letters,toolbar.nextSibling);
 }
}
export function initializeVault(api) {
 driver=api;base={};
 for(const [type,items] of Object.entries(contentCollections())) {
  items.forEach((item,i)=>{if(!item.id)item.id=`original-${type}-${i}`;});base[type]=clone(items);
 }
 setContentPersistence(persist);
 const selector=document.querySelector('#vault-type');for(const [type,label]of Object.entries(CONTENT_LABELS)){const option=document.createElement('option');option.value=type;option.textContent=label;selector.append(option);}
 selector.onchange=()=>{activeType=selector.value;document.querySelector('#vault-form').hidden=true;renderManager();};
 document.querySelector('#vault-add').onclick=()=>startEdit(activeType);
 document.addEventListener('sanctuary:edit-content',event=>openContentManager(event.detail?.type));
}

function applySiteWords() {
 const words=EDITABLE_CONFIG.SITE_DATA.find(item=>item.id==='entrance');if(!words)return;
 const decode=value=>{const area=document.createElement('textarea');area.innerHTML=value||'';return area.value;};
 const eyebrow=document.querySelector('.gate-eyebrow'),tagline=document.querySelector('.gate-tagline'),button=document.querySelector('#enter-sanctuary'),photo=document.querySelector('.gate-photo img');
 if(eyebrow)eyebrow.textContent=decode(words.eyebrow);
 if(tagline)tagline.textContent=decode(words.tagline);
 if(button)button.textContent=decode(words.button);
 if(photo && /^(photos\/|https:\/\/)/.test(words.photo))photo.src=words.photo;
}

export async function saveSongLyrics(track,text) {
 if(!driver.signedIn()){openContentManager('extras');throw new Error('Sign in, then add the lyrics again and save.');}
 if(!ready)await loadVault();
 const groups=rawCollection('extras').filter(group=>['dance-playlist','complete-playlist'].includes(group.id)&&group.data.some(item=>item.id===track.id));
 if(!groups.length){const recording=rawCollection('music').find(item=>item.id===track.id);if(recording){await persist('update','music',recording.id,{...recording,lyrics:text});return;}throw new Error('Save this recording through Music & recordings first, then add its lyrics.');}
 for(const group of groups){group.data=group.data.map(item=>item.id===track.id?{...item,lyrics:text}:item);await persist('update','extras',group.id,group);}
}

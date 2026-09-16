const bytesToBase64 = bytes => btoa(Array.from(bytes,byte=>String.fromCharCode(byte)).join(''));
const base64ToBytes = text => Uint8Array.from(atob(text), c=>c.charCodeAt(0));
async function derive(word,salt) {
    const material = await crypto.subtle.importKey('raw',new TextEncoder().encode(word.normalize('NFC')),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:310000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function sealLetter(text,word) {
    if (!word.trim()) throw new Error('Choose an unlock word or phrase.');
    const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
    const key=await derive(word,salt);
    const data=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(text));
    return {version:1,salt:bytesToBase64(salt),iv:bytesToBase64(iv),ciphertext:bytesToBase64(new Uint8Array(data))};
}
export async function openLetter(sealed,word) {
    if(sealed.version!==1) throw new Error('Unsupported letter format.');
    const key=await derive(word,base64ToBytes(sealed.salt));
    const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:base64ToBytes(sealed.iv)},key,base64ToBytes(sealed.ciphertext));
    return new TextDecoder().decode(plain);
}

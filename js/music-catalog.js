import { EXTRA_CONTENT } from './extra-data.js?v=20260917-vault';
export const DANCE_TRACKS=EXTRA_CONTENT.find(item=>item.id==='dance-playlist').data;
export const ALL_TRACKS=EXTRA_CONTENT.find(item=>item.id==='complete-playlist').data;

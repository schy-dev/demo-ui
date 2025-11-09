import api from '../api';

export async function translateText(text: string, targetLang: string, sourceLang: string) {
  console.log({ text, targetLang, sourceLang });
  const res = await api.post('/api/translate', { text, targetLang, sourceLang });
  return res.data; // { ok, translated }
}

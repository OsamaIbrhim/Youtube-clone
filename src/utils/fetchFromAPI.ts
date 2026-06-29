import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export async function fetchFromAPI(url: string) {
  const apiKey = (import.meta as any).env.VITE_RAPID_API_KEY;

  const options = {
    params: {
      maxResults: '50',
    },
    headers: {
      'x-rapidapi-key': apiKey || '',
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
    },
  };

  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
}

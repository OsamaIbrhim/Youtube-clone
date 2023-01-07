const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com',
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': '351cc48875msh43ac37f773fb7b0p1a25dejsn89d03bbece76',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${'https://youtube-v31.p.rapidapi.com'}/${url}` , options);
  return data;
}
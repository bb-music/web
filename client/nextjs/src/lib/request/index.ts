import axios from 'axios';

export const request = axios.create({
  headers: {
    Cookie: '',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
});

export const clientRequest = axios.create();
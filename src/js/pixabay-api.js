import axios from 'axios';

const API_KEY = '52919144-2a7b1f23e18b84640824764ee';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
}

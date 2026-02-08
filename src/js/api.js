import axios from 'axios';
import { showPush } from './pushMessage';

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';

/**
 * Внутрішній "двигун" (Private engine)
 * Обробляє запити, лоадери та помилки в одному місці.
 */
async function apiRequest(method, url, config = {}) {
  try {
    const response = await axios({ method, url, ...config });
    return response.data; // Повертаємо чисті дані
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    showPush(message);
    return null; 
  }
}

/**
 * Експортуємо функції ТАК САМО, як вони називалися раніше.
 * Логіка виклику в компонентах не зміниться.
 */

export const getGenres = () => 
  apiRequest('get', '/genres');

export const getArtists = ({ page = 1, limit }) => 
  apiRequest('get', '/artists', { params: { page, limit } });

export const getArtistById = (id) => 
  apiRequest('get', `/artists/${id}`);

export const getArtistAlbums = (id) => 
  apiRequest('get', `/artists/${id}/albums`);

export const getFeedbacks = (limit) => 
  apiRequest('get', '/feedbacks', { params: { limit } });

export const postFeedback = (data) => 
  apiRequest('post', '/feedbacks', { data });
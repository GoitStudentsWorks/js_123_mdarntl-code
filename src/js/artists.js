console.log('artists');

import { getArtists } from './api';
import { renderArtistCards } from './render-functions';

const page = 1;
const limit = 8;

// Розкоментувати щоб перевірити завантаження карток
// async function loadArtists() {
//   try {
//     const { data } = await getArtists({ page, limit });
//     renderArtistCards(data.artists);
//   } catch (error) {
//     console.error(error);
//   }
// }

// loadArtists();

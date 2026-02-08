import { getArtists } from './api';
import { showPush } from './pushMessage';
import { renderArtistCards } from './render-functions';

const loadMore = document.querySelector('.artists-button');

let page = 1;
const limit = 8;

let artists = [];
let totalArtists = 0;

function showLoadMoreBtn() {
  loadMore.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  loadMore.classList.add('is-hidden');
}

async function loadArtists() {
  const data = await getArtists({ page, limit });
  if (!data) return;
  totalArtists = data.totalArtists;
  renderArtistCards(data.artists);
  artists = [...artists, ...data.artists];
  if (artists.length < totalArtists) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
  }
}
loadArtists();

loadMore.addEventListener('click', loadMoreBtnHandler);

async function loadMoreBtnHandler(e) {
  e.preventDefault();
  page += 1;
  loadMore.disabled = true;
  const data = await getArtists({ page, limit });
  loadMore.disabled = false;
  if (!data) return;
  renderArtistCards(data.artists);
  artists = [...artists, ...data.artists];
  if (artists.length >= totalArtists) {
    hideLoadMoreBtn();
    showPush('You have reached the limit', 'error');
  }
}

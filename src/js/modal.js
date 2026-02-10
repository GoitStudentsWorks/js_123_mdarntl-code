import { getArtistById } from './api';
import { showPush } from './pushMessage';
import { createArtistModalMarkup, createAlbumsMarkup } from './render-functions.js';

const refs = {
  overlay: document.getElementById('artist-modal-overlay'),
  closeBtn: document.getElementById('modal-close'),
  detailsContainer: document.getElementById('artist-details'),
  loader: document.getElementById('loader'),
  artistsList: document.querySelector('.artists-list'),
};

refs.artistsList?.addEventListener('click', onArtistCardClick);

async function onArtistCardClick(e) {
  const target = e.target.closest('.artist-link');
  if (!target) return;
  const id = target.dataset.id;
  openModal(id);
}

async function openModal(id) {
  toggleModal(); 
  addModalListeners();
  showLoader();
  
  refs.detailsContainer.innerHTML = ''; 

  try {
    const artistData = await getArtistById(id);
    if (!artistData) return;

    const allTracks = artistData.tracksList || [];
    const albumsMap = {};

    allTracks.forEach(function(track) {
      const albumName = track.strAlbum || "Other Tracks";
      if (!albumsMap[albumName]) {
        albumsMap[albumName] = { strAlbum: albumName, tracks: [] };
      }
      albumsMap[albumName].tracks.push(track);
    });

    const albumsArray = Object.values(albumsMap);
    renderModalContent(artistData, albumsArray);

  } catch (error) {
    console.error("Помилка при завантаженні даних:", error);
    showPush("Error loading artist details");
  } finally {
    hideLoader();
  }
}

function renderModalContent(artist, albums) {
  const { 
    strArtist, 
    strArtistThumb, 
    intFormedYear, 
    intBornYear, 
    intDiedYear, 
    strCountry, 
    strBiographyEN,
    strGender,    
    intMembers,   
    genres        
  } = artist;

  let yearsActive = "information missing";
  const startYear = intFormedYear || intBornYear;

  if (startYear) {
    const hasFinished = intDiedYear && intDiedYear !== "null" && intDiedYear !== "";
    const endYear = hasFinished ? intDiedYear : "present";
    yearsActive = `${startYear} – ${endYear}`;
  }
  
  const isGroup = intMembers && parseInt(intMembers) > 1;
  const specificInfoMarkup = isGroup 
    ? `<div class="artistModal-info-item">
         <span class="artistModal-info-label">Members</span>
         <p class="artistModal-info-value">${intMembers}</p>
       </div>`
    : `<div class="artistModal-info-item">
         <span class="artistModal-info-label">Sex</span>
         <p class="artistModal-info-value">${strGender || 'Not specified'}</p>
       </div>`;

  const albumsMarkup = createAlbumsMarkup(albums);

  refs.detailsContainer.innerHTML = createArtistModalMarkup({
    artist,
    yearsActive,
    specificInfoMarkup,
    albumsMarkup
  });
}

function toggleModal() {
  refs.overlay?.classList.toggle('is-hidden');
  document.body.style.overflow = refs.overlay?.classList.contains('is-hidden') ? '' : 'hidden';
}

function showLoader() { refs.loader?.classList.remove('is-hidden'); }
function hideLoader() { refs.loader?.classList.add('is-hidden'); }

function closeModal() {
  toggleModal();
  removeModalListeners();
}

function onEscKeydown(e) { 
  if (e.code === 'Escape') closeModal(); 
}

function onBackdropClick(e) { 
  if (e.target === refs.overlay) closeModal(); 
}

function addModalListeners() {
  refs.closeBtn?.addEventListener('click', closeModal);
  refs.overlay?.addEventListener('click', onBackdropClick);
  window.addEventListener('keyup', onEscKeydown);
}

function removeModalListeners() {
  refs.closeBtn?.removeEventListener('click', closeModal);
  refs.overlay?.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keyup', onEscKeydown);
}
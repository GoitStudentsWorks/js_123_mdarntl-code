import { getArtistById } from './api';

const refs = {
  overlay: document.getElementById('artist-modal-overlay'),
  closeBtn: document.getElementById('modal-close'),
  detailsContainer: document.getElementById('artist-details'),
  loader: document.getElementById('loader'),
  artistsList: document.querySelector('.artists-list'),
};

// Слухач на список карток
refs.artistsList?.addEventListener('click', onArtistCardClick);

async function onArtistCardClick(e) {
  const target = e.target.closest('.artist-link');
  if (!target) return;
  const id = target.dataset.id;
  openModal(id);
}

// ОСНОВНА ФУНКЦІЯ
async function openModal(id) {
  toggleModal(); // Тепер вона точно визначена нижче
  showLoader();
  refs.closeBtn.innerHTML = `<svg class="modal-close-icon"><use href="./img/sprite.svg#icon-exit"></use></svg>`;
  refs.detailsContainer.innerHTML = ''; 

  try {
    const artistData = await getArtistById(id);
    console.log("Отримані дані:", artistData);

    // Витягуємо треки з поля tracksList, як ми бачили в консолі
    const allTracks = artistData.tracksList || [];

    // ГРУПУВАННЯ треків по альбомах
    const albumsMap = {};
    allTracks.forEach(track => {
      const albumName = track.strAlbum || "Other Tracks";
      if (!albumsMap[albumName]) {
        albumsMap[albumName] = { strAlbum: albumName, tracks: [] };
      }
      albumsMap[albumName].tracks.push(track);
    });

    const albumsArray = Object.values(albumsMap);

    if (artistData) {
      renderModalContent(artistData, albumsArray);
    }
  } catch (error) {
    console.error("Помилка завантаження:", error);
  } finally {
    hideLoader();
    addModalListeners();
  }
}

function renderModalContent(artist, albums) {
  // ДОДАНО ВСІ ПОЛЯ: strGender, intMembers, genres
  const { 
    strArtist, 
    strArtistThumb, 
    intFormedYear, 
    intBornYear, 
    strDiedYear, 
    strCountry, 
    strBiographyEN,
    strGender,    // <-- тепер визначено
    intMembers,   // <-- тепер визначено
    genres        // <-- тепер визначено
  } = artist;

  const yearsActive = (intFormedYear || intBornYear) 
    ? `${intFormedYear || intBornYear}–${(strDiedYear && strDiedYear !== "null") ? strDiedYear : "present"}`
    : "information missing";

  // Генерація макету альбомів (з шапкою таблиці)
  const albumsMarkup = albums.length > 0 
    ? albums.map(album => {
        return `
        <div class="modal-album-item">
          <h4 class="modal-album-name">${album.strAlbum}</h4>
          <div class="track-header">
            <span>Track</span>
            <span class="text-center">Time</span>
            <span class="text-center">Link</span>
          </div>
          <ul class="modal-track-list">
            ${album.tracks.map(track => {
              const totalSec = Math.floor(track.intDuration / 1000);
              const m = Math.floor(totalSec / 60);
              const s = String(totalSec % 60).padStart(2, '0');
              
              return `
              <li class="track-item">
                <span class="track-name">${track.strTrack}</span>
                <span class="track-duration">${m}:${s}</span>
                <span class="track-link">
                  ${track.movie ? `<a href="${track.movie}" target="_blank" class="yt-link"><svg class="yt-icon" width="24" height="24">
        <use href="./img/sprite.svg#icon-Youtube"></use> 
      </svg></a>` : '-'}
                </span>
              </li>`;
            }).join('')}
          </ul>
        </div>`;
      }).join('')
    : '<p class="no-data">No tracks found</p>';

  // Основна розмітка згідно з твоїм скріншотом
  refs.detailsContainer.innerHTML = `
    <div class="modal-content-wrapper">
      <h2 class="modal-artist-title">${strArtist}</h2>
      <div class="modal-main-img-wrapper">
        <img src="${strArtistThumb}" class="modal-main-img" alt="${strArtist}">
      </div>

      <div class="artist-info-grid">
        <div class="info-item">
          <span class="info-label">Years active</span>
          <p class="info-value">${yearsActive}</p>
        </div>
        <div class="info-item">
          <span class="info-label">Sex</span>
          <p class="info-value">${strGender || 'Male'}</p>
        </div>
        <div class="info-item">
          <span class="info-label">Members</span>
          <p class="info-value">${intMembers || '1'}</p>
        </div>
        <div class="info-item">
          <span class="info-label">Country</span>
          <p class="info-value">${strCountry || 'Unknown'}</p>
        </div>
      </div>

      <div class="modal-bio">
        <span class="info-label">Biography</span>
        <p>${strBiographyEN}</p>
      </div>

      <div class="modal-genres">
        ${(genres || []).map(g => `<span class="genre-tag">${g}</span>`).join('')}
      </div>

      <h2 class="albums-main-title">Albums</h2>
      <div class="modal-albums-section">${albumsMarkup}</div>
    </div>
  `;
}

// ДОПОМІЖНІ ФУНКЦІЇ (щоб не було ReferenceError)
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

function onEscKeydown(e) { if (e.code === 'Escape') closeModal(); }
function onBackdropClick(e) { if (e.target === refs.overlay) closeModal(); }

function addModalListeners() {
  refs.closeBtn?.addEventListener('click', closeModal);
  refs.overlay?.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEscKeydown);
}

function removeModalListeners() {
  refs.closeBtn?.removeEventListener('click', closeModal);
  refs.overlay?.removeEventListener('click', onBackdropClick);
  window.removeEventListener('keydown', onEscKeydown);
}
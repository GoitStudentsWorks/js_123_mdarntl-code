// "Колеги, файл render-functions.js — це наш конструктор HTML.
// Давайте домовимось: вся генерація HTML-рядків живе тільки там. У файлах логіки (api, main) ми просто викликаємо ці функції.
// Так ми не заплутаємось у коді і зможемо легко правити верстку, не ламаючи логіку JS."


const BASE_URL = import.meta.env.BASE_URL || './';

const artistsList = document.querySelector('.artists-list');

//Функція рендеру карток артистів, потрібно передати масив списку артистів.
export function renderArtistCards(artists) {
  const markup = artists
    .map(({ _id, strArtist, strArtistThumb, genres, strBiographyEN }) => {
      const genresMarkup = genres
        .map(genre => `<span class="artist-genre">${genre}</span>`)
        .join('');

      return `
          <li class="artist-card">
            <img
              src="${strArtistThumb}"
              alt="${strArtist}"
              class="artist-img"
            />
            <div class="artist-genres">
              ${genresMarkup}
            </div>
            <h4 class="artist-name">${strArtist}</h4>
            <p class="artist-description">
              ${strBiographyEN}
            </p>
            <button
              type="button"
              class="artist-link"
              data-id="${_id}"
              >
              Learn more
            </button>
          </li>
        `;
    })
    .join('');

  artistsList.insertAdjacentHTML('beforeend', markup);
}

// Функція для створення списку альбомів та треків
export function createAlbumsMarkup(albums) {
  if (albums.length === 0) return '<p class="no-data">No tracks found</p>';

  return albums.map(album => `
    <div class="artistModal-album-item">
      <h4 class="artistModal-album-name">${album.strAlbum}</h4>
      <div class="artistModal-track-header">
        <span>Track</span>
        <span>Time</span>
        <span>Link</span>
      </div>
      <ul class="artistModal-track-list">
        ${album.tracks.map(track => {
    const totalSec = Math.floor(track.intDuration / 1000);
    const m = Math.floor(totalSec / 60);
    const s = String(totalSec % 60).padStart(2, '0');
    const cleanLink = track.movie ? track.movie.split(' ')[0] : null;

    return `
            <li class="artistModal-track-item">
              <span class="artistModal-track-name">${track.strTrack}</span>
              <span class="artistModal-track-duration">${m}:${s}</span>
              <span class="artistModal-track-link">
                ${cleanLink && cleanLink !== "null" ? `
                  <a href="${cleanLink}" target="_blank" class="artistModal-yt-link" rel="noopener noreferrer">
                    <svg class="artistModal-yt-icon" width="24" height="24">
                      <use href="${BASE_URL}img/sprite.svg#icon-Youtube"></use> 
                    </svg>
                  </a>` : ''}
              </span>
            </li>`;
  }).join('')}
      </ul>
    </div>`).join('');
}

// Функція рендеру модалки
export function createArtistModalMarkup({ artist, yearsActive, specificInfoMarkup, albumsMarkup }) {
  const { strArtist, strArtistThumb, strCountry, strBiographyEN, genres } = artist;

  return `
    <div class="artistModal-content-wrapper">
      <h2 class="artistModal-title">${strArtist}</h2>
      <div class="artistModal-info-wrapper">
        <div class="artistModal-img-wrapper">
          <img src="${strArtistThumb}" class="artistModal-img" alt="${strArtist}">
        </div>
        <div class="artistModal-info-grid">
          <div class="artistModal-info-group">
            <div class="artistModal-info-item">
              <span class="artistModal-info-label">Years active</span>
              <p class="artistModal-info-value">${yearsActive}</p>
            </div>     
            ${specificInfoMarkup}      
            <div class="artistModal-info-item">
              <span class="artistModal-info-label">Country</span>
              <p class="artistModal-info-value">${strCountry || 'Unknown'}</p>
            </div>
          </div>
          <div class="artistModal-desc">
            <span class="artistModal-info-label">Biography</span>
            <p>${strBiographyEN || 'Biography not available'}</p>
          </div>
          <div class="artistModal-genres">
            ${(genres || []).map(g => `<span class="artist-genre">${g}</span>`).join('')}
          </div>
        </div> 
      </div>
      <h2 class="artistModal-albums-title">Albums</h2>
      <div class="artistModal-albums-section">${albumsMarkup}</div>
    </div>`;
}
// "Колеги, файл render-functions.js — це наш конструктор HTML.
// Давайте домовимось: вся генерація HTML-рядків живе тільки там. У файлах логіки (api, main) ми просто викликаємо ці функції.
// Так ми не заплутаємось у коді і зможемо легко правити верстку, не ламаючи логіку JS."

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

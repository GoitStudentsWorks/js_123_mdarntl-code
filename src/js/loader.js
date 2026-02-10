// ЛОАДЕР МОДАЛЬНОГО ВІКНА

const loader = document.getElementById('app-loader');

export function showLoader() {
  if (!loader) return;
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add('is-hidden');
}

// ЗАГАЛЬНИЙ ЛОАДЕР

// const loader = document.getElementById('app-loader');

// function showLoader() {
//   loader.classList.remove('hidden');
// }

// function hideLoader() {
//   loader.classList.add('hidden');
// }

// const btn = document.getElementById('loadBtn');

// btn.addEventListener('click', () => {
//   showLoader();

//   setTimeout(() => {
//     hideLoader();
//   }, 2000);
// });

// window.addEventListener('load', () => {
//   hideLoader();
// });

// window.addEventListener('beforeunload', () => {
//   showLoader();
// });

// async function loadData() {
//   try {
//     showLoader();

//     const response = await fetch('https://sound-wave.b.goit.study/api');
//     const data = await response.json();

//     console.log(data);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     hideLoader();
//   }
// }
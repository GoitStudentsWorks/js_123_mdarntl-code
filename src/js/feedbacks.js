import { getFeedbacks } from './api';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LIMIT = 3;
let swiperInstance = null;

async function loadFeedbackSlider() {

  const response = await getFeedbacks(LIMIT);

  // ❗❗❗ ВАЖЛИВО: масив лежить ТУТ
  const feedbacks = response?.data;

  console.log('[Feedback] extracted feedbacks:', feedbacks);
  console.log('[Feedback] isArray:', Array.isArray(feedbacks));
  console.log('[Feedback] length:', feedbacks?.length);

  if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
    console.warn('[Feedback] feedbacks array is empty or invalid');
    return;
  }

  renderFeedbackSlides(feedbacks);
  initFeedbackSwiper();
}

function renderFeedbackSlides(feedbacks) {

  const wrapper = document.getElementById('feedbackList');

  if (!wrapper) return;

  wrapper.innerHTML = '';

  feedbacks.forEach((item, index) => {
    console.log(`[Feedback] slide ${index}:`, item);

    const { name, rating, descr } = item;

    wrapper.insertAdjacentHTML(
      'beforeend',
      `
      <div class="swiper-slide feedback-card">
        <div class="feedback-rating">
          ${renderStars(rating)}
        </div>
        <p class="feedback-text">"${descr}"</p>
        <p class="feedback-author">— ${name}</p>
      </div>
      `
    );
  });
}

function renderStars(rating = 0) {
  const rounded = Math.round(rating);
  console.log('[Feedback] renderStars rating:', rating, 'rounded:', rounded);

  let stars = '';

  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star ${i <= rounded ? 'active' : ''}">★</span>`;
  }

  return stars;
}

function initFeedbackSwiper() {

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    loop: true,
    grabCursor: true,

    navigation: {
      nextEl: '.feedback-next',
      prevEl: '.feedback-prev',
    },

    pagination: {
      el: '.feedback-pagination',
      clickable: true,
    },
  });

}

document.addEventListener('DOMContentLoaded', loadFeedbackSlider);
// fix build update
console.log('Update version');
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

  if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
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
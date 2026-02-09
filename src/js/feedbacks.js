import { getFeedbacks } from './api.js';

const API_URL = '/feedbacks';
const feedbackList = document.getElementById('feedbackList');
const dots = document.querySelectorAll('.feedback-pagination .dot');

let swiper;

async function fetchFeedbacks() {
  const res = await fetch('https://sound-wave.b.goit.study/api/feedbacks');
  const json = await res.json();

  return json.data.slice(0, 10);
}

function renderSlides(feedbacks) {
  feedbackList.innerHTML = '';

  feedbacks.forEach(item => {
    const rating = Math.round(item.rate ?? 5);
    const text =
      typeof item.comment === 'string' && item.comment.trim()
        ? item.comment
        : 'This user left a feedback about ArtistsHub.';

    const name = item.user?.name || 'Anonymous';

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    slide.innerHTML = `
      <div class="feedback-card">
        <div class="feedback-stars" data-score="${rating}"></div>
        <p class="feedback-text">"${text}"</p>
        <p class="feedback-author">${name}</p>
      </div>
    `;

    feedbackList.appendChild(slide);
  });

  initRatings();
}

function initRatings() {
  document.querySelectorAll('.feedback-stars').forEach(el => {
    $(el).raty({
      score: el.dataset.score,
      readOnly: true,
      hints: false,
      starType: 'i',
    });
  });
}

function updatePagination(index, total) {
  dots.forEach(dot => dot.classList.remove('active'));

  if (index === 0) dots[0].classList.add('active');
  else if (index === total - 1) dots[2].classList.add('active');
  else dots[1].classList.add('active');
}

function initSwiper(total) {
  swiper = new Swiper('.feedback-swiper', {
    slidesPerView: 1,
    speed: 600,
    navigation: {
      nextEl: '.feedback-next',
      prevEl: '.feedback-prev',
    },
    on: {
      slideChange() {
        updatePagination(this.activeIndex, total);
      },
    },
  });

  updatePagination(0, total);
}

(async function init() {
  const feedbacks = await fetchFeedbacks();
  renderSlides(feedbacks);
  initSwiper(feedbacks.length);
})();


const openBtn = document.querySelector('[data-feedback-open]');
const closeBtn = document.querySelector('[data-feedback-close]');
const backdrop = document.querySelector('[data-feedback-backdrop]');

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
    closeModal();
  }
});

const form = document.querySelector('.feedback-form');
const errorText = document.querySelector('.form-error');

const ratingBlock = document.querySelector('[data-rating]');

let selectedRating = 0;

if (ratingBlock) {
ratingBlock.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;

    selectedRating = Number(e.target.dataset.value);
    highlightStars(selectedRating);
});
}

function highlightStars(value) {
  const buttons = ratingBlock.querySelectorAll('button');

  buttons.forEach(btn => {
    btn.classList.toggle(
      'active',
      Number(btn.dataset.value) <= value
    );
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !message || !selectedRating) {
    errorText.hidden = false;
    return;
  }

  errorText.hidden = true;

  const feedbackData = {
    name,
    message,
    rating: selectedRating,
  };

  try {
    await postFeedback(feedbackData);
  } finally {
    form.reset();
    selectedRating = 0;
    highlightStars(0);
    closeModal();
  }
});

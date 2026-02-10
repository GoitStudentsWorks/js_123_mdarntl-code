const openBtn = document.querySelector('[data-feedback-open]');
const closeBtn = document.querySelector('[data-feedback-close]');
const backdrop = document.querySelector('[data-feedback-backdrop]');
const form = document.querySelector('.feedback-form');
const errorText = document.querySelector('.form-error');
const ratingBlock = document.querySelector('[data-rating]');

let selectedRating = 0;

function openModal() {
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  form.reset();
  selectedRating = 0;
  highlightStars(selectedRating);
  errorText.hidden = true;
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  // 🔹 FIX: прибираємо focus, щоб не лишався "hover-стан"
  document.activeElement?.blur();
}

if (openBtn) {
  openBtn.addEventListener('click', openModal);
}

closeBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
    closeModal();
  }
});

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
      'is-active',
      Number(btn.dataset.value) <= value
    );
  });
}

function validateFeedback({ name, message, rating }) {
  if (!name || name.length < 2 || name.length > 16) {
    return 'Name must be between 2 and 16 characters';
  }

  if (!message || message.length < 10 || message.length > 512) {
    return 'Message must be between 10 and 512 characters';
  }

  if (!rating || rating < 1 || rating > 5) {
    return 'Rating must be between 1 and 5';
  }

  return null;
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const message = form.elements.message.value.trim();
  const rating = selectedRating;

  const validationError = validateFeedback({
    name,
    message,
    rating,
  });

  if (validationError) {
    errorText.textContent = validationError;
    errorText.hidden = false;
    return;
  }

  errorText.hidden = true;

  const feedbackData = {
    name,
    rating,
    descr: message,
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

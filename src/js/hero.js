const GAP_SIZE = 16;

// Ініціалізація галереї
function initHeroGallery() {
    const galleryTracks = document.querySelectorAll('.hero-gallery-track');
    duplicateImages(galleryTracks);
    setupAnimationHeights(galleryTracks);
    setupNavigationButton();
}

// Налаштування кнопки навігації
function setupNavigationButton() {
    const navButton = document.querySelector('[data-scroll-to]');
    if (!navButton) return;
    
    navButton.addEventListener('click', function () {
        const targetId = this.dataset.scrollTo;
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Дублювання зображень для безшовної анімації
function duplicateImages(tracks) {
    tracks.forEach(track => {
        const originalPictures = [...track.querySelectorAll('.hero-gallery-img')];
        originalPictures.forEach(picture => {
            const clone = picture.cloneNode(true);
            track.appendChild(clone);
        });
    });
}

// Налаштування висоти для анімації
function setupAnimationHeights(tracks) {
    tracks.forEach(track => {
        pauseAnimation(track);
        const allPictures = getAllPictures(track);
        const originalPictures = getOriginalPictures(allPictures);
        let originalHeight = 0;
        let loadedImagesCount = 0;

        function onAllImagesLoaded() {
            setTrackHeight(track, originalHeight);
            startAnimation(track);
        }

        function onImageLoaded() {
            loadedImagesCount++;
            if (loadedImagesCount === originalPictures.length) {
                onAllImagesLoaded();
            }
        }

        originalPictures.forEach(picture => {
            const img = picture.querySelector('img');
            if (isImageLoaded(img)) {
                originalHeight += calculatePictureHeight(picture);
                onImageLoaded();
            } else {
                img.addEventListener('load', () => {
                    setTimeout(() => {
                        originalHeight += calculatePictureHeight(picture);
                        onImageLoaded();
                    }, 10);
                });
            }
        });
        
        setInitialPositionForRightColumn(track);
    });
}

// Отримати всі картинки в треку
function getAllPictures(track) {
    return [...track.querySelectorAll('.hero-gallery-img')];
}

// Отримати тільки оригінальні картинки (без клонів)
function getOriginalPictures(allPictures) {
    return allPictures.slice(0, allPictures.length / 2);
}

// Перевірка чи зображення завантажене
function isImageLoaded(img) {
    return img.complete && img.naturalHeight !== 0;
}

// Розрахунок висоти картинки з gap
function calculatePictureHeight(picture) {
    return picture.offsetHeight + GAP_SIZE;
}

// Встановлення висоти треку для анімації
function setTrackHeight(track, height) {
    const adjustedHeight = height - GAP_SIZE;
    track.style.setProperty('--original-height', `${adjustedHeight}px`);
}

// Пауза анімації
function pauseAnimation(track) {
    track.style.animationPlayState = 'paused';
}

// Запуск анімації
function startAnimation(track) {
    track.style.animationPlayState = 'running';
}

// Початкова позиція для правої колонки
function setInitialPositionForRightColumn(track) {
    if (!isRightColumn(track)) return;
    
    const checkInterval = setInterval(() => {
        const height = track.style.getPropertyValue('--original-height');
        if (height) {
            track.style.transform = `translateY(calc(-1 * ${height}))`;
            clearInterval(checkInterval);
        }
    }, 50);
}

// Перевірка чи це права колонка
function isRightColumn(track) {
    return track.closest('.hero-gallery-column-right');
}

document.addEventListener('DOMContentLoaded', initHeroGallery);
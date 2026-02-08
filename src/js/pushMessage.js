import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const settings = {
  position: 'topRight',
  timeout: 4000,
  theme: 'dark',
  backgroundColor: '#060307',
  progressBarColor: '#4E75FF',
};

// Тільки візуал
export const showPush = (message, type = 'error') => {
  iziToast[type]({
    ...settings,
    title: type === 'error' ? 'Error' : 'Success',
    message: message,
    backgroundColor: type === 'error' ? '#1a0505' : '#060307',
  });
};
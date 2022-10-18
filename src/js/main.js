import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebP();

import Swiper, { Navigation, Pagination } from 'swiper';

const slider = document.querySelector('.slider');
const swiper = new Swiper(slider, {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    slidesPerView: 3,
    spaceBetween: 10,
});
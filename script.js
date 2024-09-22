'use strict';
const modalshow = document.querySelectorAll('.btn--show-modal');
const closebtn = document.querySelector('.btn--close-modal');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav__links');
const navlink = document.querySelectorAll('.nav__link');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const logo = document.querySelector('.nav__logo');
const featuresImg = document.querySelectorAll('.features__img');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const navmain = document.querySelector('.nav');
for (let item of modalshow) {
  item.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

let a = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
closebtn.addEventListener('click', a);
document.addEventListener('keydown', function (e) {
  e.key == 'Escape' ? a() : false;
});
overlay.addEventListener('click', a);

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

nav.addEventListener('click', function (e) {
  const id = e.target.getAttribute('href');
  e.preventDefault();
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (clicked) {
    tabs.forEach(btn => btn.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  }
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    navlink.forEach(i => i.classList.add('opacity-remove'));
    logo.classList.add('opacity-remove');
    e.target.classList.remove('opacity-remove');
  }
});
nav.addEventListener('mouseout', function () {
  navlink.forEach(i => i.classList.remove('opacity-remove'));
  logo.classList.remove('opacity-remove');
});

window.addEventListener('scroll', function () {
  featuresImg.forEach(a => {
    if (window.scrollY >= a.offsetTop - a.clientHeight) {
      a.classList.remove('lazy-img');
      a.setAttribute('src', a.getAttribute('data-src'));
    }
  });
});

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = slide => {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
  );
};


const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

const init = () => {
  goToSlide(0);
};
init();

window.addEventListener('scroll', () => {
  if (window.scrollY > navmain.offsetTop) {
    navmain.classList.add('sticky');
  } else {
    navmain.classList.remove('sticky');
  }
});

import ColorPicker from '~/index';
import options from './options';
import * as controller from './controller';
import * as storage from './storage';
import './assets/app.scss';

const initialRoute = 'basic'; // basic,themes

window.picker = null;
const $buttonsRoute = document.querySelectorAll('.layout-header__nav > button');
const $sections = document.querySelectorAll('.container > section');
const $empty = document.querySelector('.container > .empty');

/**
 * change route
 */
function changeRoute(name) {
  // disabled picker
  if (picker) {
    if (Array.isArray(picker)) {
      picker.forEach((o,k) => {
        o.destroy();
        o.$body.el.innerHTML = '';
        picker[k] = null;
      });
    } else {
      picker.destroy();
      picker.$body.el.innerHTML = '';
      picker = null;
    }
  }
  for (let i=0; i<$buttonsRoute.length; i++) {
    $buttonsRoute[i].removeAttribute('disabled');
  }
  for (let i=0; i<$sections.length; i++) {
    $sections[i].classList.remove('active');
  }

  // active route
  const $el = document.querySelector(`.layout-header > nav > button[data-route=${name}]`);
  $el.setAttribute('disabled', 'disabled');
  const $section = document.querySelector(`.layout-section[data-route=${name}]`);
  if (!$section) {
    $empty.classList.add('active');
    return;
  }
  $section.classList.add('active');
  switch (name) {
    case 'basic':
      picker = new ColorPicker({
        container: document.getElementById('basic'),
        ...options.basic,
      });
      controller.initEvent(picker);
      break;
    case 'themes':
      picker = [];
      Object.keys(options.themes).forEach(key => {
        picker.push(new ColorPicker({
          container: document.getElementById(`theme_${key}`),
          ...options.themes[key],
        }));
      });
      break;
  }
}

/**
 * init
 */
function init() {
  // set color mode
  const colorMode = storage.get('colorMode');
  document.querySelector('html').dataset.colorMode = colorMode || '';
}

// set navigation event
for (let i=0; i<$buttonsRoute.length; i++) {
  $buttonsRoute[i].addEventListener('click', e => {
    const $el = e.target;
    const route = $el.dataset.route;
    changeRoute(route);
  });
}

// set initial route
changeRoute(initialRoute);

// set init
init();

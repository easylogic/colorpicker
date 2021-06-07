import EasyLogicColorPicker from '~/index';
import './assets/app.scss';

const initialRoute = 'basic';

let picker = null;
const $buttons = document.querySelectorAll('.layout-header > nav > button');
const $sections = document.querySelectorAll('.container > section');
const $empty = document.querySelector('.container > .empty');

/**
 * change route
 */
function changeRoute(name) {
  // disabled
  if (picker) {
    picker.destroy();
    picker.$body.el.innerHTML = '';
    picker = null;
  }
  for (let i=0; i<$buttons.length; i++) {
    $buttons[i].removeAttribute('disabled');
  }
  for (let i=0; i<$sections.length; i++) {
    $sections[i].classList.remove('active');
  }
  // active
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
      picker = new EasyLogicColorPicker.create({
        container: document.getElementById('basic'),
        // type : 'default',
        // type : 'mini-vertical', // ChromeDevTool,macos,xd,ring,mini,vscode,mini-vertical
        position: 'inline',
      });
      break;
  }
}

// set navigation event
for (let i=0; i<$buttons.length; i++) {
  $buttons[i].addEventListener('click', e => {
    const $el = e.target;
    const route = $el.dataset.route;
    changeRoute(route);
  });
}

// set initial route
changeRoute(initialRoute);

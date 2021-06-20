import * as storage from './storage';

let picker;

function colorMode(mode) {
  const $html = document.querySelector('html');
  switch (mode) {
    case 'system':
    case 'dark':
    case 'light':
      $html.dataset.colorMode = mode;
      storage.set('colorMode', mode);
      break;
    default:
      $html.dataset.colorMode = '';
      storage.set('colorMode', null);
      break;
  }
}

export function initEvent(getPicker) {
  if (!getPicker) return;
  picker = getPicker;

  const $controller = document.getElementById('controller');
  if (!$controller) return;

  const $buttons = $controller.querySelectorAll('button');
  for (let i=0; i<$buttons.length; i++) {
    $buttons[i].addEventListener('click', e => {
      const $self = e.target;
      switch ($self.dataset.type) {
        // case 'darkmode':
        //   darkmode();
        //   break;
      }
    });
  }

  const $selects = $controller.querySelectorAll('select');
  for (let i=0; i<$selects.length; i++) {
    $selects[i].addEventListener('change', e => {
      switch (e.target.dataset.type) {
        case 'color-mode':
          colorMode(e.target.value);
          break;
      }
    });
  }
}

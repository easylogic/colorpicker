let custom = {};

export default {
  // basic
  basic: {
    type: 'default',
    color: '#44D7B6',
    format: 'hex', // hex,rgb,hsl
    // outputFormat: 'rgb',
    swatchTitle: undefined,
    swatchColors: [ '#ff0000', '#00ff00', '#0000ff' ],
    onInit: (self) => {
      custom = {
        $color: document.querySelector('#colorSample > i'),
        $code: document.querySelector('#colorSample > em'),
      };
      custom.$color.style.setProperty('--color', self.getColor());
      custom.$code.innerText = self.getColor();
    },
    onChange: (color) => {
      custom.$color.style.setProperty('--color', color);
      custom.$code.innerText = color;
    },
    onChanged: (color) => {
      custom.$color.style.setProperty('--color', color);
      custom.$code.innerText = color;
    },
    onChangeFormat: (format) => {
      // console.log('user onChangeFormat()', format);
    },
    onDestroy: () => {
      custom = {};
    },
  },
  // themes
  themes: {
    default: {
      type: 'default',
    },
    circle: {
      type: 'circle',
    },
    ring: {
      type: 'ring',
    },
    mini: {
      type: 'mini',
    },
    none: {
      type: 'none',
      colorSets: [
        {
          name: 'Sketch samples',
          edit: false,
          colors: [
            '#E02020', '#FA6400', '#F7B500', '#6DD400', '#44D7B6',
            '#32C5FF', '#0091FF', '#6236FF', '#B620E0', '#6D7278',
            'rgba(0,0,0,.1)', 'rgba(0,0,0,.25)', 'rgba(0,0,0,.5)', 'rgba(0,0,0,.85)', '#ffffff',
          ],
        },
      ],
    },
  },
}

export default {
  // basic
  basic: {
    type: 'default',
    color: '#44D7B6',
    // format: 'hex',
    outputFormat: 'hex',
    // swatchTitle: 'Color palette', // TODO: 작업예정
    // swatchColors: [], // TODO: 작업예정
    colorSets: [
      {
        name: "Custom colors",
        colors: [ '#ff0000', '#00ff00', '#0000ff' ],
      },
      {
        name: "fooooooo",
        edit: true,
        colors: [ 'green', 'red', 'blue' ],
      },
    ],
    onInit: (self) => {
      // console.log('user onInit()', self);
      // setTimeout(() => {
      //   self.changeColor('rgba(255,0,0,.5)');
      // }, 3000)
    },
    onChange: (color) => {
      // console.log('user onChange()', color);
    },
    onChanged: (color) => {
      // console.log('user onChanged()', color);
    },
    onChangeFormat: (format) => {
      // console.log('user onChangeFormat()', format);
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

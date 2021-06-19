export default {
  // basic
  basic: {
    type: 'default',
    colorSets: [
      {
        name: "Custom colors",
        edit: true,
        colors: [ '#ff0000', '#00ff00', '#0000ff' ],
      },
    ],
  },
  // themes
  themes: {
    default: {
      type: 'default',
      position: 'inline',
    },
    circle: {
      type: 'circle',
      position: 'inline',
    },
    ring: {
      type: 'ring',
      position: 'inline',
    },
    mini: {
      type: 'mini',
      position: 'inline',
    },
    none: {
      type: 'none',
      position: 'inline',
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

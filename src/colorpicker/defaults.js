export default {
  // values
  container: undefined,
  type: null, // default,circle,ring,mini,none
  color: '#ffffff',
  format: 'hex', // hex,rgb,hsl
  outputFormat: undefined, // hex,rgb,hsl
  useInformation: true,
  paletteWidth: 200,
  paletteHeight: undefined,
  paletteThickness: 16,
  darkMode: false, // TODO: 추후에 기능추가예정
  swatchTitle: 'Color palette',
  swatchColors: [],

  // callback functions
  onInit: undefined,
  onDestroy: undefined,
  onChange: undefined,
  onChanged: undefined,
  onChangeFormat: undefined,
};

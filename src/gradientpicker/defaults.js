export default {
  // values
  container: undefined,
  type: "default",
  gradient: 'linear-gradient(to right, white 0%, black 100%)',
  colorpicker: {
    color: "#FFFFFF",
    format: 'hex', // hex,rgb,hsl
    outputFormat: undefined, // hex,rgb,hsl
    useInformation: true,
    useOpacity: true,
    paletteWidth: 200,
    paletteHeight: undefined,
    paletteThickness: 16,
    swatchTitle: 'Color palette',
    swatchColors: [],
  },
  // callback functions
  onInit: undefined,
  onDestroy: undefined,
  onChange: undefined,
  onChanged: undefined,
  onChangeFormat: undefined,
};

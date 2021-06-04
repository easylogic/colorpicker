import EasyLogicColorPicker from '~/index';

const $basic = document.getElementById('basic');

console.log(EasyLogicColorPicker)
const picker = new EasyLogicColorPicker.create({
  container: $basic,
  type : 'sketch',
  position: 'inline',
});

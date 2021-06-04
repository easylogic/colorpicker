// set basic
;(function () {
  const element = document.getElementById('basic');
  const picker = new EasyLogicColorPicker.create({
    position: 'inline',
    container: element,
    type: 'default',
  });
  console.log(element);
})();

// hljs.initHighlightingOnLoad();

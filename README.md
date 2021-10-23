# EasyLogic ColorPicker

EasyLogic ColorPicker is vanila-js colorpicker. 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![](https://data.jsdelivr.com/v1/package/npm/easylogic-colorpicker/badge)](https://www.jsdelivr.com/package/npm/easylogic-colorpicker)

[![NPM](https://nodei.co/npm/@easylogic/colorpicker.png)](https://npmjs.org/package/@easylogic/colorpicker)

Document Site: https://colorpicker.easylogic.studio/#colorpicker-for-standalone


## Demo

https://codepen.io/redgoose/pen/BaRaqEd


## Install

```shell
npm install @easylogic/colorpicker
```


## Using

### module

```javascript
import ColorPicker from '@easylogic/colorpicker';
import '@easylogic/colorpicker/dist/EasyLogicColorPicker.css';

const picker = new ColorPicker({
  container: document.getElementById('basic'),
});
```

### browser

```html
<link href="https://cdn.jsdelivr.net/npm/@easylogic/colorpicker@1.10.5/dist/colorpicker.css" />
<div id="picker"></div>
<script src="https://cdn.jsdelivr.net/npm/@easylogic/colorpicker@1.10.5/dist/colorpicker.min.js"></script>

<script>
window.picker = new EasyLogicColorPicker({
  container: document.getElementById('picker'),
})
</script>
```


#### Initialize 

```javascript
import ColorPicker from '@easylogic/colorpicker';
const picker = new ColorPicker({
  container: document.getElementById('picker'),
  onInit: function(self) { console.log('initial colorpicker'); },
});
```


## Component Options

refer to [colorpicker javascript](https://github.com/easylogic/colorpicker/tree/main/src/colorpicker) for detail 



```javascript
new ColorPicker({
  container,
  type: 'circle',
  color: 'lime',
  onChange: function(color) {
    console.log('change color', color);
  },
})
```

### container

- required
- type: `Element`
- default: `undefined`

The element where the color picker is inserted is determined by the selector.

ex) `document.querySelector('#picker')`, `document.getElementById('picker')`

### type

- type: `string`
- default: `null`
- value: `default,circle,ring,mini,none`

color picker theme design

### color

- type: `string`
- default: `#ffffff`

Color code used for initialization

### format

- type: `string`
- default: `hex`
- value: `hex,rgb,hsl`

The color format used when initializing

### outputFormat

- type: `string`
- default: `undefined`
- value: `hex,rgb,hsl`

Color format output by callback function

### useInformation

- type: `boolean`
- default: `true`

Whether to use the form area where the color code is displayed

### useOpacity

- type: `boolean`
- default: `true`

투명도를 조절하는 슬라이더를 사용할지에 대한 여부를 정합니다.

### paletteWidth

- type: `number`
- default: `200`

Pallet width.
It may not be available depending on the design type.

### paletteHeight

- type: `number`
- default: `undefined`

palette vertical.
It may not be available depending on the design type.

### paletteThickness

- type: `number`
- default: `16`

Thickness of circular pallet in design `ring` type

### swatchTitle

- type: `string`
- default: `Color palette`

title of color swatch

### swatchColors,

- type: `array`
- default: `[]`
- value: `['#ff0000', '#00ff00', '#0000ff']`

Color list in color swatches

### onInit

- type: `function`
- params: `this: EasylogicColorPickere`

Executed when the color picker is initialized.

### onChange

- type: `function`
- params: `color: string`

Executes when the color changes. ex) `mousemove, touchmove`

### onChanged

- type: `function`
- params: `color: string`

Executes when the color change ends. ex) `mouseup, touchend`

### onChangeFormat

- type: `function`
- params: `format: string`

It is executed when the color format is changed.

### onDestroy

- type: `function`

Executed when the color picker object disappears.

## Methods

You can use the color picker instance object to perform specific actions.
### initialize

```javascript
picker.initialize();
```

Initialize the instance. You can use it after executing `destroy()`.

### getColor

```javascript
let color = picker.getColor();
```

Gets the selected color.

### setColor

```javascript
picker.setColor('#A6341B');
```

Change color.

### setOption

```javascript
picker.setOption({
  type: 'ring',
  color: '#00ff00',
});
```

Change options. Restart the color picker when making changes.

### setType

```javascript
picker.setType('circle');
```

Change the color picker design type. For the type value, refer to the [type](#type) section. (Some set values ​​may disappear.)

### destroy

```javascript
picker.destroy();
```

Destroy the instance object.


## Stylesheet

You can edit the color picker style directly by referring to the [colorpicker stylesheet](https://github.com/easylogic/colorpicker/tree/main/src/scss) page.

## Developments

Prepare the development environment with the following process.

```shell
git clone https://github.com/easylogic/easylogic-colorpicker
cd colorpicker
npm install
cp resource/.env ./
```

### open local server

```shell
npm run dev
```

### build

```shell
npm run build
```

### .env

[.env](https://github.com/easylogic/colorpicker/blob/main/resources/.env) file can be used by modifying some of the local server options.
You can tweak things like port numbers and server status by editing the `.env` file.

## Contributors
* easylogic
* redgoose 

## License : MIT

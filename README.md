# Colorpicker With EasyLogic


This project was created to implement a color picker. It implemented basic functions for color and implemented image filters.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![](https://data.jsdelivr.com/v1/package/npm/easylogic-colorpicker/badge)](https://www.jsdelivr.com/package/npm/easylogic-colorpicker)

[![NPM](https://nodei.co/npm/@easylogic/colorpicker.png)](https://npmjs.org/package/@easylogic/colorpicker)

Document Site: https://colorpicker.easylogic.studio/#colorpicker-for-standalone


# Install 

## npm 

```npm
npm install @easylogic/colorpicker
```

   
# How to use (for  browser) 

```
<link href="https://cdn.jsdelivr.net/npm/@easylogic/colorpicker@1.10.0/dist/colorpicker.css" />
<script src="https://cdn.jsdelivr.net/npm/@easylogic/colorpicker@1.10.0/dist/colorpicker.min.js"></script>
```

# How to use 
 
```
import '@easylogic/colorpicker/dist/colorpicker.css'
import ColorPickerUI from '@easylogic/colorpicker' 
```


# Use ColorPicker 

```js
import '@easylogic/colorpicker/dist/colorpicker.css';
import ColorPickerUI from '@easylogic/colorpicker'

 this.colorPicker = ColorPickerUI.create({
   type: "sketch",
   position: "inline",
   container: document.getElementById('app'),
   color: this.props.value || defaultColor,
   onChange: c => {
     this.changeColor(c);
   }
 });

```

# Use GradientPicker 

```js
import '@easylogic/colorpicker/dist/colorpicker.css';
import ColorPickerUI from '@easylogic/colorpicker'


 this.gradientPicker = ColorPickerUI.createGradientPicker({
   position: "inline",
   container: this.refs.$color.el,
   gradient: 'linear-gradient(to right, white 0%, black 100%)',
   onChange: (gradientString) => {
     console.log(gradientString);
   }
 });


 // set value 
 this.gradientPicker.setValue('radial-gradient(circle, white 0%, black 100%'));

 // get value
 var gradientString = this.gradientPicker.getValue()

```


# Developments 

## local dev 

```
git clone https://github.com/easylogic/easylogic-colorpicker
cd easylogic-colorpicker
npm install 
npm run dev 
open localhost:10001 
```

## build 

```
npm run build 
```

# License : MIT 

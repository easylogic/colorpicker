# colorpicker stylesheet

컬러피커의 스타일시트에 대하여 다룹니다.  
먼저 예제로 사용하는 html 엘리먼트는 다음과 같습니다.

```html
<div id="picker" class="picker"></div>
<script>
let picker = new EasyLogicColorPicker({
  container: document.getElementById('picker'),
});
</script>
```


## variables

다음과 같은 모습으로 스타일시트의 일부 값들을 변경할 수 있습니다.  
자세한 변수의 모습은 [index.scss](https://github.com/easylogic/colorpicker/blob/main/src/scss/index.scss) 소스를 참고해주세요.

```css
.picker {
  --cp-color-bg: '#eee';
  --cp-color-fill: #111;
  --cp-color-key: lime;
}
```

### color

- `--cp-color-bg`: background color
- `--cp-color-fill`: text, fill color
- `--cp-color-key`: key color
- `--cp-color-blur`: gray color
- `--cp-color-pointer-fill`: palette, slider pointer color

### size

- `--cp-size-width`: body width
- `--cp-size-radius`: body radius
- `--cp-size-side-padding`: side padding
- `--cp-size-inner-padding`: inner padding in component
- `--cp-size-pointer`: palette, slider pointer size
- `--cp-size-pointer-stroke`: palette, slider pointer stroke size

### palette

- `--cp-palette-width`: palette width
- `--cp-palette-height`: palette height

팔레트의 사이즈는 `type`에 따라 사용하지 않을 수 있습니다.

### slider

- `--cp-slider-height`: height
- `--cp-slider-radius`: radius
- `--cp-slider-stroke-color`: stroke color

### color preview

- `--cp-preview-size`: size(width, height)
- `--cp-preview-radius`: radius
- `--cp-preview-stroke-color`: stroke color

### form

- `--cp-form-bg`: background color
- `--cp-form-border-color`: border color

### swatch

- `--cp-swatch-column`: number of columns
- `--cp-swatch-gap`: color item spacing
- `--cp-swatch-item-size`: color item size
- `--cp-swatch-item-stroke-radius`: color item stroke radius
- `--cp-swatch-item-stroke-color`: color item stroke color
- `--cp-swatch-border-color`: top line color

### etc

- `--cp-shadow-outer`: body shadow
- `--cp-shadow-pointer`: pointer shadow
- `--cp-shadow-pointer-active`: pointer shadow when active
- `--cp-speed-focus`: focus animation speed


## dark mode

다크모드는 컴포넌트 스타일시트의 값을 변경해서 구현할 수 있습니다.  
다음과 같이 색을 고쳐서 사용합니다.

```css
@media (prefers-color-scheme: dark) {
  .picker .el-colorpicker {
    --cp-color-bg: #222;
    --cp-color-fill: #fff;
    --cp-color-blur: #888;
    --cp-shadow-outer: 0 0 16px 2px rgba(0,0,0,.25), inset 0 0 0 1px rgba(0,0,0,.25);
    --cp-slider-stroke-color: #444;
    --cp-swatch-item-stroke-color: #444;
    --cp-preview-stroke-color: #444;
    --cp-form-bg: #333;
    --cp-form-border-color: #444;
    --cp-swatch-border-color: #444;
  }
}
```

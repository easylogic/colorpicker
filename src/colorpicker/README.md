# colorpicker javascript

컬러피커의 기술적인 내용에 대하여 다룹니다.


## using

다음과 같이 기본적인 모습으로 사용할 수 있습니다.

```javascript
import ColorPicker from '@easylogic/colorpicker';
const picker = new ColorPicker({
  container: document.getElementById('picker'),
  onInit: function(self) { console.log('initial colorpicker'); },
});
```


## options

다음과 같이 옵션을 이용하여 용도에 맞춰서 컬러피커를 사용할 수 있습니다.

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

컬러피커가 들어가는 위치가 되는 엘리먼트를 셀렉터로 정합니다.  
ex) `document.querySelector('#picker')`, `document.getElementById('picker')`

### type

- type: `string`
- default: `null`
- value: `default,circle,ring,mini,none`

컬러피커의 테마 디자인

### color

- type: `string`
- default: `#ffffff`

초기화할때 사용하는 컬러코드

### format

- type: `string`
- default: `hex`
- value: `hex,rgb,hsl`

초기화할때 사용하는 컬러포맷

### outputFormat

- type: `string`
- default: `undefined`
- value: `hex,rgb,hsl`

콜백함수로 출력하는 컬러포맷

### useInformation

- type: `boolean`
- default: `true`

컬러코드가 표시되는 폼 영역 사용여부

### paletteWidth

- type: `number`
- default: `200`

팔레트 가로크기.  
디자인 타입에 따라 사용하지 못할 수 있습니다.

### paletteHeight

- type: `number`
- default: `undefined`

팔레트 세로크기.  
디자인 타입에 따라 사용하지 못할 수 있습니다.

### paletteThickness

- type: `number`
- default: `16`

디자인 `ring` 타입에서 원형 팔레트의 두께

### swatchTitle

- type: `string`
- default: `Color palette`

색상 견본의 제목

### swatchColors,

- type: `array`
- default: `[]`
- value: `['#ff0000', '#00ff00', '#0000ff']`

색상 견본의 색 목록

### onInit

- type: `function`
- params: `this: EasylogicColorPickere`

컬러피커 초기화시 실행합니다.

### onChange

- type: `function`
- params: `color: string`

색이 바뀌었을때 실행합니다. ex) `mousemove, ontouchmove`

### onChanged

- type: `function`
- params: `color: string`

색이 바뀌는때가 끝날때 실행합니다. ex) `mouseup, ontouchend`

### onChangeFormat

- type: `function`
- params: `format: string`

컬러포맷이 바뀌었을대 실행합니다.

### onDestroy

- type: `function`

컬러피커 객체가 없어질때 실행합니다.


## methods

컬러피커 인스턴스 객체를 이용하여 특정 동작을 실행할 수 있습니다.

### initialize

```javascript
picker.initialize();
```

인스턴스를 초기화 합니다. `destroy()`를 실행하고나서 이것을 사용할 수 있습니다.

### getColor

```javascript
let color = picker.getColor();
```

선택된 색을 가져옵니다.

### setColor

```javascript
picker.setColor('#A6341B');
```

색을 변경합니다.

### setOption

```javascript
picker.setOption({
  type: 'ring',
  color: '#00ff00',
});
```

옵션을 변경합니다. 변경할때 컬러피커를 재시작합니다.

### setType

```javascript
picker.setType('circle');
```

컬러피커 디자인 타입을 변경합니다. 타입의 값은 [type](#type) 섹션을 참고해주세요. (일부 설정된 값은 사라질 수 있습니다.)

### destroy

```javascript
picker.destroy();
```

인스턴스 객체를 파괴합니다.

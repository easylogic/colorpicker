import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import autoprefixer from 'autoprefixer'

// rollup.config.js
export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/colorpicker.min.js',
    format: 'iife'
  },
  name: 'EasyLogicColorPicker',  
  plugins : [
    postcss({
      extract: 'dist/colorpicker.css',
      plugins: [
        autoprefixer()
      ],
      extensions: ['.scss']
    }),     
    babel({
      exclude: ['node_modules/**', 'src/util/glsl/source/**']
    }),
    uglify()
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/colorpicker.js',
    format: 'umd'
  },
  name: 'EasyLogicColorPicker',
  plugins : [
    postcss({
      extract: 'dist/colorpicker.css',
      plugins: [
        autoprefixer()
      ],
      extensions: ['.scss']
    }),         
    babel({
      exclude: 'node_modules/**'
    })
  ]
}];
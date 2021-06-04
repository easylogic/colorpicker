import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import autoprefixer from 'autoprefixer'

export default {
  input: 'src/index.js',
  output: {
    file: 'public/core/colorpicker.js',
    format: 'iife'
  },
  name: 'EasyLogicColorPicker',
  plugins : [
    serve({
      open: false,
      contentBase: 'public',
      host: '0.0.0.0',
      port: 10001,
    }),
    livereload('public/core'),
    postcss({
      extract: 'public/core/colorpicker.css',
      plugins: [
        autoprefixer()
      ],
      extensions: ['.scss']
    }),
    babel({
      exclude: ['node_modules/**', 'src/util/glsl/source/**'],
      presets: [
        [ 'es2015', { modules : false } ]
      ]
    })
  ],
  watch: {
    chokidar: {
      // if the chokidar option is given, rollup-watch will
      // use it instead of fs.watch. You will need to install
      // chokidar separately.
      //
      // this options object is passed to chokidar. if you
      // don't have any options, just pass `chokidar: true`
    },

    // include and exclude govern which files to watch. by
    // default, all dependencies will be watched
    exclude: ['node_modules/**']
  }
};

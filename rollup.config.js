import compiler from '@ampproject/rollup-plugin-closure-compiler'
import multiEntry from 'rollup-plugin-multi-entry'

export default {
  input: ['lib/index.js', 'lib/pipeable/*.js'],
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
  }, {
    file: 'dist/index.es.js',
    format: 'es',
  }, {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: 'Itrabble',
  }],
  plugins: [
    multiEntry(),
    compiler(),
  ]
};

import compiler from '@ampproject/rollup-plugin-closure-compiler'
import multiEntry from 'rollup-plugin-multi-entry'
import pkg from './package.json'

export default [{
    // umd browser build
    input: ['lib/index.js', 'lib/pipeable/*.js'],
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Itrabble',
    },
    plugins: [
      multiEntry(),
      compiler(),
    ]
  },
  // pipeable build
  {
    input: 'lib/pipeable/*.js',
    output: [{
      file: 'commonjs/pipeable/index.js',
      format: 'cjs',
    },{
      file: 'esm/pipeable/index.js',
      format: 'es'
    }],
    plugins: [
      multiEntry(),
    ]
  },
  // main cjs and esm build
  {
  input: ['lib/index.js'],
  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }],
  plugins: [
    // compiler(),
  ]
}]

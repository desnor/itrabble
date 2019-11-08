import compiler from '@ampproject/rollup-plugin-closure-compiler'
import multiEntry from 'rollup-plugin-multi-entry'
import pkg from './package.json'

export default [{
    // minified umd browser build
    input: ['lib/index.js', 'lib/pipeable/index.js'],
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
  // pipeable cjs build
  {
    input: 'lib/pipeable/index.js',
    output: [{
      file: 'commonjs/pipeable/index.js',
      format: 'cjs',
    }]
  },
  // main cjs build
  {
  input: ['lib/index.js'],
  output: [{
    file: pkg.main,
    format: 'cjs',
  }],
}]

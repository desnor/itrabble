import compiler from '@ampproject/rollup-plugin-closure-compiler'
import multiEntry from 'rollup-plugin-multi-entry'
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json'

export default [
  {
    // minified umd browser build
    input: ['src/index.ts', 'src/pipeable/index.ts'],
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'Itrabble',
    },
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      multiEntry(),
      compiler(),
    ]
  },
  // pipeable cjs build
  {
    input: 'src/pipeable/index.ts',
    output: [{
      file: 'dist/commonjs/pipeable/index.js',
      format: 'cjs',
    }],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
    ]
  },
  // main cjs build
  {
    input: ['src/index.ts'],
    output: [{
      file: pkg.main,
      format: 'cjs',
    }],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
    ]
  },
  // pipeable esm build
  {
    input: 'src/pipeable/index.ts',
    output: [{
      file: 'dist/pipeable/index.js',
      format: 'esm',
    }],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
    ]
  },
  // main esm build
  {
    input: ['src/index.ts'],
    output: [{
      file: pkg.module,
      format: 'esm',
    }],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
    ]
  }
]

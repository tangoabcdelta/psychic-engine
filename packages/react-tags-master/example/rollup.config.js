import buble from '@rollup/plugin-buble'
import serve from 'rollup-plugin-serve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  // Use Buble plugin to transpile JSX
  buble({
    objectAssign: 'Object.assign',
    exclude: 'node_modules/**'
  }),
  // Use replace plugin to set environment variables
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  // Use resolve plugin to use Node's module resolution algorithm
  resolve(),
  // Use CommonJS plugin to include non-ES modules
  commonjs()
]

if (process.env.NODE_ENV === 'production') {
  // Use Terser plugin to minify output
  plugins.push(terser())
} else {
  plugins.push(serve({ open: true, contentBase: 'example', port: 8080 }))
}

export default {
  input: 'example/main.js',
  plugins,
  output: {
    file: 'example/bundle.js',
    format: 'iife',
    sourcemap: true
  }
}

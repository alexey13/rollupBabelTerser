import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import resolve  from '@rollup/plugin-node-resolve';

const def = {
  input: './src/app.js',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      "plugins": [
        ["@babel/plugin-transform-runtime"]
      ],
      "presets": [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              browsers: [
                'Chrome >= 60',
                'Safari >= 10.1',
                'iOS >= 10.3',
                'Firefox >= 54',
                'Edge >= 15',
              ]
            },
            "useBuiltIns": "usage",
            corejs: '3.6'
          }
        ]
      ],
      babelHelpers: 'runtime'
    }),
    commonjs(),
    terser()
  ],
  output: {
    file: './dist/app.min.js',
    format: 'iife',
  }
};

export default def;
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
            targets: {
              "browsers": 'defaults, not ie <= 13, not op_mini all, not edge 18, not baidu <= 100, not and_qq <= 100'
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

/*const pluginsFiles = {
  randomLetters: './src/randomLetters.js',
  imagesPlayer: './src/imagesPlayer.js',
  scrollContainer: './src/scrollContainer.js',
  charming: './src/charming.js',
  slider: './src/slider.js'
};

const rollupEach = Object.keys(pluginsFiles).map(name => {
  return {
    input: pluginsFiles[name],
    plugins: [
      babel({presets: ['@babel/preset-env']}),
      terser()
    ],
    output: {
      file: `./dist/animejsPlugins-${name}.js`,
      format: 'iife',
      name: `animejsPlugins`
    }
  }
});*/

export default def;
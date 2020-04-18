import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import resolve  from '@rollup/plugin-node-resolve';

const def = [
  {
    input: './src/app.js',
    plugins: [
      babel({
        "babelrc": false,
        "runtimeHelpers": true,
        "presets": ["@babel/preset-env"],
        "plugins": [
            ["@babel/transform-runtime"]
        ],
        "exclude": "node_modules/**"
      }),
      terser(),
      resolve(),
      commonjs({
        include: "node_modules/**"
      })
    ],
    output: {
      file: './dist/app.min.js',
      format: 'iife',
      name: 'Wheel'
    }
  }
];

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

export default def.concat([]);
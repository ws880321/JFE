
const rollup = require('rollup');
const watch = require('rollup-watch');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const progress = require('rollup-plugin-progress');
const filesize = require('rollup-plugin-filesize');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const cleanup = require('rollup-plugin-cleanup');
const uglify = require('rollup-plugin-babel-minify');
const isDev = process.env.DEV === "dev";



const inputOptions = {
   input:'./src/index.js',
    plugins: [
      resolve(),
      commonjs(),
      eslint(),
      babel({
          exclude: 'node_modules/**' , 
          runtimeHelpers: true 
        }),
      filesize(),
      progress({clearLine: false})
    ]
 
};
const inputOptions2 = {
   input:'./src/index.js',
    plugins: [
      resolve(),
      commonjs(),
      eslint(),
      babel({
          exclude: 'node_modules/**' , 
          runtimeHelpers: true 
        }),
      cleanup(),
      uglify(),
      filesize(),
      progress({clearLine: false})
    ]
 
};
const outputOptions = {
      file: './dist/jfe.js', 
      format: 'umd', 
      name: 'JFE', 
};
const outputOptions2 = {
      file: './dist/jfe.min.js', 
      format: 'umd', 
      name: 'JFE', 
};
async function build() {
  const bundle = await rollup.rollup(inputOptions);
  const bundle2 = await rollup.rollup(inputOptions2);

  await bundle.write(outputOptions);
  await bundle2.write(outputOptions2);
}

build();


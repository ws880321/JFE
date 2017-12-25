const fs = require('fs');
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

let filsList = [];
let filsList2 = [];
fs.readdir('./src/', function(err, files) {
    files.map(async function(v, i) {
        if (v != '.DS_Store' && v != 'common' && v != 'index.js'&& v != '.babelrc') {
            filsList[i] = await rollup.rollup({
                input: `./src/${v}/index.js`,
                plugins: [
					resolve(),
					commonjs(),
					eslint(),
					babel({
					  exclude: 'node_modules/**' , 
					  runtimeHelpers: true 
					}),
					filesize(),
                ],
            });
            await filsList[i].write({
                file: `./dist/${v}.js`,
                format: 'umd',
                intro:'/**九次方大数据前端工具库*/' ,
                name: `JFE.${v}`
            });
            filsList2[i] = await rollup.rollup({
                input: `./src/${v}/index.js`,
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
                ],
            });
            await filsList2[i].write({
                file: `./dist/${v}.min.js`,
                format: 'umd',
                intro:'/**九次方大数据前端工具库*/' ,
                name: `JFE.${v}`
            });
        }
    })
})

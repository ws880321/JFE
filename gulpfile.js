'use strict';
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var jsdoc = require('gulp-jsdoc3');
var babel = require('rollup-plugin-babel');
var babel = require('rollup-plugin-babel');
var uglify2 = require('rollup-plugin-uglify');
var rollup = require('rollup');
var minify = require('rollup-plugin-babel-minify');
var minimist = require('minimist');

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);

console.log(options)
var DEMO_PATH = path.join(__dirname, 'build');
var DEMO_TEMPLATE_PATH = __dirname;
var DEMO_DESTINATION_PATH = 'doc';
var demoFilePaths = ['./src/*.js', './src/*/*.js', './src/*/*/*.js'].map(function(filePath) {
    return path.join(DEMO_TEMPLATE_PATH, filePath);
});
demoFilePaths.push('README.md');
gulp.task('doc:default', ['del'], function(done) {
    var config = {
        opts: {
            destination: path.join(DEMO_DESTINATION_PATH, '-docstrap')
        }
    };
    gulp.src(demoFilePaths, {
            read: false
        })
        .pipe(jsdoc(config, done));
});

/**
 * Generate demo document
 */
gulp.task('doc', ['del'], function(done) {
    /* Demo config */
    var domeConfigPath = path.join(DEMO_PATH, 'doc_config/jsdoc-conf.json');
    var config = require(domeConfigPath);
    delete require.cache[require.resolve(domeConfigPath)]; // remove cache

    config.opts.template = DEMO_TEMPLATE_PATH;
    config.opts.destination = DEMO_DESTINATION_PATH;

    gulp.src(demoFilePaths, {
            read: false
        })
        .pipe(jsdoc(config, done));
});

/**
 * Watch file paths
 * @type {string[]}
 */
var watchPaths = [
    'src/**/**/**.js',
    'src/**/*.js',
    'src/*.js',
    'build/doc_config/jsdoc-conf.json',
    'demo/samples/**/*',
    'build/static/scripts/**/*.js',
    'build/static/styles/**/*.css',
    'build/tmpl/**/*.tmpl',
    'build/publish.js'
];

/**
 * Reload server
 */
gulp.task('reload', ['doc', 'build-sub'], function() {
    return gulp.src(watchPaths)
        .pipe(connect.reload())
});

/**
 * Regenerate demo document when a file changes
 */
gulp.task('watch', ['doc', 'build-sub'], function() {
    var watcher = gulp.watch(watchPaths, ['doc', 'build-sub', 'reload']);
    watcher.on('change', function(event) {
        console.log('File: ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/**
 * Run web server
 */
gulp.task('connect', ['doc'], function() {
    connect.server({
        root: DEMO_DESTINATION_PATH,
        livereload: true
    });
});


gulp.task('serve', ['connect', 'watch']);



gulp.task('build', async function() {
    const bundle = await rollup.rollup({
        input: './src/index.js',
        plugins: [

            babel({
                exclude: 'node_modules/**' // 只编译我们的源代码
            }),
            options.env==='dev'?{}:minify()
        ]
    });
    await bundle.write({
        file: './dist/jfe.js',
        format: 'umd',
        name: 'JFE',
        intro:'/**九次方大数据前端工具库*/' ,
        sourcemap: true
    });
});

let filsList = [];
gulp.task('build-sub', function() {
    fs.readdir('./src/', function(err, files) {
        files.map(async function(v, i) {
            if (v != '.DS_Store' && v != 'common' && v != 'index.js') {
                filsList[i] = await rollup.rollup({
                    input: `./src/${v}/index.js`,
                    plugins: [
                        babel({
                            exclude: 'node_modules/**' // 只编译我们的源代码
                        }),
                        options.env==='dev'?{}:minify()
                    ]
                });
                await filsList[i].write({
                    file: `./dist/${v}.js`,
                    format: 'umd',
                    intro:'/**九次方大数据前端工具库*/' ,
                    name: `JFE.${v}`,
                    sourcemap: true
                });
            }
        })
    })
});



/**
 * @command gulp del
 * Delete all demo-doc files
 */
gulp.task('del', function() {
    return del([DEMO_DESTINATION_PATH]);
});
/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Gulpfile
 */
'use strict';
var path = require('path');
var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var jsdoc = require('gulp-jsdoc3');

/* Demo paths */
var DEMO_PATH = path.join(__dirname, 'build');
var  DEMO_TEMPLATE_PATH= __dirname;
console.log(DEMO_TEMPLATE_PATH)

var DEMO_DESTINATION_PATH = 'doc';

var demoFilePaths = ['./src/*.js','./src/*/*.js','./src/*/*/*.js'].map(function (filePath) {
    return path.join(DEMO_TEMPLATE_PATH, filePath);
});
demoFilePaths.push('README.md');

console.log(demoFilePaths)
gulp.task('demo:default', ['del'], function(done) {
    var config = {
        opts: {destination: path.join(DEMO_DESTINATION_PATH, '-docstrap')}
    };

    gulp.src(demoFilePaths, {read: false})
        .pipe(jsdoc(config, done));
});

/**
 * Generate demo document
 */
gulp.task('demo', ['del'], function(done) {
    /* Demo config */
    var domeConfigPath = path.join(DEMO_PATH, 'doc_config/jsdoc-conf.json');
    var config = require(domeConfigPath);
    delete require.cache[require.resolve(domeConfigPath)]; // remove cache

    config.opts.template = DEMO_TEMPLATE_PATH;
    config.opts.destination = DEMO_DESTINATION_PATH;

    gulp.src(demoFilePaths, {read: false})
        .pipe(jsdoc(config, done));
});

/**
 * Watch file paths
 * @type {string[]}
 */
var watchPaths = [
    'src/**/*.js',
    'src/ *.js',
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
gulp.task('reload', ['demo'], function() {
    return gulp.src(watchPaths)
        .pipe(connect.reload())
});

/**
 * Regenerate demo document when a file changes
 */
gulp.task('watch', ['demo'] ,function() {
    var watcher = gulp.watch(watchPaths, ['demo', 'reload']);

    watcher.on('change', function (event) {
        console.log('File: ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

/**
 * Run web server
 */
gulp.task('connect', ['demo'], function() {
    connect.server({
        root: DEMO_DESTINATION_PATH,
        livereload: true
    });
});

/**
 * @command gulp serve
 * Connect-server with watch
 */
gulp.task('serve', ['connect', 'watch']);


/**
 * @command gulp del
 * Delete all demo-doc files
 */
gulp.task('del', function() {
    return del([DEMO_DESTINATION_PATH]);
});

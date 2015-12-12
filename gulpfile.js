var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var shim = require('browserify-shim');
// var Gitdown = require('gitdown');
// var bump = require('gulp-bump');
var karma = require('gulp-karma');
var Server = require('karma').Server;

var testFiles = [
  'promisefilter.js',
  'test/*.spec.js'
];

gulp.task('scripts', function () {
  return browserify('./src/promisefilter.js', { standalone: 'promisefilter' })
    .transform(shim)
    .bundle()
    .pipe(source('promisefilter.js'))
    .pipe(gulp.dest('./'))
    .pipe(rename('promisefilter.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./'));
});

gulp.task('bump', function(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['jshint', 'jscs', 'scripts']);
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
  // return gulp.src(testFiles)
  //   .pipe(karma({
  //     configFile: 'karma.conf.js',
  //     action: 'run'
  //   }))
  //   .on('error', function(err) {
  //     // Make sure failed tests cause gulp to exit non-zero 
  //     throw err;
  //   });
});

gulp.task('testWatch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
  // return gulp.src(testFiles)
  //   .pipe(karma({
  //     configFile: 'karma.conf.js',
  //     action: 'watch'
  //   }))
  //   .on('error', function(err) {
  //     // Make sure failed tests cause gulp to exit non-zero 
  //     throw err;
  //   });
});

//Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('src/*')
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

//JavaScript Code Style
gulp.task('jscs', function () {
  return gulp.src([
      'src/*.js'
    ])
    .pipe($.jscs());
});

gulp.task('default', ['scripts', 'testWatch', 'watch']);
gulp.task('all', ['jshint', 'jscs', 'scripts', 'test']);
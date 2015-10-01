'use strict';

var gulp = require('gulp'),

    less = require('gulp-less'),
    path = require('path'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    jshint = require('gulp-jshint'),
    install = require("gulp-install"),
    //jscs = require('gulp-jscs'),
    paths = {
            js: ['*.js', '**/*.js', '!**/node_modules/**', '!public/**', '!client/iotphone/**', '!test/ut-coverage/**', '!test/integ-tests-coverage/**', '!test/all-tests-coverage/**', '!test/merged-coverage/**']
     };

gulp.task('bower', function() {
  return gulp.src(['./bower.json'])
    .pipe(install({
      allowRoot: true
    }));
});

/*
 Gulp tasks for linting
*/
gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
  //.pipe(jscs());
});

gulp.task('iotphone', function(){
  return gulp.src('client/iotphone/**/*')
  .pipe(gulp.dest('public/iotphone'));
});

gulp.task('browserify.prod', function(){
  return browserify('./client/app/app.js')
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('browserify.dev', function() {
  return browserify('./client/app/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('polymer_components', function() {
  return gulp.src('client/app/shared/elements/**/*')
    .pipe(gulp.dest('public/app/shared/elements'));
});

gulp.task('less', function() {
	return gulp.src('./client/assets/less/*.less')
	.pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
	.pipe(gulp.dest('public/assets/css'));
});

gulp.task('views', function(){
  return gulp.src('client/**/*.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('images', function() {
  return gulp.src('client/assets/img/**/*.*')
    .pipe(gulp.dest('public/assets/img'));
});

gulp.task('css', function() {
  return gulp.src('client/assets/css/**/*.*')
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('./client/app/shared/elements/**/*', ['polymer_components']);
  gulp.watch('./client/app/**/*.js', ['browserify.dev']);
  gulp.watch('./client/app/**/*.html', ['views']);
  gulp.watch('./client/app/**/*.*', ['images']);
  gulp.watch('./client/assets/less/*.less', ['less']);
});

gulp.task('prodrun', ['lint', 'iotphone', 'browserify.prod', 'polymer_components', 'views', 'images','less','css'], function(){
  gulp.src('./client/play.html')
    .pipe(htmlreplace({
      'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('devrun', ['lint', 'iotphone', 'browserify.dev', 'polymer_components', 'views', 'images','less','css'], function() {
  gulp.src('./client/play.html')
    .pipe(htmlreplace({
      'js': 'js/bundle.js'
    }))
    .pipe(gulp.dest('./public'));
  gulp.start('watch');
});

gulp.task('prod', ['bower'], function() {
  gulp.start('prodrun');
});

gulp.task('default', ['bower'], function() {
  gulp.start('devrun');
});

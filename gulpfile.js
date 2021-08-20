// if you want run write 'gulp watch' in console.

"use strict";

// Load plugins
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify');

// CSS task
function css() {
  return gulp
    .src(
      [
        "./assets/css/style.scss"
      ])
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/public/css'));
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./assets/scripts/*", "./gulpfile.js"])
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src([
       "./assets/js/index.js",
      ])
      .pipe(uglify())
      .pipe(concat('index.js'))
      .pipe(gulp.dest("./assets/public/js"))
  );
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/css/**/*", css);
  gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
}


// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(gulp.parallel(css, js));
const watch = gulp.parallel(watchFiles);


// export tasks
exports.css = css;
exports.js = js;
exports.watch = watch;
'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').get('Local Server');

const isDev = !process.env.NODE_ENV;

// Компиляция стилей проекта
task('styles', function() {
  let pluginsPostcss = [autoprefixer(), mqpacker({ sort: true })];

  return src(`${settings.paths.src.styles}style.less`)
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss(pluginsPostcss))
    .pipe(csso({ comments: false }))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(settings.paths.dest.styles))
    .pipe(gulpIf(isDev, browserSync.stream()));
});

'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').get('Local Server');

const isDev = !process.env.NODE_ENV;

// Компиляция стилей проекта
const styles = () => {
  const pluginsPostcss = [autoprefixer()];

  return src(`${source.styles}style.less`, { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss(pluginsPostcss))
    .pipe(csso({ forceMediaMerge: true, comments: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(desination.styles, { sourcemaps: true }), dest(desination.styles)))
    .pipe(gulpIf(isDev, browserSync.stream()));
};

module.exports = styles;

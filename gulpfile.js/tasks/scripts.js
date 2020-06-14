'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const isDev = !process.env.NODE_ENV;

// Минификация JS файлов
const scripts = () =>
  src(`${source.scripts}**/*.js`, { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(desination.scripts, { sourcemaps: true }), dest(desination.scripts)));

module.exports = scripts;

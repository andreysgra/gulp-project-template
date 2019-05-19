'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const isDev = !process.env.NODE_ENV;

// Минификация JS файлов
task('scripts', () =>
  src(`${settings.paths.src.scripts}**/*.js`)
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(settings.paths.dest.scripts))
);

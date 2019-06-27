'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const isDev = !process.env.NODE_ENV;

// Минификация JS файлов
task('scripts', () =>
  src(`${settings.paths.src.scripts}**/*.js`, { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(settings.paths.dest.scripts, { sourcemaps: true }), dest(settings.paths.dest.scripts)))
);

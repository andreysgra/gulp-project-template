'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const changed = require('gulp-changed');

// Копирование шрифтов
task('fonts', () =>
  src(`${settings.paths.src.fonts}**/*.{woff,woff2}`)
    .pipe(changed(settings.paths.dest.fonts))
    .pipe(dest(settings.paths.dest.fonts))
);

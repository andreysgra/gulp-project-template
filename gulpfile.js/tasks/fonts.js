'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');

// Копирование шрифтов

const fonts = () =>
  src(`${source.fonts}**/*.{woff,woff2}`)
    .pipe(changed(desination.fonts))
    .pipe(dest(desination.fonts));

module.exports = fonts;

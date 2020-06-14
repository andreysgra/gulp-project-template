'use strict';

const { paths: { desination }, vendor } = require('../settings');
const { src, dest } = require('gulp');

// Копирование вендорных JS файлов
const copy = () =>
  src(vendor.scripts)
    .pipe(dest(desination.scripts));

module.exports = copy;

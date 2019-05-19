'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');

// Копирование вендорных JS файлов
task('copy', () =>
  src(settings.vendor.scripts).pipe(dest(settings.paths.dest.scripts))
);

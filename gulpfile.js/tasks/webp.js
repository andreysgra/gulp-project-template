'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const changed = require('gulp-changed');
const webp = require('gulp-webp');

// Конвертация контентных изображений в формат WebP
task('webp', () =>
  src(`${settings.paths.src.images.content}**/*.jpg`)
    .pipe(changed(settings.paths.dest.images.content, { extension: '.webp' }))
    .pipe(webp({ quality: 80 }))
    .pipe(dest(settings.paths.dest.images.content))
);

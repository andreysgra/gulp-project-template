'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const gulpWebp = require('gulp-webp');

// Конвертация контентных изображений в формат WebP
const webp = () =>
  src(`${source.images.content}**/*.{jpg,png}`)
    .pipe(changed(desination.images.content, { extension: '.webp' }))
    .pipe(gulpWebp({ quality: 80 }))
    .pipe(dest(desination.images.content));

module.exports = webp;

'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');

const isProd = Boolean(process.env.NODE_ENV);

// Оптимизация изображений
const images = () => {
  const pluginsSvgo = [
    { removeViewBox: false },
    { removeTitle: true },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  const pluginsImagemin = [
    imagemin.optipng(),
    imagemin.svgo({
      plugins: pluginsSvgo
    }),
    imageminJpegoptim({
      max: 80,
      progressive: true
    })
  ];

  return src([
    `${source.images.all}**/*.{jpg,png,svg}`,
    `!${source.images.icons}*.{jpg,png,svg}`
  ])
    .pipe(changed(desination.images.all))
    .pipe(gulpIf(isProd, imagemin(pluginsImagemin)))
    .pipe(dest(desination.images.all));
};

module.exports = images;

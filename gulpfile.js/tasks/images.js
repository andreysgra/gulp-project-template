'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');

const isProd = !!process.env.NODE_ENV;

// Оптимизация изображений
task('images', () => {
  let pluginsSvgo = [
    { removeViewBox: false },
    { removeTitle: true },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  let pluginsImagemin = [
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
    `${settings.paths.src.images.all}**/*.{jpg,png,svg}`,
    `!${settings.paths.src.images.icons}*.{jpg,png,svg}`
  ])
    .pipe(changed(settings.paths.dest.images.all))
    .pipe(gulpIf(isProd, imagemin(pluginsImagemin)))
    .pipe(dest(settings.paths.dest.images.all));
});

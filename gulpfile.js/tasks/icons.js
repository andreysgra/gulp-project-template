'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');

const isProd = !!process.env.NODE_ENV;

// Сборка SVG спрайта
task('icons', () => {
  let pluginsSvgo = [
    { removeViewBox: false },
    { removeTitle: true },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  let pluginsImagemin = [imagemin.svgo({ plugins: pluginsSvgo })];

  return src(`${settings.paths.src.images.icons}**/*.svg`)
    .pipe(gulpIf(isProd, imagemin(pluginsImagemin)))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('symbols.svg'))
    .pipe(dest(settings.paths.dest.images.all));
});

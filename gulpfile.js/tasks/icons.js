'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');

const isProd = Boolean(process.env.NODE_ENV);

// Сборка SVG спрайта
const icons = () => {
  const pluginsSvgo = [
    { removeViewBox: false },
    { removeTitle: true },
    { cleanupNumericValues: { floatPrecision: 1 } }
  ];

  const pluginsImagemin = [imagemin.svgo({ plugins: pluginsSvgo })];

  return src(`${source.images.icons}**/*.svg`)
    .pipe(gulpIf(isProd, imagemin(pluginsImagemin)))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('symbols.svg'))
    .pipe(dest(desination.images.all));
};

module.exports = icons;

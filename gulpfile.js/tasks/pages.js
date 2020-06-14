'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');

// Минификация HTML
const pages = () => {
  const optionsHtmlmin = {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true
  };

  return src(`${source.root}*.html`)
    .pipe(changed(desination.root))
    .pipe(htmlmin(optionsHtmlmin))
    .pipe(dest(desination.root));
};

module.exports = pages;

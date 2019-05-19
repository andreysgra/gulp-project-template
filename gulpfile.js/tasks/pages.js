'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');

// Минификация HTML
task('pages', () => {
  let optionsHtmlmin = {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true
  };

  return src(`${settings.paths.src.root}*.html`)
    .pipe(changed(settings.paths.dest.root))
    .pipe(htmlmin(optionsHtmlmin))
    .pipe(dest(settings.paths.dest.root));
});

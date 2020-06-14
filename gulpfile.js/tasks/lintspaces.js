'use strict';

const { paths: { source } } = require('../settings');
const { src } = require('gulp');
const gulpLintspaces = require('gulp-lintspaces');

// Линтинг в соответствии с настройками .editorconfig
const lintspaces = () =>
  src([
    '*.json',
    '*.md',
    './gulpfile.js/**/*.js',
    `${source.root}*.html`,
    `${source.scripts}**/*.js`,
    `${source.images}**/*.svg`,
    `${source.styles}**/*.less`
  ])
    .pipe(gulpLintspaces({ editorconfig: '.editorconfig' }))
    .pipe(gulpLintspaces.reporter());

module.exports = lintspaces;

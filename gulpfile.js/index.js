'use strict';

const dir = require('require-dir')('./tasks');
const { clean, fonts, copy, pages, styles, scripts, images, webp, icons } = dir;
const { zip, server, watcher, lintspaces } = dir;

const { series, parallel } = require('gulp');

const build = series(
  clean,
  parallel(fonts, copy, pages, styles, scripts, images, webp, icons)
);

exports.zip = series(zip);
exports.lintspaces = series(lintspaces);
exports.build = build;
exports.default = series(build, server, watcher);

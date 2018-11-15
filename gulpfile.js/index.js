'use strict';

require('require-dir')('./tasks');

const { task, series, parallel } = require('gulp');

task(
  'build',
  series(
    'clean',
    parallel('fonts', 'copy', 'pages', 'styles', 'scripts', 'images', 'icons')
  )
);

task('default', series('build', 'server', 'watch'));

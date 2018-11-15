'use strict';

const settings = require('../settings');
const { task } = require('gulp');
const browserSync = require('browser-sync').create('Local Server');

// Локальный сервер
task('server', function(done) {
  browserSync.init({
    server: settings.paths.dest.root,
    cors: true,
    notify: false,
    reloadOnRestart: true
  });

  done();
});

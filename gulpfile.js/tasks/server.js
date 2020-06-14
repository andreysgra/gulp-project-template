'use strict';

const { paths: { desination } } = require('../settings');
const browserSync = require('browser-sync').create('Local Server');

// Локальный сервер
const server = done => {
  browserSync.init({
    server: desination.root,
    cors: true,
    notify: false,
    reloadOnRestart: true
  });

  done();
};

module.exports = server;

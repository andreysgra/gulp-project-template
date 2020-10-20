'use strict';

const { paths: { source, desination } } = require('../settings');
const { src, dest } = require('gulp');
const config = require('../../webpack.config.js');
const stream = require('webpack-stream');
const webpack = require('webpack');

// Минификация JS файлов
const scripts = () =>
  src(`${source.scripts}**/*.js`)
    .pipe(stream(config, webpack))
    .pipe(dest(desination.scripts));

module.exports = scripts;

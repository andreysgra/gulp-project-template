'use strict';

const { paths: { desination } } = require('../settings');
const del = require('del');

// Удаление каталога сборки
const clean = () => del(desination.root);

module.exports = clean;

'use strict';

const { paths: { desination, dist } } = require('../settings');
const { src, dest } = require('gulp');
const gulpZip = require('gulp-zip');

const leadingZero = number => number < 10 ? `0${number}` : number;

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = leadingZero(now.getMonth() + 1);
  const day = leadingZero(now.getDate());
  const hours = leadingZero(now.getHours());
  const minutes = leadingZero(now.getMinutes());
  const seconds = leadingZero(now.getSeconds());

  return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
};

// Сборка дистрибутива
const zip = () => {
  const dateTime = getDateTime();
  const fileName = `dist-${dateTime}.zip`;

  return src(`${desination.root}**/*.*`)
    .pipe(gulpZip(fileName))
    .pipe(dest(dist));
};

module.exports = zip;

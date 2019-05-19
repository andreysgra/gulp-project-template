'use strict';

const settings = require('../settings');
const { task, src, dest } = require('gulp');
const zip = require('gulp-zip');

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

task('zip', () => {
  let dateTime = getDateTime();
  let fileName = `dist-${dateTime}.zip`;

  return src(`${settings.paths.dest.root}**/*.*`)
    .pipe(zip(fileName))
    .pipe(dest(settings.paths.dist));
});

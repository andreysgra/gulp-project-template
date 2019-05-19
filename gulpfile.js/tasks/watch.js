'use strict';

const settings = require('../settings');
const { task, series, watch } = require('gulp');
const browserSync = require('browser-sync').get('Local Server');

task('watch', () => {
  watch(`${settings.paths.src.root}*.html`).on(
    'all',
    series('pages', browserSync.reload)
  );
  watch(`${settings.paths.src.fonts}**/*.{woff,woff2}`).on(
    'all',
    series('fonts', browserSync.reload)
  );
  watch(`${settings.paths.src.scripts}**/*.js`).on(
    'all',
    series('scripts', browserSync.reload)
  );
  watch(`${settings.paths.src.styles}**/*.less`).on('all', series('styles'));
  watch([
    `${settings.paths.src.images.all}**/*.{jpg,png,svg}`,
    `!${settings.paths.src.images.icons}**/*.{jpg,png,svg}`
  ]).on('all', series('images', browserSync.reload));
  watch(`${settings.paths.src.images.icons}**/*.svg`).on(
    'all',
    series('icons', browserSync.reload)
  );
  watch(`${settings.paths.src.images.content}**/*.jpg`).on(
    'all',
    series('webp', browserSync.reload)
  );
});

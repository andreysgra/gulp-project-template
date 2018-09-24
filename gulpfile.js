"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const del = require("del");
const concat = require("gulp-concat");
const run = require("run-sequence");
const browserSync = require("browser-sync").create();

let rootDirs = {
  src: "src/",
  build: "build/"
};

let projectDirs = {
  src: {
    root: rootDirs.src,
    style: rootDirs.src + "less/",
    js: rootDirs.src + "js/",
    img: rootDirs.src + "img/",
    webp: rootDirs.src + "img/content/",
    fonts: rootDirs.src + "fonts/"
  },
  build: {
    root: rootDirs.build,
    css: rootDirs.build + "css/",
    js: rootDirs.build + "js/",
    img: rootDirs.build + "img/",
    webp: rootDirs.build + "img/content/",
    icons: rootDirs.build + "img/icons/",
    fonts: rootDirs.build + "fonts/"
  }
};

// Удаление каталога сборки
gulp.task("clean", function () {
  return del(projectDirs.build.root);
});

// Удаление каталога иконок для SVG спрайта
gulp.task("clean:icons", function () {
  return del(projectDirs.build.img + "icons");
});

// Копирование шрифтов
gulp.task("copy:fonts", function () {
  console.log("Копирование шрифтов...");

  return gulp
    .src(projectDirs.src.fonts + "**/*.{woff,woff2}")
    .pipe(gulp.dest(projectDirs.build.fonts));
});

// Копирование JS-файлов
gulp.task("copy:js", function () {
  console.log("Копирование JS-файлов...");

  return gulp
    .src([
      "node_modules/picturefill/dist/picturefill.min.js",
      "node_modules/svg4everybody/dist/svg4everybody.min.js",
      "node_modules/babel-polyfill/dist/polyfill.min.js"
    ])
    .pipe(gulp.dest(projectDirs.build.js));
});

// Минификация HTML
gulp.task("html", function () {
  const htmlmin = require("gulp-htmlmin");

  console.log("Минификация HTML...");

  return gulp
    .src(projectDirs.src.root + "*.html")
    .pipe(
      htmlmin({
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest(projectDirs.build.root))
    .pipe(browserSync.stream());
});

// Линтинг в соответствии с настройками .editorconfig
gulp.task("lintspaces", function () {
  const lintspaces = require("gulp-lintspaces");

  return gulp
    .src([
      projectDirs.src.root + "*.html",
      "*.json",
      "*.js",
      "*.md",
      projectDirs.src.root + "**/*.js",
      projectDirs.src.img + "**/*.svg",
      projectDirs.src.style + "**/*.less"
    ])
    .pipe(lintspaces({ editorconfig: ".editorconfig" }))
    .pipe(lintspaces.reporter());
});

// Компиляция стилей проекта
gulp.task("style", function () {
  const less = require("gulp-less");
  const postcss = require("gulp-postcss");
  const autoprefixer = require("autoprefixer");
  const mqpacker = require("css-mqpacker");
  const csso = require("gulp-csso");

  let plugins = [autoprefixer(), mqpacker({ sort: true })];

  console.log("Компиляция стилей...");

  return gulp
    .src(projectDirs.src.style + "style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(csso({ comments: false }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(projectDirs.build.css))
    .pipe(browserSync.stream());
});

// Минификация JS скриптов
gulp.task("js", function () {
  const uglify = require("gulp-uglify");
  const babel = require("gulp-babel");
  const sourcemaps = require("gulp-sourcemaps");

  console.log("Минификация JS...");

  return gulp
    .src([projectDirs.src.js + "**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(projectDirs.build.js))
    .pipe(browserSync.stream());
});

// Оптимизация изображений
gulp.task("images", function () {
  const jpegoptim = require("imagemin-jpegoptim");

  console.log("Оптимизация изображений...");

  return gulp
    .src(projectDirs.src.img + "**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng(),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeTitle: true },
            {
              cleanupNumericValues: { floatPrecision: 1 }
            }
          ]
        }),
        jpegoptim({
          max: 80,
          progressive: true
        })
      ])
    )
    .pipe(gulp.dest(projectDirs.build.img));
});

// Конвертация контентных изображений в формат WebP
gulp.task("webp", function () {
  const webp = require("imagemin-webp");

  console.log("Конвертирование изображений в формат WebP...");

  return gulp
    .src(projectDirs.src.webp + "**/*.jpg")
    .pipe(imagemin([webp({ quality: 80 })]))
    .pipe(rename({ extname: ".webp" }))
    .pipe(gulp.dest(projectDirs.build.webp));
});

// Сборка SVG спрайта
gulp.task("sprite", function () {
  const svgstore = require("gulp-svgstore");

  console.log("Сборка SVG спрайта...");

  return gulp
    .src(projectDirs.build.icons + "*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("symbols.svg"))
    .pipe(gulp.dest(projectDirs.build.img));
});

// Локальный сервер
gulp.task("serve", function () {
  browserSync.init({
    server: projectDirs.build.root,
    cors: true,
    notify: false
  });

  gulp.watch(projectDirs.src.style + "**/*.less", ["style"]);
  gulp.watch(projectDirs.src.root + "*.html", ["html"]);
  gulp.watch(projectDirs.src.js + "*.js", ["js"]);
});

// Сборка проекта
gulp.task("build", function (callback) {
  run(
    "clean",
    "copy:fonts",
    "copy:js",
    "html",
    "style",
    "js",
    "images",
    "webp",
    "sprite",
    "clean:icons",
    callback
  );
});

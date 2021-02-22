var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var del = require("del");


gulp.task("styles", done => {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ["last 2 versions", "not ie <= 10"],
        cascade: false
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series('styles')).on("change", server.reload);
  gulp.watch("src/*.html").on("change", server.reload);
  gulp.watch("src/js/**/*.js").on("change", server.reload);
});


gulp.task("style", done => {
  gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: ["last 2 versions", "not ie <= 10"],
        cascade: false
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
  done();
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series('styles')).on("change", server.reload);
  gulp.watch("src/*.html").on("change", server.reload);
  gulp.watch("src/js/**/*.js").on("change", server.reload);
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
          plugins: [
            { removeDimensions: false },
            { cleanupIDs: false }
          ]
      })]))
.pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
      "src/*.html",
      "src/fonts/**/*.{woff,woff2}",
      "src/img/**",
      "src/js/**",
      "src/css/**",
      "src/*.ico"
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series('clean', 'copy', 'style', 'images', 'serve', function (done) {
  done();
}));

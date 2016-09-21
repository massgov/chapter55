/* global require */
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var runSequence = require('run-sequence');
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require('browser-sync').create();


gulp.task('vendorJS', function() {
  return gulp.src([
      "js/vendor/modernizr.js",
      "js/vendor/jquery-1.11.1.min.js",
      "js/vendor/jquery-ui.js",
      "js/vendor/bootstrap.js",
      "js/vendor/d3.min.js",
      "js/vendor/colorbrewer.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('js/dist'));
});

gulp.task('javascript', function () {
  return gulp.src([
      "js/queue.js",
      "js/custom.js",
      "js/map-death.js",
      "js/map-composite.js",
      "js/maps-substance.js",
      "js/lines-death.js",
      "js/lines-fent.js",
      "js/lines-bsas.js",
      // "js/blocks-substance-pie.js",
      "js/blocks-bar.js",
      "js/blocks-gender.js",
      "js/bars-age.js",
      "js/bars-race.js",
      "js/maps_binary5yr.js",
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/dist'))
    .pipe(uglify({
      compress: {
       drop_debugger: false,
	     drop_console: false
      },
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('js/dist'));

});




gulp.task('js-watch', ['javascript'], function (done) {
    browserSync.reload();
    done();
});



// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'vendorJS', 'javascript'], function() {

    browserSync.init({
	server: "."
    });

    gulp.watch("css/scss/*.scss", ['sass']);
    gulp.watch("js/**/*.js", ['js-watch']);
    gulp.watch("index.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("css/scss/main.scss")
	.pipe(sass())
	.pipe(gulp.dest("css"))
	.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

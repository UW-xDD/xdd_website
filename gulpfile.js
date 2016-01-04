var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlhint = require('gulp-htmlhint');
var uglify = require('gulp-uglify');

gulp.task('default', ['build']);

gulp.task('build', function() {
  // Lint the html
  gulp.src(['./index.html', './about.html', './people.html'])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());

  gulp.src([
    './dist/js/zepto.min.js',
    './dist/js/underscore.min.js',
    './dist/js/mustache.min.js',
    './dist/js/q.js',
    './dist/js/colors.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js/'));

});

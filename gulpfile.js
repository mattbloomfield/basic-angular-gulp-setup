var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');

    var basepath = 'public';

var styles = ['src/app/scss/style.scss', 'src/pages/**/*.scss'];

gulp.task('sass', function () {
  return gulp.src(styles)
    .pipe(concat('bundle.scss'))
    .pipe(sass().on('error', function() {
        notify({ message: 'Sass failed to compile'})
    }))
    .pipe(gulp.dest(basepath + '/bin/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest(basepath + '/bin/css'))
    .pipe(notify({ message: 'Sass task complete' }))
    .pipe(livereload());
});

var javascripts = ['src/app/js/app.js', 'src/app/js/services/*.js', 'src/pages/**/*.js'];

gulp.task('scripts', function() {
  return gulp.src(javascripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(basepath + '/bin/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(basepath + '/bin/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
});

var htmls = ['src/*.html', 'src/pages/**/*.html'];

gulp.task('copyHtml', function() {
  return gulp.src(htmls)
  .pipe(gulp.dest(basepath))
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen({ basePath: basepath });
  gulp.watch(styles, ['sass']);
  gulp.watch(javascripts, ['scripts'])
  gulp.watch(htmls, ['copyHtml']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname + '/' + basepath, index: 'index.html', cache: false })
  ).listen(8080, done);
});
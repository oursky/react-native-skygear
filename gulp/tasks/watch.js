const gulp = require('gulp');
require('./build');

gulp.task('watch', () => {
  return gulp.watch('src/**/*.ts', gulp.series('build'));
});
const gulp = require('gulp');
const tslint = require('gulp-tslint');
const excludeGitignore = require('gulp-exclude-gitignore');

gulp.task('lint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(excludeGitignore())
    .pipe(tslint())
    .pipe(tslint.report());
});

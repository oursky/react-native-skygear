const path = require('path');

const gulp = require('gulp');
const gulpTS = require("gulp-typescript");
const project =
  gulpTS.createProject(path.resolve(__dirname, '../../', 'tsconfig.json'));

gulp.task('build', () => {
  return project.src()
    .pipe(project())
    .js
    .pipe(gulp.dest(path.resolve(__dirname, '../../', 'bin')));
});
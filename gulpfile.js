var gulp= require('gulp');
var cssnano= require('gulp-cssnano');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var livereload=require('gulp-livereload');
var rename= require('gulp-rename');
var gutil= require('gulp-util');

gulp.task("scripts",function () {
	// body...

	gulp.src(["js/*.js"])
	.pipe(concat('stocks.js'))
	// .pipe(rename({suffix:".min"}))
	.pipe(uglify())
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest('js/stocks'))
})

gulp.task('default',['scripts'])
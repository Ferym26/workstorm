"use strict";
/**
var gulp = require("gulp"),
		sass = require("gulp-sass"),
		concat = require("gulp-concat"),
		debug = require("gulp-debug"),
		sourcemaps = require("gulp-sourcemaps"),
		del = require('del');


gulp.task('styles', function() {

	return  gulp.src('frontned/sass/main.sass')
	.pipe(sourcemaps.init())
	.pipe(sass())
	
	.pipe(sourcemaps.write('.' ))
	.pipe(gulp.dest('app/css'));


});

gulp.task('clean', function() {
	return del('app/css')
});

gulp.watch('frontned/sass/??', ['styles']);

gulp.task('build', gulp.series('clean', 'styles'));
gulp.task('default', ['clean', 'styles']);  
**/


var gulp         = require('gulp'),
		browserSync  = require('browser-sync').create(),
		sass         = require('gulp-sass'),
		pug          = require('gulp-pug'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),


		debug        = require("gulp-debug"),
		sourcemaps   = require("gulp-sourcemaps"),

		imagemin     = require('gulp-imagemin'),
		pngquant     = require('imagemin-pngquant'),

		del          = require('del');



gulp.task('serve', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false,
				reloadDelay: 300
		});
		
});
//['styles', 'scripts', 'pug']


gulp.task('styles', function () {
	return gulp.src('frontend/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});


//gulp.task('pug', function build() {
//  return gulp.src('frontend/pug/**/*.pug')
//  	.pipe(debug({title: 'src'}))
//    .pipe(pug({pretty: true, filename: 'workstorm.local/'}))
//    .pipe(debug({title: 'pug'}))
//    .pipe(gulp.dest('app'));
//});







gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-2.2.2.min.js',
		'./app/libs/jquery/jquery-ui.min.js',
		'./app/libs/waypoints/waypoints.min.js',
		'./app/libs/plugins-scroll/plugins-scroll.js',

		'./app/libs/animate/animate-css.js',		
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});


 
gulp.task('imgmin', () => {
	return gulp.src('frontend/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('app/img/'));
});



gulp.task('watch', function () {
	gulp.watch('frontend/sass/**/*.sass', ['styles']);
	//gulp.watch('frontend/pug/**/*.pug', ['pug']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('frontend/img/*', ['imgmin']);
});







gulp.task('default', ['serve', 'watch']);




 

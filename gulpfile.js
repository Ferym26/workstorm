"use strict";

var gulp         = require('gulp'),
		browserSync  = require('browser-sync').create(),
		sass         = require('gulp-sass'),
		pug          = require('gulp-pug'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),//сжимает js


		debug        = require("gulp-debug"),
		sourcemaps   = require("gulp-sourcemaps"),
		notify       = require('gulp-notify'),//вывод предупреждения об ошибке в консоль
		growl        = require('gulp-notify-growl'),//вывод предупреждения об ошибке в win
		plumber      = require('gulp-plumber'),

		imagemin     = require('gulp-imagemin'),
		pngquant     = require('imagemin-pngquant'),
		newer        = require('gulp-newer'),//отдает в поток только обновлнные файлы

		del          = require('del');



//for update plagins use "ncu"
//for debug .pipe(debug({title: 'TITLE'}))



var growlNotifier = growl();



gulp.task('serve', ['styles', 'scripts', 'pug'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false,
				reloadDelay: 300
		});
		
});



gulp.task('styles', function () {
	gulp.src('frontend/sass/*.sass')
		//.pipe(sourcemaps.init())		
		.pipe(sass({includePaths: require('node-bourbon').includePaths}))
		.on('error', growlNotifier.onError({
			title: 'SASS'
		}))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
		.pipe(cleanCSS())
		//.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());	
});



gulp.task('pug', function build() {
	gulp.src('frontend/pug/**/*.pug')
		.pipe(plumber())
		.pipe(pug({pretty: true, basedir: __dirname + '/frontend/pug'}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.stream());
});



gulp.task('imgmin', () => {
	return gulp.src('frontend/img/*')		
		.pipe(newer('app/img/'))		
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('app/img/'));
});



gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/jquery/dist/jquery.min.js',		
		'./app/libs/modernizer/modernizr.js',
		'./app/libs/waypoints/lib/jquery.waypoints.min.js',
		'./app/libs/plugins-scroll/plugins-scroll.js',
		'./app/libs/owl.carousel/dist/owl.carousel.min.js',
		])
		.pipe(concat('libs.js'))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});



gulp.task('watch', function () {
	gulp.watch('frontend/sass/**/*.sass', ['styles']);
	gulp.watch('frontend/pug/**/*.pug', ['pug']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('frontend/img/*', ['imgmin']);
});



gulp.task('default', ['serve', 'watch']);




 

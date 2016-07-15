"use strict";

var	gulp           = require('gulp'),
		browserSync    = require('browser-sync').create(),
		sass           = require('gulp-sass'),
		pug            = require('gulp-pug'),
		autoprefixer   = require('gulp-autoprefixer'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),//сжимает js

		mainBowerFiles = require('gulp-main-bower-files'),
		filter         = require('gulp-filter'),

		debug          = require("gulp-debug"),
		sourcemaps     = require("gulp-sourcemaps"),
		notify         = require('gulp-notify'),//вывод предупреждения об ошибке
		plumber        = require('gulp-plumber'),

		imagemin       = require('gulp-imagemin'),
		pngquant       = require('imagemin-pngquant'),
		newer          = require('gulp-newer'),//отдает в поток только обновлнные файлы

		del            = require('del');



//for update plagins use "ncu"
//npm update -a/--upgradeAll
//for debug .pipe(debug({title: 'TITLE'}))



gulp.task('serve', ['styles', 'vendors', 'pug'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				port: 3003,
				notify: false,
				reloadDelay: 300
		});

});



gulp.task('styles', function () {
		gulp.src('frontend/sass/*.{scss,sass}')
				//.pipe(sourcemaps.init())
				.pipe(sass({includePaths: require('node-bourbon').includePaths}))
				.on('error', notify.onError({
						title: 'SASS error'
				}))
				.pipe(rename({suffix: '.min', prefix : ''}))
				.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
				.pipe(cleanCSS())
				//.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest('app/css'))
				.pipe(browserSync.stream());
});



gulp.task('pug', function build() {
		gulp.src('frontend/pug/*.pug')
				.pipe(plumber())
				.pipe(pug({pretty: true, basedir: __dirname + '/frontend/pug'}))
				.on('error', notify.onError({
						title: 'PUG error'
				}))
				.pipe(gulp.dest('app'))
				.pipe(browserSync.stream());
});



gulp.task('imgmin', function () {
		return gulp.src('frontend/img/*.{png,jpg,jpeg,svg}')
				.pipe(newer('app/img/'))
				.pipe(imagemin({
						progressive: true,
						svgoPlugins: [{removeViewBox: false}],
						use: [pngquant()]
				}))
				.pipe(gulp.dest('app/img/'));
});



gulp.task('bower', function(){
		var filterJS = filter('**/*.js', { restore: true });
		return gulp.src('./bower.json')
				.pipe(mainBowerFiles( ))
				.pipe(filterJS)
				.pipe(concat('bower_components.js'))
				//.pipe(filterJS.restore) //оставляет только js когда off
				.pipe(gulp.dest('app/js/'));
});



gulp.task('vendors', ['bower'], function () {
		return gulp.src(['app/js/bower_components.js', 'app/libs/**/*.js'])
				//.pipe(sourcemaps.init())
				.pipe(concat('vendors.js'))
				//.pipe(uglify()) //off for speed
				//.pipe(sourcemaps.write())
				.pipe(gulp.dest('app/js/'))
});



gulp.task('watch', function () {
		gulp.watch('frontend/sass/**/*.{scss,sass}', ['styles']);
		gulp.watch('frontend/pug/**/*.pug', ['pug']);

		gulp.watch('app/libs/**/*.js', ['vendors']);
		gulp.watch('bower_components/**/*.js', ['vendors']);

		gulp.watch('app/js/*.js').on("change", browserSync.reload);
		gulp.watch('app/*.html').on('change', browserSync.reload);
		gulp.watch('frontend/img/*.{png,jpg,jpeg,svg}', ['imgmin']);
});



gulp.task('default', ['serve', 'watch']);
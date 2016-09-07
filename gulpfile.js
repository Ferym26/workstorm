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

		del            = require('del'),

		gutil          = require('gulp-util'),
		ftp            = require('vinyl-ftp');



//for update plagins use "ncu"
//npm update -a/--upgradeAll
//for debug .pipe(debug({title: 'TITLE'}))



gulp.task('serve', ['styles', 'vendors', 'pug', 'add-dist'], function() {
		browserSync.init({
				server: {
					baseDir: "./app"
				},
				port: 3000,
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
	return gulp.src('app/img/**/*')		
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img/'));
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
});



/*
gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/'));
});
*/



gulp.task('removedist', function() {
	return del.sync('dist');
});



gulp.task("add-dist", function() {
	gulp.src([' '])
		.pipe(gulp.dest('specs'))
		.pipe(gulp.dest('backup'))
});



gulp.task('build', ['removedist', 'imgmin', 'styles', 'vendors'], function() {

	var buildHtml = gulp.src(['app/*.html'])
		.pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/fonts.min.css',
		'app/css/main.min.css'])
		.pipe(gulp.dest('dist/css'));

	var buildJsVendors = gulp.src('app/js/vendors.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));

	var buildJsCommon = gulp.src('app/js/common.js')		
		.pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));				

	var buildHtaccess = gulp.src(['app/rename.htaccess-rename'])
		.pipe(rename(".htaccess"))
		.pipe(gulp.dest('dist'));

	var buildFiles = gulp.src(['app/*.*', '!app/index.html', '!app/rename.htaccess-rename'])
		.pipe(gulp.dest('dist'));
});



gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
		.pipe(conn.dest('/path/to/folder/on/server'));

});



gulp.task('default', ['serve', 'watch']);
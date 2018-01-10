var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var readline = require('readline');

var files = {
    libjs: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.min.js',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        './node_modules/angular-translate/dist/angular-translate.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/ng-notify/dist/ng-notify.min.js',
        './lib/**/*.js',
    ],
    appjs: ['src/**/module.js', 'src/**/*.js'],
    libcss: [
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap-rtl/bootstrap/dist/css/bootstrap-rtl.min.css',
        './node_modules/font-awesome/css/font-awesome.min.css',
        './node_modules/ng-notify/dist/ng-notify.min.css',
        './lib/**/*.css',
    ],
    appcss: [
        'src/**/*.css',
    ],
};


gulp.task('default', ['libjs', 'appjs', 'libcss', 'appcss', 'fonts', 'index', 'templates', 'watch']);

gulp.task('watch', ['appjs', 'appcss', 'index', 'templates'], function () {
    gulp.watch('src/**/*.js', ['appjs']);
    gulp.watch('src/**/*.css', ['appcss']);
    gulp.watch('src/**/*.html', ['index', 'templates']);
    
    var rl = readline.createInterface({ input: process.stdin });

    rl.on('line', function (line) {
        if (line === 'rb') {
            gulp.start('default');
        } else {
            console.log("What? Try 'rb' to rebuild.");
        }
    });
});

gulp.task('libjs', function () {
    gulp.src(files.libjs)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('appjs', function () {
    gulp.src(files.appjs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('libcss', function () {
    gulp.src(files.libcss)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('appcss', function () {
    gulp.src(files.appcss)
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function () {
    gulp.src(['src/js/components/**/*.html', 'src/js/states/**/*.html'])
        .pipe(sourcemaps.init())
        .pipe(templateCache())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});
  
gulp.task('fonts', function() {
    gulp.src(['./node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('index', function () {
    gulp.src(['./src/index.html'])
        .pipe(gulp.dest('dist'));
});

gulp.task('webserver', function() {
    connect.server({ port: 7700, root: 'dist' });
});
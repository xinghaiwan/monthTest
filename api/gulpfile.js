const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('devSass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('webserver', function() {
    return gulp.src('./src/')
        .pipe(webserver({
            port: 9090,
            open: true,
            livereload: true,
            proxies: [{
                source: '/api/allInfo',
                target: 'http://localhost:3000/api/allInfo'
            }, {
                source: '/api/addInfo',
                target: 'http://localhost:3000/api/addInfo'
            }, {
                source: '/api/delInfo',
                target: 'http://localhost:3000/api/delInfo'
            }, {
                source: '/api/newInfo',
                target: 'http://localhost:3000/api/newInfo'
            }]
        }))
});

gulp.task('watching', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('devSass'));
});

gulp.task('default', gulp.series('devSass', 'webserver', 'watching'));
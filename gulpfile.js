const { src, dest, series, parallel, watch } = require("gulp");
const concat = require('gulp-concat');
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const js = function(){
    return src('src/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(dest('build'));
}
const docs = function(){
    return src('src/docs/*')
    .pipe(dest('build'));
}
const styles = function(){
    return src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('build'));
}
const watcher = function(){
    watch('src/**/*.js', js);
    watch('src/docs/**',docs);
    watch('src/scss/**',styles);

    watch('build/**', { delay: 1000 }, browserSync.reload);

}
const server = function(){
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
}
exports.server = parallel(server, watcher);
exports.prepare = series(js);
exports.styles = series(styles);
exports.build = parallel(js, docs, styles);
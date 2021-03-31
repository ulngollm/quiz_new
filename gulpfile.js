const { src, dest, series } = require("gulp");
const concat = require('gulp-concat');
// const browserSync = require("browser-sync").create();
// var reload = browserSync.reload;

const prepare = function(){
    return src('src/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(dest('build'));
}
exports.prepare = series(prepare);
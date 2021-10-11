import gulp from "gulp";
const { src, dest, series, parallel, watch } = gulp;
import {rollup} from 'gulp-rollup-2';
import browserSync from "browser-sync";
import sass from 'gulp-dart-sass';
import { nodeResolve } from "@rollup/plugin-node-resolve";

export const js = function(){
    return src('src/js/app.js')
    .pipe(rollup({
        input: "src/js/app.js",
        output: {
            file: "build/app.js",
            format: 'es',
        },
        plugins: [nodeResolve()],
    }))
    .pipe(dest('build'));
}
const docs = function(){
    return src(['src/docs/*','src/backend/*.json'])
    .pipe(dest('build'));
}
export const styles = function(){
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
const liveServer = function(){
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
}
export const server = parallel(liveServer, watcher);
export const build = parallel(js, docs, styles);
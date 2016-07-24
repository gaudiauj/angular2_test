var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var pump = require('pump');
var connect = require('gulp-connect');
var paths = {
    html: ['app/*.html'],
    ts: ['app/app.ts']
};

var myBrowserify = browserify({
    basedir: '.',
    debug: true,
    entries: paths.ts,
    cache: {},
    packageCache: {}
});

var watchedBrowserify = watchify(myBrowserify.plugin(tsify));

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});
gulp.task("copy-html", function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest("build"));
});
gulp.task('browserify', function() {
    return myBrowserify
        .plugin(tsify)
        .bundle()
})
gulp.task('uglify', function (cb) {
    pump([
            gulp.src('build/bundle.js'),
            uglify(),
            gulp.dest('build')
        ],
        cb
    );
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest("build"))
        .pipe(connect.reload());
}


gulp.task("build", ["connect","copy-html","browserify"], function() {
    console.log('building ...');
});
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
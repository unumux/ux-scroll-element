require("babel-register");

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var eslint = require("gulp-eslint");

var paths = {
    test: "test/**/*.js",
    src: ["src/**/*.js", "*.js"]
};

gulp.task("lint", function() {
    return gulp.src([].concat(paths.test, paths.src))
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task("mocha", function() {
    return gulp.src(paths.test, {
        read: false
    })
    .pipe(mocha());
});

gulp.task("default", ["mocha"], function() {
    return gulp.watch([].concat(paths.test, paths.src), ["mocha"]);
});

let gulp = require("gulp"),
    del = require("del"),
    usemin = require("gulp-usemin"),
    rev = require("gulp-rev"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    browserSync = require('browser-sync').create();

gulp.task('previewDist', function () {
    
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });

});

gulp.task('deleteDistFolder', function () {
    return del("./docs");
});

gulp.task('useminTrigger', ['deleteDistFolder'], function () {
    gulp.start("usemin");
    gulp.start("usemin2");
});

gulp.task('usemin', ['sass', 'scripts'], function () {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function () { return rev() },
            function () { return cssnano() }],
            js: [function () { return rev() }, function () { return uglify() }]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('usemin2', ['sass', 'scripts'], function () {
    return gulp.src("./app/details.html")
        .pipe(usemin({
            css: [function () {return rev()},
                    function () {return cssnano()}],
            js: [function () {return rev()}, function () {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    let pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/details.html',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./dist"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'useminTrigger']);


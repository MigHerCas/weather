
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    normalize = require('node-normalize-scss');

// Variables
let input = './app/assets/styles/sass/**/*.scss';
let output = './app/temp/styles';
let sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: require('node-normalize-scss').includePaths
};

// Compile SASS into CSS
gulp.task('sass', function () {
    return gulp
        // Find all `.scss` files from the `stylesheets/` folder
        .src(input)
        // Run Sass on those files
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
            cascade: false
        }))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(output));
});
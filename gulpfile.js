var gulp = require('gulp');

var paths = {
    static: {
        src:'./public/**',
        dest:'/var/www/html/public/'
    }
};
gulp.task('mover',function(){
    return gulp.src(paths.static.src).pipe(gulp.dest(paths.static.dest));
});
gulp.task('dev',function() {
    gulp.watch(paths.static.src, ['mover']);});

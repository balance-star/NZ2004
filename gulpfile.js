const gulp = require("gulp");

// gulp.task("hello", function(){
//     console.log("hello world");
// })
gulp.task("copy-html", () =>{
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());

})

gulp.task("image1", () => {
    return gulp.src("images/kuangwei/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/kuangwei"))
    .pipe(connect.reload());

})

gulp.task("image2", () => {
    return gulp.src("images/logo/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/logo"))
    .pipe(connect.reload());

})

gulp.task("image3", () => {
    return gulp.src("images/lunbo/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/lunbo"))
    .pipe(connect.reload());

})

gulp.task("image4", () => {
    return gulp.src("images/nanxie/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/boy"))
    .pipe(connect.reload());

})

gulp.task("image5", () => {
    return gulp.src("images/nvxie/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/girl"))
    .pipe(connect.reload());

})

gulp.task("image6", () => {
    return gulp.src("images/shubao/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/bag"))
    .pipe(connect.reload());

})

gulp.task("image7", () => {
    return gulp.src("images/xinpintuijian/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/xinpin"))
    .pipe(connect.reload());

})

gulp.task("image8", () => {
    return gulp.src("images/yifu/*.{jpg,png}")
    .pipe(gulp.dest("dist/images/colthes"))
    .pipe(connect.reload());

})

gulp.task("image9", () => {
    return gulp.src("images/9*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());

})

gulp.task("script", () => {
    return gulp.src(["js/*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());

})

gulp.task("data",  () => {
    return gulp.src(["data/*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());

})

const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("scss1",  () => {
    return gulp.src("css/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());

})

gulp.task("scss2",  () => {
    return gulp.src("css/css.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("css.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

// gulp.task('build', gulp.parallel('copy-html', 'image', 'script', 'data', 'scss1', 'scss2'), function(){
//     console.log("建立成功");
// })
// gulp.task("build", ["copy-html", 'images', "scripts", "data", "scss1", "scss2"], function(){
//     console.log("项目建立成功");
// })
gulp.task('build',gulp.series(gulp.parallel('copy-html', 'image1','image2','image3','image4','image5','image6','image7','image8','image9', 'script', 'data', 'scss1', 'scss2')), function(){
    console.log("建立成功");
});


gulp.task("watch", function(){
    gulp.watch("*.html", function(){
        gulp.src("*.html")
        .pipe(gulp.dest("dist/"));
    });
    gulp.watch("*.{jpg,png}", function(){
        gulp.src("*.{jpg,png}")
        .pipe(gulp.dest("dist/images"));
    });
    gulp.watch(["*.json", "!package.json"], function(){
        gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("dist/data"));
    });
    gulp.watch(["*.js", "!gulpfile.js"], function(){
        gulp.src(["*.js", "!gulpfile.js"])
        .pipe(gulp.dest("dist/js"));
    });
    gulp.watch("css/index.scss", function(){
        gulp.src("css/index.scss")
        .pipe(gulp.dest("dist/css"));
    });
    gulp.watch("css/css.scss", function(){
        gulp.src("css/css.scss")
        .pipe(gulp.dest("dist/css"));
    });
    // gulp.watch("*.{jpg,png}", ['image']);
    // gulp.watch(["*.json", "!package.json"], ['data']);
    // gulp.watch(["*.js", "!gulpfile.js"], ['script']);
    // gulp.watch("stylesheet/index.scss", ['scss1']);
    // gulp.watch("stylesheet/css.scss", ['scss2']);
})

const connect = require("gulp-connect");
gulp.task("server",  () => {
    connect.server({
        root: "dist",
        port: 1123,
        livereload: true
    })
})

gulp.task('start', gulp.series(gulp.parallel('watch', 'server')));
// gulp.task("default", ["watch", 'server']);
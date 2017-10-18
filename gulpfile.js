var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var babelify = require("babelify");
var sass = require("gulp-sass");
var concat = require("gulp-concat");


var config = {
    port: 3000,
    devBaseUrl: "http://localhost",
    paths: {
        html: "./src/main/webapp/**/*.html",
        js: "./src/main/webapp/**/*.js",
        mainJS: "./src/main/webapp/app.js",
        sass: "./src/main/webapp/**/*.scss",
        imgs: "./src/main/webapp/imgs/**/*",
        webInf: "./src/main/webapp/WEB-INF/**/*",
        dist: "./src/main/webapp/dist/"
    }

}

gulp.task("connect", function () {
   connect.server({
       root: [config.paths.dist],
       port: config.port,
       base: config.devBaseUrl,
       livereload: true
   })
});

gulp.task("open", ["connect"], function() {
    gulp.src("dist/index.html")
        .pipe(open({
            uri: config.devBaseUrl + ":" + config.port + "/",

        }));
});

gulp.task("html", function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task("web-inf", function() {
    gulp.src(config.paths.webInf)
        .pipe(gulp.dest(config.paths.dist + "/WEB-INF/"))
        .pipe(connect.reload());
});

gulp.task("js", function() {
    browserify(config.paths.mainJS)
        .transform("babelify", {
            presets: ["es2015", "react"]
        })
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src(config.paths.sass)
        .pipe(sass())
        .pipe(concat("dist.css"))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task("imgs", function() {
    gulp.src(config.paths.imgs)
        .pipe(gulp.dest(config.paths.dist + "imgs/"))
        .pipe(connect.reload());
});

gulp.task("default", [ "html", "js", "sass", "imgs", "web-inf" ]);
gulp.task("lite", [ "html", "js", "sass", "imgs", "open" ]);
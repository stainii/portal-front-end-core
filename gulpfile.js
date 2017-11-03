var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var babelify = require("babelify");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var Proxy = require('gulp-api-proxy');
var clean = require("gulp-clean");


var config = {
    port: 3000,
    devBaseUrl: "http://localhost",
    paths: {
        dist: "./src/main/public/",
        html: ["./src/main/react/**/*.html", "!./src/main/react/dist/**/*"],
        js: ["./src/main/react/**/*.js", "!./src/main/react/dist/**/*"],
        mainJS: "./src/main/react/app.js",
        sass: ["./src/main/react/**/*.scss", "!./src/main/react/dist/**/*"],
        statics: "./src/main/react/static-front-end-core/**/*",
        webInf: "./src/main/react/WEB-INF/**/*",
    }

};

gulp.task("connect", function () {
   connect.server({
       root: [config.paths.dist],
       port: config.port,
       base: config.devBaseUrl,
       livereload: true,
       middleware: function (connect, opt) {
           // `localhost:????/api/...` will be proxied to `localhost:2001/api/...`, to support running the front-end in a lite server
           opt.route = '/api';
           opt.context = 'localhost:2001/api';
           var proxy = new Proxy(opt);
           return [proxy];
       }
   })
});

gulp.task("open", ["connect"], function() {
    gulp.src(config.paths.dist + "index.html")
        .pipe(open({
            uri: config.devBaseUrl + ":" + config.port + "/",

        }));
});

gulp.task("clean", function() {
    return gulp.src(config.paths.dist, {read: false})
        .pipe(clean());
});

gulp.task("html", ["clean"], function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task("js", ["clean"], function() {
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

gulp.task('sass', ["clean"], function () {
    return gulp.src(config.paths.sass)
        .pipe(sass())
        .pipe(concat("dist.css"))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task("statics", ["clean"], function() {
    gulp.src(config.paths.statics)
        .pipe(gulp.dest(config.paths.dist + "static-front-end-core/"))
        .pipe(connect.reload());
});

gulp.task("default", [ "clean", "html", "js", "sass", "statics" ]);
gulp.task("lite", [ "html", "js", "sass", "imgs", "open" ]);
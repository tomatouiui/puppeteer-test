var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
  
exports.default = defaultTask

gulp.task('nodemon', function() {
  nodemon({
    script: 'express-mongodb.js',
    ext: 'js',
    ignore: ['dist/']
  })
  .on('restart', function() {
    console.log('>> node restart');
  })
});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 代理

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "toma.test"
    });
});
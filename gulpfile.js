

var debug = true;

var gulp = require('gulp'),
  jsonTool = require('json-utils'),
  rjs = require('gulp-r');
  // loadTasks = require('gulp-load')(gulp);


gulp.task('rjs', function(){
	console.info('rjs ... ');
	gulp.src('*.js').pipe(rjs({
		"baseUrl":'src'
	}))
	.pipe(gulp.dest('dist/gulp'));
});

// 不能从本地加载文件模块?
// 模块加载细节,还需要练习
// require('./build/otask/mystask.js');

gulp.task("test", function(){
  debug = true;
  console.info('test ...');
  var json = jsonTool.readJSONSync('./src/.jshintrc');
  // var json = require('./src/.jshintrc');
});

gulp.task('sizzle', function(){
  gulp.src('res/static/sizzle/dist/sizzle.js').pipe(gulp.dest('src'));
})


// loadTasks('build/gulp_task/mytask.js');
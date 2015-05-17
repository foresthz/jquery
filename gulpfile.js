

var debug = true;

var gulp = require('gulp');
  jsonTool = require('json-utils');
  // loadTasks = require('gulp-load')(gulp);


// 不能从本地加载文件模块?
// 模块加载细节,还需要练习
// require('./build/otask/mystask.js');

gulp.task("test", function(){
  debug = true;
  console.info('test ...');
  var json = jsonTool.readJSONSync('./src/.jshintrc');
  // var json = require('./src/.jshintrc');
});


// loadTasks('build/gulp_task/mytask.js');
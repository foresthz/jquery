

var debug = true;

var gulp = require('gulp');
var jsonTool = require('json-utils');

gulp.task("test", function(){
  debug = true;
  console.info('test ...');
  var json = jsonTool.readJSONSync('./src/.jshintrc');

  // var json = require('./src/.jshintrc');

});



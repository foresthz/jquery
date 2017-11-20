
// 这个文件是只描述的，可以尝试读懂
// 总体就是一个函数
module.exports = function( grunt ) {
	"use strict";

	// 编写了一个读取json数据的函数
	function readOptionalJSON( filepath ) {
		var data = {};
		try {
			// 这个函数是grunt自带的么?
			// 如何对这种Grunt.js代码进行调试呢? 调用的也是内部函数
			data = grunt.file.readJSON( filepath );
		} catch ( e ) {}
		return data;
	}

	// require是requirejs里面的代码么? 直接加载grunt源码
	var gzip = require( "gzip-js" ),
	  // all the options are defined in this file
		srcHintOptions = readOptionalJSON( "src/.jshintrc" );

	// The concatenated file won't pass onevar
	// But our modules can
	delete srcHintOptions.onevar;

	// init里面放了太多东西. 这些和任务有啥关系?
	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		dst: readOptionalJSON( "dist/.destination.json" ),
		compare_size: {
			// 比较大小有什么意义?
			files: [ "dist/jquery.js", "dist/jquery.min.js" ],
			options: {
				compress: {
					gz: function( contents ) {
						return gzip.zip( contents, {} ).length;
					}
				},
				cache: "build/.sizecache.json"
			}
		},
		// 这个是build命令? 是默认命令么?
		build: {
			all: {
				dest: "dist/jquery.js",
				minimum: [
					"core",
					"selector"
				],
				// Exclude specified modules if the module matching the key is removed
				removeWith: {
					ajax: [ "manipulation/_evalUrl", "event/ajax" ],
					callbacks: [ "deferred" ],
					css: [ "effects", "dimensions", "offset" ],
					sizzle: [ "css/hiddenVisibleSelectors", "effects/animatedSelector" ]
				}
			}
		},
		// 还需要用到bowercopy做什么?
		bowercopy: {
			all: {
				options: {
					clean: true,
					destPrefix: "external"
				},
				files: {
					"sizzle/dist": "sizzle/dist",
					"sizzle/MIT-LICENSE.txt": "sizzle/MIT-LICENSE.txt",

					"qunit/qunit.js": "qunit/qunit/qunit.js",
					"qunit/qunit.css": "qunit/qunit/qunit.css",
					"qunit/MIT-LICENSE.txt": "qunit/MIT-LICENSE.txt",

					"requirejs/require.js": "requirejs/require.js",

					"sinon/fake_timers.js": "sinon/lib/sinon/util/fake_timers.js",
					"sinon/LICENSE.txt": "sinon/LICENSE"
				}
			}
		},
		// 这个又是干啥的?
		jsonlint: {
			pkg: {
				src: [ "package.json" ]
			},

			bower: {
				src: [ "bower.json" ]
			}
		},
		// 这个是干啥的?这个插件是干啥的?
		jshint: {
			all: {
				src: [
					"src/**/*.js", "Gruntfile.js", "test/**/*.js", "build/**/*.js"
				],
				options: {
					jshintrc: true
				}
			},
			// dist Non-ASCII报错?
			dist: {
				src: "dist/jquery.js",
				options: srcHintOptions
			}
		},
		jscs: {
			src: "src/**/*.js",
			gruntfile: "Gruntfile.js",

			// Right know, check only test helpers
			test: [ "test/data/testrunner.js", "test/data/testinit.js" ],
			release: "build/*.js",
			tasks: "build/tasks/*.js"
		},
		testswarm: {
			tests: "ajax attributes callbacks core css data deferred dimensions effects event manipulation offset queue selector serialize support traversing".split( " " )
		},
		// 这里的dev任务是什么?
		watch: {
			files: [ "<%= jshint.all.src %>" ],
			tasks: "dev"
		},
		// 压缩对应的配置,也是用于合并的? 这里看到min.js了,可见是配置生成文件
		// 是根据哪些信息,达到文件合并的目的呢? 可以和requrejs结合使用?
		// 在前端和后台都实现通用
		uglify: {
			all: {
				files: {
					"dist/jquery.min.js": [ "dist/jquery.js" ]
				},
				options: {
					preserveComments: false,
					sourceMap: "dist/jquery.min.map",
					sourceMappingURL: "jquery.min.map",
					report: "min",
					// // // // ascii only here
					beautify: {
						ascii_only: false
					},
					banner: "/*! jQuery v<%= pkg.version %> | " +
						"(c) 2005, <%= grunt.template.today('yyyy') %> jQuery Foundation, Inc. | " +
						"jquery.org/license */",
					compress: {
						hoist_funs: false,
						loops: false,
						unused: false
					}
				}
			}
		}
	});

	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );

	// Integrate jQuery specific tasks
	// 目录里放了很多任务文件,这里只是注册了很多任务,默认是执行default任务?
	grunt.loadTasks( "build/tasks" );

	// 任务别名?
	grunt.registerTask( "bower", "bowercopy" );

	// 使用两种工具进行语法检查? 使用gulp可以做语法检查么? 这部分代码可以快速替换掉?
	grunt.registerTask( "lint", [ "jshint", "jscs" ] );

	// Short list as a high frequency watch task
	// build下面有多种配置?
	grunt.registerTask( "dev", [ "build:*:*", "lint" ] );

	// Default grunt
	// 默认命令,对应conig里面好几个配置,以此执行多个命令
	grunt.registerTask( "default", [ "jsonlint", "dev", "uglify", "dist:*", "compare_size", "compare_size" ] );
};

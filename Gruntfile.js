
// 这个文件是只描述的，可以尝试读懂
module.exports = function( grunt ) {
	"use strict";
	// 编写了一个读取json数据的函数
	function readOptionalJSON( filepath ) {
		var data = {};
		try {
			// 这个函数是grunt自带的么?
			// 如何对这种Grunt.js代码进行调试呢?
			data = grunt.file.readJSON( filepath );
		} catch ( e ) {}
		return data;
	}

	// require是requirejs里面的代码么?
	var gzip = require( "gzip-js" ),
		srcHintOptions = readOptionalJSON( "src/.jshintrc" );

	// The concatenated file won't pass onevar
	// But our modules can
	delete srcHintOptions.onevar;

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		dst: readOptionalJSON( "dist/.destination.json" ),
		compare_size: {
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
		build: {
			all: {
				dest: "dist/jquery.js",
				minimum: [
					"core",
					"selector"
				],
				// Exclude specified modules if the module matching the key is removed
				removeWith: {
					ajax: [ "manipulation/_evalUrl" ],
					callbacks: [ "deferred" ],
					css: [ "effects", "dimensions", "offset" ],
					sizzle: [ "css/hiddenVisibleSelectors", "effects/animatedSelector" ]
				}
			}
		},
		// 还需要用到bowercopy做什么?
		bowercopy: {
			options: {
				clean: true
			},
			src: {
				files: {
					"src/sizzle": "sizzle"
				}
			},
			tests: {
				options: {
					destPrefix: "test/libs"
				},
				files: {
					"qunit": "qunit/qunit",
					"require.js": "requirejs/require.js",
					"sinon/fake_timers.js": "sinon/lib/sinon/util/fake_timers.js"
				}
			}
		},
		// 这个又是干啥的?
		jsonlint: {
			pkg: {
				src: [ "package.json" ]
			},

			jscs: {
				src: [ ".jscs.json" ]
			},

			bower: {
				src: [ "bower.json" ]
			}
		},
		// 这个是干啥的?这个插件是干啥的?
		jshint: {
			all: {
				src: [
					"src/**/*.js", "Gruntfile.js", "test/**/*.js", "build/tasks/*",
					"build/{bower-install,release-notes,release}.js"
				],
				options: {
					jshintrc: true
				}
			},
			dist: {
				src: "dist/jquery.js",
				options: srcHintOptions
			}
		},
		jscs: {
			src: "src/**/*.js",
			gruntfile: "Gruntfile.js",
			tasks: "build/tasks/*.js"
		},
		testswarm: {
			tests: "ajax attributes callbacks core css data deferred dimensions effects event manipulation offset queue selector serialize support traversing Sizzle".split( " " )
		},
		// 这里的dev任务是什么?
		watch: {
			files: [ "<%= jshint.all.src %>" ],
			tasks: "dev"
		},
		// 压缩对应的配置
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
					beautify: {
						ascii_only: true
					},
					banner: "/*! jQuery v<%= pkg.version %> | " +
						"(c) 2005, 2013 jQuery Foundation, Inc. | " +
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
	grunt.loadTasks( "build/tasks" );

	// Alias bower to bowercopy
	grunt.registerTask( "bower", "bowercopy" );

	// Short list as a high frequency watch task
	grunt.registerTask( "dev", [ "build:*:*", "jshint", "jscs" ] );

	// Default grunt
	grunt.registerTask( "default", [ "jsonlint", "dev", "uglify", "dist:*", "compare_size", "compare_size" ] );
};

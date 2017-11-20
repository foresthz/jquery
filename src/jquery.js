// 最终js是如何拼装成的?
// 只有熟悉RequireJS的全部细节，才能够真正读懂JQuery源码
// 前面的全部加载完了，才轮到这个文件，因此下面的return是编译后的最后一行
// 可以通过gulp将所有js文件编译成一个?
define([
	// 如何把全部模块集成到顶部?
	// core依赖各种变量
	"./core",
	// 选择器
	"./selector",
	"./traversing",
	"./callbacks",
	"./deferred",
	"./core/ready",
	"./data",
	"./queue",
	"./queue/delay",
	"./attributes",
	"./event",
	"./event/alias",
	"./manipulation",
	"./manipulation/_evalUrl",
	"./wrap",
	"./css",
	"./css/hiddenVisibleSelectors",
	"./serialize",
	"./ajax",
	"./ajax/xhr",
	"./ajax/script",
	"./ajax/jsonp",
	"./ajax/load",
	"./event/ajax",
	"./effects",
	"./effects/animatedSelector",
	"./offset",
	"./dimensions",
	"./deprecated",
	"./exports/amd",
	"./exports/global"

	// 从何处引入的变量? 只对应于第一个core的返回值?
], function( jQuery ) {

return jQuery;

});

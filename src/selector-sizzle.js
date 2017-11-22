
// 在core和sizzle之后要做这些设定这些方法
// 这个函数里面为何要有参数，从前面继承么?
// 这里的sizzle没有路径，是在什么地方定义的?
define([
	// 不存在循环依赖
	"./core",
	// 需要修改路径
	// 修改后可以直接通过requirejs加载,但是编译时要出错.
	// "../res/static/sizzle/dist/sizzle",
	// 必须在前面加 点号,否则webpack无法打包？
	"./sizzle"
	// "sizzle"
], function( jQuery, Sizzle ) {

// sizzle是sizzle返回, sizzle代码是否集成到最后代码呢?
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;

});

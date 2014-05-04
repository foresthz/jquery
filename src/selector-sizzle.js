
// 在core和sizzle之后要做这些设定这些方法
// 这个函数里面为何要有参数，从前面继承么?
// 这里的sizzle没有路径，是在什么地方定义的?
define([
	"./core",
	"sizzle"
], function( jQuery, Sizzle ) {

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;

});

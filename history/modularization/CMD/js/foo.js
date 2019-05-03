define('foo',function(require,exports,module){
	var bar = require('bar');
	console.log(bar);
	var jquery = require('jquery');
	console.log(jquery);

	exports.tt=function(){
		var pip=bar.getNum();
		// console.log(pip);
		return pip;
	}

	exports.wt=function(content){               //$要传入到函数里面,不然$会报错
		var p='<button id="btn">按钮</button>';
		$(content).html(p);
	}

	exports.a="<p>foo.js中暴露出来的属性a的值</p>";	


	// module.exports={
	// 	a:a,
	// 	tt:tt,
	// 	wt:wt
	// }
});
//方法一
define(['bar'],function(bar){	
	var getAge =function(){
		var num=bar.getNum();
		var str="my age is "+num.toString();
		console.log(str);		
		return str;
	};
	return {
		getAge:getAge
	}
});



// 方法二
// define(['bar'],function(bar){
// 	return {
// 		getAge:function(){
// 			var num=bar.getNum();
// 			var str="my age is "+num.toString();
// 			console.log(str);		
// 			return str;
// 		}
// 	};	
// });
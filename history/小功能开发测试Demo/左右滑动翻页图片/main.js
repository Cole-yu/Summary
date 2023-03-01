//给元素绑定手势事件

var bindSwipeEvent = function(dom,leftcallback,rightcallback){  
    console.log(dom)
    
// 手势的判断条件
// 1.假如必须滑动过
// 2.滑动的距离必须超出50px
    
    //在touchstart中的client
    var startX = 0;
    
    //touchstartX和touchmoveX之间的距离
    var distanceX = 0;

    //判断是否移动过
    var ismove = false;
    dom.addEventListener('touchstart',function(e){
        startX = e.touches[0].clientX;
    })
    dom.addEventListener('touchmove',function(e){
        //确定手势已经有了移动
        ismove = true;
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
    })
    dom.addEventListener('touchend',function(e){
        //滑动结束
        if(ismove && (Math.abs(distanceX) > 50)){
            if(distanceX > 0){
                //左滑手势
                rightcallback && rightcallback.call(this,e);
            }else{
                //右滑手势
                leftcallback && leftcallback.call(this,e);
            }
        }
        //为了严谨，重置参数
        startX = 0;
        ismove = 0;
        distance = 0;
    });
}

var cot=0;//设置一个计数器，初始值为0；作用是用来监听点击切换的时候哪一个图片应该隐藏或者显示

function leftcallback(){
    console.log('向左滑动，下一张');
    if(cot<=2){    
      $('.imgs img').eq(cot).animate({'margin-left':'-1029px'},500);    
      cot++;  
     }    
}

function rightcallback(){
    console.log('向右滑动，上一张');
    if(cot>0){    
      cot--;    
      $('.imgs img').eq(cot).animate({'margin-left':'0'},500);  
     }    
}

var dom = document.getElementById('test')

// console.log(dom);
//调用的时候直接绑定元素，传入参数即可
bindSwipeEvent(dom, leftcallback, rightcallback);
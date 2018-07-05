# ECharts图表
	官网链接：http://echarts.baidu.com/tutorial.html#5%20分钟上手%20ECharts
### setOption方法
	<div id="main" style="width:7.5rem;height:4rem;"></div>  //准备一个具备宽高的dom容器
	<script type="text/javascript">
		var  myChart=echarts.init(document.getElementById('main'));
		var option={
			title:{								//图表名称
				text:"Echarts 入门实例"      
			},
			tooltip:{},
			legend:{                            //图例
				data:["销量"]
			},
			xAxis:{								//X轴(横轴)
				data:["衬衫","羊衬衫","雪纺衫","裤子","高跟鞋","袜子"]
			},
			yAxis:{},							//Y轴(纵轴)
			series:[{							//系列列表,每个系列通过type决定自己的图标类型
				name:'销量',
				type:'bar',                     //line折线图,bar柱状图,
				data;[5,20,36,10,10,20]
			}]
		};
		myChat.setOption(option);		
	</script>
1.	初始化一个dom容器  				var myChart=echarts.init(document.getElementById('main));
2.  使用指定的配置项和数据显示图表     myChart.setOption()	

*	图表type类型：
	1. Line折线图
	2. Bar柱状图
	3. Scatter(散点图)
	4. K(K线图)
	5. Pie(饼图)
	6. Radar(雷达图)
	7. Chord(和弦图)
	8. Force(力导布局图)

### 南丁格尔图
	通过半径来表示数据的大小
	myChart.setOption({
		backgroundColor:'#2c343c',        //设置背景色
		textStyle:{						  //文本的样式
			color:'rgba(255,255,255,0.3)'
		},
		visualMap: {     				  //根据值映射颜色深浅
	        show: false,
	        min: 80,
	        max: 600,
	        inRange: {
	            colorLightness: [0, 1]
	        }
	    },
	    // 全局调色盘    
    	color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
	    series : [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius: '55%',
	            // 此系列自己的调色盘。
        		color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
	            roseType:'angle',         //通过设置 roseType 显示成南丁格尔图。
	            itemStyle: {			  //通用的样式，诸如阴影、透明度、颜色、边框颜色、边框宽度等	                         
				    shadowBlur: 200,				    // 阴影的大小
				    shadowOffsetX: 0,				    // 阴影水平方向上的偏移				    
				    shadowOffsetY: 0,				    // 阴影垂直方向上的偏移
				    shadowColor: 'rgba(0, 0, 0, 0.5)'   // 阴影颜色
				    <!-- normal: {
	                    shadowBlur: 200,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                } -->
	            },
	            data:[
	                {value:235, name:'视频广告'},
	                {value:274, name:'联盟广告'},
	                {value:310, name:'邮件营销'},
	                {value:335, name:'直接访问'},
	                {value:400, name:'搜索引擎'}
	            ]
	        },
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius: '55%',
	            data:[
	                {value:235, name:'视频广告'},
	                {value:274, name:'联盟广告'},
	                {value:310, name:'邮件营销'},
	                {value:335, name:'直接访问'},
	                {value:400, name:'搜索引擎'}
	            ],
	            roseType: 'angle',
	            label: {                     //饼图中的内容类型说明
	                normal: {
	                    textStyle: {
	                        color: 'rgba(255, 255, 255, 0.5)'
	                    }
	                }
	            },
	            labelLine: {                 //内容label连接线
	                normal: {
	                    lineStyle: {
	                        color: 'rgba(255, 255, 255, 0.9)'
	                    }
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: '#c23531',
	                    shadowBlur: 200,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	            // 高亮样式。
		        emphasis: {
		            itemStyle: {
		                // 高亮时点的颜色。
		                color: 'blue'
		            },
		            label: {
		                show: true,
		                // 高亮时标签的文字。
		                formatter: 'This is a emphasis label.'
		            }
		        }
        	}
    	]
	})	


### Echarts颜色主题
	var chart=echart.init(dom,'light');  //第一个参数为dom容器,第二个参数为主题类型,light与dark

### 异步更新图表数据
	// 异步加载数据
	$.get('data.json').done(function (data) {
	    // 填入数据
	    myChart.setOption({
	        xAxis: {
	            data: data.categories
	        },
	        series: [{
	            // 根据名字对应到相应的系列
	            name: '销量',
	            data: data.data
	        }]
	    });
	});	

### loading动画
	只需要调用 showLoading 方法显示。数据加载完成后再调用 hideLoading 方法隐藏加载动画。
	myChart.showLoading();
	$.get('data.json').done(function (data) {
	    myChart.hideLoading();
	    myChart.setOption(...);
	});
	//为了实现一个loading的效果，可以使用setTimeout函数来实现异步的一个效果

### 使用dataset管理数据
*  	数据映射
	```
	按行还是列来进行数据映射
	dataset: {
        source: [
            ['product', '2012', '2013', '2014', '2015'],
            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
            ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
        ]
    },
	series: [
        // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
    ]	
	```

### 数据到图形的映射(encode)
	var option = {
	    dataset: {                //dataset可以为数组，也可以为一个json对象
	        source: [
	            ['score', 'amount', 'product'],
	            [89.3, 58212, 'Matcha Latte'],
	            [57.1, 78254, 'Milk Tea'],
	            [74.4, 41032, 'Cheese Cocoa'],
	            [50.1, 12755, 'Cheese Brownie'],
	            [89.7, 20145, 'Matcha Cocoa'],
	            [68.1, 79146, 'Tea'],
	            [19.6, 91852, 'Orange Juice'],
	            [10.6, 101852, 'Lemon Juice'],
	            [32.7, 20112, 'Walnut Brownie']
	        ]
	    },
	    xAxis: {},
	    yAxis: {type: 'category'},
	    series: [
	        {
	            type: 'bar',
	            encode: {
	                // 将 "amount" 列映射到 X 轴。
	                x: 'amount',
	                // 将 "product" 列映射到 Y 轴。
	                y: 'product'
	            }
	        }
	    ]
	};
*	encode映射说明
	```
	// 例如在直角坐标系（grid/cartesian）中：
	encode: {
	    // 把 “维度1”、“维度5”、“名为 score 的维度” 映射到 X 轴：
	    x: [1, 5, 'score'],
	    // 把“维度0”映射到 Y 轴。
	    y: 0,
	    // 使用 “名为 product 的维度” 和 “名为 score 的维度” 的值在 tooltip 中显示
	    tooltip: ['product', 'score']
	    // 使用 “维度 3” 的维度名作为系列名。（有时候名字比较长，这可以避免在 series.name 重复输入这些名字）
	    seriesName: 3,
	    // 表示使用 “维度2” 中的值作为 id。这在使用 setOption 动态更新数据时有用处，可以使新老数据用 id 对应起来，从而能够产生合适的数据更新动画。
	    itemId: 2,
	    // 指定数据项的名称使用 “维度3” 在饼图等图表中有用，可以使这个名字显示在图例（legend）中。
	    itemName: 3
	}
	```

### 视觉通道(颜色,尺寸等)的映射
	visulaMap组件进行视觉通道的映射,根据值的大小来映射颜色深浅

### 缩放组件	

### 移动端自适应

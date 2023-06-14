### KlineChart.vue
组件mounted()调用
this.$refs.chart.loadChart()


### stock-chart 组件
1. loadChart 方法中实例化 DataProvider对象， Canvas对象；
this.chartDataProvider = new DataProvider();
this.canvas = new Canvas();

2. showChart 方法实例化 MinChart对象，KlineChart对象；
this.minChart = new MinChart();

const klineChartName = `klineChart${this.chartType}`; // 图表类型：min(分时图)，1day(日K)，week(周K)，month(月K)
this.klineChart[klineChartName] = new KlineChart();

调用canvas对象的show方法
this.canvas.show(currentChart); // 核心代码: 启动入口

### Canvas.js
show(chart) -> addChart(chart) 中
调用chart对象的 setCanvas 方法
chart.setCanvas(this); // this 就是 canvas 实例对象

### Chart.js
setCanvas(canvas) -> initData()
this.initData() // this 是 Chart类的实例化对象，可以是 KlineChart类、 MinChart类对象；

### KlineChart.js
initData() -> reCalculate() -> loadMoreData() -> this.dataProvider.getKline(param)
											  -> this.getIndicatorData()
											  -> this.redraw() -> this.drawChart() 绘制K线蜡烛图和主副图指标逻辑
		   -> initSubscribe()

### klineChart对象的 initChart()
initChart 方法会计算主、副图属性：最大、最小值，每单位刻度的像素
 1. 主图相关属性
	this.mainChartWidth
	this.mainChartHeight
	this.candleChartHeight = this.mainChartHeight
	this.max
	this.min

2. 副图相关属性
	this.indicsChartHeight 
	this.maxIndics
	this.minIndics
	this.indicsYPixelRadio

### Chart.js
drawYAxisGridLine() 会将 y轴刻度及高度坐标将入到yAxisTicks数组中，将来一起绘制Y轴坐标

yAxisTicks.push({
        text: formatText,
        x: x,
        y: yAxis,
        tickColor,
        withBackground
      })


### 主副指标参数
1. 主图指标
this.options.mIndics = this.klineMainIndics // 'QSZZ'
this.mIndics = this.options.mIndics

2. 副图指标
this.options.currentIndics = this.klineIndics // 'DBJJ'
this.currentIndics = this.options.currentIndics

### 核心代码 KlineChart.js
drawChart()
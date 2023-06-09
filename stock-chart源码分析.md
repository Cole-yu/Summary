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


### 主副指标参数
1. 主图指标
this.options.mIndics = this.klineMainIndics // 'QSZZ'
this.mIndics = this.options.mIndics

2. 副图指标
this.options.currentIndics = this.klineIndics // 'DBJJ'
this.currentIndics = this.options.currentIndics

### 核心代码 KlineChart.js
drawChart()
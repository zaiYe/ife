/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: '北京',
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	document.querySelector('.aqi-chart-wrap').innerHTML='';
	var city=pageState['nowSelectCity'];
	var data=aqiSourceData[city];
	var count=0,width,forJ,forI,last;
	switch(pageState['nowGraTime']){
		case 'day':
		width=5;
		forJ=91;
		forI=1;
		last='天';
		break;
		case 'week':
		width=20;
		forJ=13;
		forI=7;
		last='周';
		break;
		case 'month':
		width=50;
		forJ=3;
		last='个月';
		break;
	}

	var dat = new Date("2016-01-01");

	for(var j=0;j<forJ;j++){
		var total=0;
		forI=forJ == 3 ? new Date(2016,j,0).getDate() : forI;
		for(var i=0;i<forI;i++){
			  total+=data[getDateStr(dat)];
			  dat.setDate(dat.getDate() + 1);
		}
		var div=document.createElement('div');
		div.setAttribute('title','2016年第'+(j+1)+last+','+Math.floor(total/forI));
		div.style.cssText='left:'+count*width+'px;height:'+Math.floor(total/forI)+'px;width:'+width+'px;'
		document.querySelector('.aqi-chart-wrap').appendChild(div);
		count++;
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var radioVal=document.querySelector('[name="gra-time"]:checked').value;
  if(radioVal == pageState['nowGraTime'])return;
  // 设置对应数据
  pageState['nowGraTime']=radioVal;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var selectVal=document.querySelector('#city-select').value;
  if(selectVal == pageState['nowSelectCity'])return;
  // 设置对应数据
  pageState['nowSelectCity']=selectVal;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radio=document.getElementsByName('gra-time');
	for(var i=0 ;i <radio.length;i++){
		radio[i].onclick=function(){
			graTimeChange();
		}
	}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select=document.getElementById('city-select');
  for(var city in aqiSourceData){
  	var option=document.createElement('option');
  	option.appendChild(document.createTextNode(city));
  	select.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  select.onchange=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  //initAqiChartData();    //这个函数每看懂要干嘛
  renderChart();
}

init();

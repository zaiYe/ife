/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city=document.getElementById('aqi-city-input');
var val=document.getElementById('aqi-value-input');
var addBtn=document.getElementById('add-btn');
var table=document.getElementById('aqi-table');
var cityPattern=/^[a-z\u4E00-\u9FA5]+$/i;
var valuePattern=/^[1-9]\d*$/;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var key=city.value.trim();
	if(!cityPattern.test(key)){
		alert('城市名非法!');
		return;
	}
	var value=val.value.trim();
	if(!valuePattern.test(value)){
		alert('空气质量必须是整数!');
		return;
	}
	aqiData[key]=value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	table.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(var key in aqiData){
		var tr=document.createElement('tr');
		var td1=document.createElement('td');
		td1.appendChild(document.createTextNode(key));
		var td2=document.createElement('td');
		td2.appendChild(document.createTextNode(aqiData[key]));
		var td3=document.createElement('td');
		td3.innerHTML='<button>删除</button>';
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(btn) {
  // do sth.
  var key=getParentEle(getParentEle(btn)).getElementsByTagName('td')[0].innerHTML;
  delete aqiData[key];
  renderAqiList();
  function getParentEle(node){
  	if(node.parentNode.nodeType == 1){
  		return node.parentNode;
  	}else{
  		return getParentEle(node.parentNode);
  	}
  }
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	addBtn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	table.onclick=function(event){
  		if(event.target.tagName == 'BUTTON'){
  			delBtnHandle(event.target);
  		}
  	}
}

init();

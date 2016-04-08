/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 var aqiData = {};
 var addBtn=document.getElementById('add-btn');
 var aqiCity=document.getElementById('aqi-city-input');
 var aqiAir=document.getElementById('aqi-value-input');
 var aqiTable=document.getElementById('aqi-table');
 var oCity;
 var oAir;



/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  oCity=aqiCity.value;
  oAir=aqiAir.value;
  if (checkCity()&& checkAir()) {
    aqiData[oCity]=oAir;
  } 
}

function checkCity(){
  oCity=aqiCity.value;
  var msg=document.getElementById('form-msg-error');
  if (!oCity.match(/^[a-z\u4E00-\u9FA5]+$/i)) {
    msg.innerHTML="填写错误,城市名称为中英文";
    msg.style.color="red";
    return;
  }
  msg.innerHTML="";
  return true;
}

function checkAir(){
  var msg=document.getElementById('form-num-error');
  oAir=aqiAir.value;
  if (!oAir.match(/^\d+$/g)) {
    msg.innerHTML="填写错误,空气指数为整数";
    msg.style.color="red";
    return;
  }
  msg.innerHTML="";
  return true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  aqiTable=document.getElementById('aqi-table');
  var aqiTr="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

  for(oCity in aqiData){
    aqiTr+="<tr><td>"+oCity+"</td><td>"+aqiData[oCity]+"</td><td><button>删除</button></td></tr>";
  }
  aqiTable.innerHTML=aqiTr?aqiTr:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
 function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

//监听事件兼容IE
function addEvent(element,type,handler){
  if (element.addEventListener) {
    element.addEventListener(type,handler,false);
  }else if (element.attachEvent) {
    element.attachEvent('on'+type,handler);
  }else{
    element['on'+type]=handler;
  }
}


/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
 function delBtnHandle(event) {
  // do sth.
  if (event.target.nodeName.toLowerCase() === 'button') {
      var data=event.target.parentNode.parentNode.children[0].innerHTML;
      delete aqiData[data];
      renderAqiList();
    }  
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addEvent(addBtn,'click',addBtnHandle);
 
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  addEvent(aqiTable,'click',function(){
    delBtnHandle(event);
  });

  // 当失去焦点时校验输入值，并提示用户
  aqiCity.onblur=checkCity;
  aqiAir.onblur=checkAir;

}


init();

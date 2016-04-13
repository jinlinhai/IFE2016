var charList=[];
var value;

window.onload=function(){
  var oTxt=document.getElementById('txt');
  var addL=document.getElementById('addleft');
  var addR=document.getElementById('addright');
  var delL=document.getElementById('delleft');
  var delR=document.getElementById('delright');
  var dataWrap=document.getElementById('data-wrap');
  var sortBtn=document.getElementById('sort');
  var randomBtn=document.getElementById('random');


  //给‘左侧入’按钮绑定添加列表函数
  addEvent(addL,'click',function(){
    if (checkValue()===false) { return;}
      charList.unshift(value);
      renderChart(charList);
  }); 

  //给’右侧入‘按钮绑定添加列表函数
  addEvent(addR,'click',function(){
    if (checkValue()===false) { return;}
      charList.push(value);
      renderChart(charList);
  }); 

  //给‘左侧出’按钮绑定删除列表函数
  addEvent(delL,'click',function(){
    delList(this);
  }); 

  //给‘右侧出’按钮绑定删除列表函数
  addEvent(delR,'click',function(){
    delList(this);
  }); 

  //绑定随机生成数字函数
  addEvent(randomBtn,'click',init); 

  //点击该个列表删除
  addEvent(dataWrap,'click',function(){
    delEach(event);
  }); 

  //排序按钮绑定排序函数
  addEvent(sortBtn,'click',bubbleSort);
};


//初始化
function init(){
  randomBuildData();
  renderChart(charList);
 }

//渲染数据图表
function renderChart(){
  var oUl=document.getElementById('list')?document.getElementById('list'):'';
  var dataWrap=document.getElementById('data-wrap');

    if (!oUl) {
    oUl=document.createElement('ul');
    oUl.id='list';
    dataWrap.appendChild(oUl);
  }

  oUl.innerHTML="";
  for (var i = 0; i < charList.length; i++) {
      var oLi=document.createElement('li');
      oUl.appendChild(oLi);
      oLi.style.height=parseInt(charList[i])*3+'px';
      oLi.style.left=20*i+'px';
    }  
}

//随机生成50个10-100的数字
function randomBuildData(){
  charList=[];
  for (var i = 0; i < 50; i++) {
    charList.push(Math.ceil(Math.random()*100));
  }
}

//检验输入至是否为10-100的数字
function checkValue(){
  var re=/^([\d+]{2,2}|100)$/g;
  value=document.getElementById('txt').value;

  if (!value.match(re)) {
    alert("只支持10-100的数字");
    return false;
  }
  if (charList.length>=60) {
    alert("最多只能添加60个");
    return false;
  }
}

//点击移出按钮删除数据
function delList(btn){
  if (charList.length===0) {
    alert("没有可以删除的数据");
    return;
  }

  if (btn.id=='delleft') {
    alert("删除的元素是："+charList.shift());
  }else if (btn.id=='delright') {
    alert("删除的元素是："+charList.pop());
  }
  renderChart();
}

//点击该列表删除函数
function delEach(e){
  var event=e || window.event;
  var target=event.target || event.srcElement;

  if (target.nodeName.toLowerCase()=='li') {
    var index=charList.indexOf.call(target.parentNode.childNodes,target);
    charList.splice(index,1);
    renderChart();
  }
}

//冒泡排序函数
function bubbleSort(){
  var timer=null;
  var len=charList.length;
  var i=0,j=0,swap=null;

  if (len===0) {
    alert("没有可以排序的数据");
    return;
  }
  if (len==1) {
    return charList;
  }
  
  timer=setInterval(sort,25);
  function sort(){
    if (i<len) {
      if (j<len-i-1) {
        if (charList[j]>charList[j+1]) {
          swap=charList[j];
          charList[j]=charList[j+1];
          charList[j+1]=swap;
          renderChart();
        }
        j++;
        return;
      }else{
        j=0;
      }
      i++;
    }else{
      clearInterval(timer);
    }
  }
}

//监听事件兼容IE
function addEvent(element,type,handler){
  if (element.addEventListener) {
    element.addEventListener(type,handler,false);
  }else if (element.attachEvent) {
    element.atatchEvent('on'+type,handler);
  }else{
    element['on'+type]=handler;
  }
}

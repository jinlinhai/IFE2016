window.onload=function(){
  var oTxt=document.getElementById('txt');
  var addL=document.getElementById('addleft');
  var addR=document.getElementById('addright');
  var delL=document.getElementById('delleft');
  var delR=document.getElementById('delright');

//给左侧入按钮绑定添加列表函数
  addEvent(addL,'click',function(){
    addList(oTxt,'left');
  });

//给右侧入按钮绑定添加列表函数
  addEvent(addR,'click',function(){
    addList(oTxt,'right');
  });

//给左侧入按钮绑定删除列表函数
  addEvent(delL,'click',function(){
    delList(oTxt,'left');
  });

//给右侧入按钮绑定删除列表函数
  addEvent(delR,'click',function(){
    delList(oTxt,'right');
  });

//给每个列表元素绑定删除列表函数
  addEvent(document.body,'click',function(){
    delEach(event);
  });

};

//检验输入是否为整数
function checkText(txt){
  var re=/^\d+$/g;

  if (!(txt.match(re))) {
    alert('请输入整数');
    return false;
  }else{
    return true;
  }
}

/**
* 点击"左侧入"，将input中输入的数字从左侧插入队列中
*  点击"右侧入"，将input中输入的数字从右侧插入队列中
*/
function addList(txt,direction){
  var txtValue=txt.value;
  var oUl=document.getElementById('list')?document.getElementById('list'):'';
  if (!(checkText(txtValue))) return;

  if (!oUl) {
    oUl=document.createElement('ul');
    oUl.id='list';
    document.body.appendChild(oUl);
  }

  var oLi=document.createElement('li');
  oLi.innerHTML=txtValue;

  if (direction=='left') {
    if (!oUl.firstChild) {
      oUl.appendChild(oLi);
    }else{
      oUl.insertBefore(oLi,oUl.firstChild);
    }
  }else if (direction=='right') {
    oUl.appendChild(oLi);
  }
}



/**
*点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
*点击"右侧出"，读取并删除队列右侧一个元素，并弹窗显示元素中数值；
*/
function delList(txt,direction){
  var oUl=document.getElementById('list');
  if (!oUl) {
    alert("没有可以删除的元素");
    return false;
  }
  
  if (direction==='left') {
    if (!oUl.firstChild) {
      alert("没有可以删除的元素");
      return false;
    }else{
      alert("删除的元素是："+oUl.firstChild.innerHTML);
      oUl.removeChild(oUl.firstChild);
    }

  }else if (direction==='right') {
    if (!oUl.lastChild) {
      alert("没有可以删除的元素");
      return false;
    }else{
      alert("删除的元素是："+oUl.lastChild.innerHTML);
      oUl.removeChild(oUl.lastChild);
    } 
  }

}


//点击队列中任何一个元素，则该元素会被从队列中删除
function delEach(e){
  var event=e || window.event;
  var target=event.target || event.srcElement;
  if (target.nodeName.toLowerCase()=='li') {
    target.parentNode.removeChild(target);
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
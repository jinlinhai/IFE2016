$=function(id){
   return document.querySelector(id);
};

var oUl=$('#list');
$('#addleft').onclick=function(){
    addList();
};

$('#addright').onclick=function(){
    addList();
};

$('#delleft').onclick=function(){
    delList();
};

$('#delright').onclick=function(){
    delList();
};

document.body.addEventListener('click',function(){
    delEach();
});

$('#srh-btn').onclick=searchList;


/**
 * 格式可以为数字、中文、英文等，
 * 可以通过用回车，逗号（全角半角均可），
 * 顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
 */
function checkValue(){
    var dataTxt=$('#txt').value.trim();
    var re=/[a-zA-Z0-9\u4e00-\u9fa5]+/g;
    if (dataTxt==="") {
        alert('输入为空');
        return false;
    }else{
        return dataTxt.match(re);
    }    
}

//添加数据列表
function addList(){
    var value=checkValue();
    var oLi=null;
    if (!value) {return;}
    for (var i = 0; i < value.length; i++) {
        oLi=document.createElement('li');
        oLi.innerHTML=value[i];
        if (event.target.id==='addleft') {
            if (!oUl.childNodes) {
                oUl.appendChild(oLi);
            }else{
                oUl.insertBefore(oLi,oUl.firstChild);
            } 
        }else if (event.target.id==='addright') {
            oUl.appendChild(oLi);
        }
    }
    $('#txt').value='';
}

//删除数据列表
function delList(){
    if (oUl.childNodes.length===0) {
        alert('没有可以删除的元素');
        return;
    }

    if (event.target.id==='delleft') {
        oUl.removeChild(oUl.firstChild);
    }else if (event.target.id==='delright') {
        oUl.removeChild(oUl.lastChild);
    }
}

//点击删除当前数据列表
function delEach(){
    var target=event.target;
    if (target.nodeName.toLowerCase()==='li') {
        oUl.removeChild(target);
    }
}

//查询数据
function searchList(){
    var searchTxt=$('#search').value.trim();
    var oList=oUl.getElementsByTagName('li');
    if (oList.length===0) {
        alert('无可查询数据');
        return false;
    }
    if (searchTxt==='') {
        alert('输入为空');
        return false;
    }

    oUl.innerHTML=oUl.innerHTML.replace(/<b>/g,'');
    var searchIndex=oUl.innerHTML.search(searchTxt);
    if (searchIndex!=-1) {
        oUl.innerHTML=oUl.innerHTML.replace(new RegExp(searchTxt,'g'),'<b>'+searchTxt+'</b>');
    }else{
        alert('没有符合条件的数据');
    }
}
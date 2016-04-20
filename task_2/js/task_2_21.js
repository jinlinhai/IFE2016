$=function(id){
    return document.querySelector(id);
};

var oTag=$('#tag');
var tagList=$('#tag-list');
var oHobby=$('#hobby');
var hobbyBtn=$('#add-hobby');
var hobbyList=$('#hobby-list');

/**
 * 通过构造函数模式定义实例属性
 */
function CreateList(list){
    this.list=list;
    this.dataList=[];
}

/**
 * 原型共享渲染列表方法
 * Tag不能有重复的，遇到重复输入的Tag，自动忽视
 * 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
 */
CreateList.prototype={
    constructor: CreateList,
    render: function(){
        var oList='';
        this.dataList.forEach(function(e){
            oList+='<span>'+e+'</span>';
        });
        this.list.innerHTML=oList;
    },
    addList: function(value){
        if (!value) {return;}
        if (this.dataList.indexOf.call(this.dataList,value)===-1) {
            this.dataList.push(value);
        }
        if (this.dataList.length>10) {
            this.dataList.shift();
        }
        this.render();
    }
};

/**
 * 遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面
 */
function tagAdd(){
    var re1=/[\s,，\n]/;
    var re2=/[,，;；、\s\n]+/g;
    var tagTxt=oTag.value.trim().replace(re2,'');
    if (re1.test(oTag.value)||event.keyCode==13) {
        tagObj.addList(tagTxt);
        oTag.value='';
    }
}

/**
 * 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
 */
function tagDel(){
    var target=event.target;
    if (target.nodeName.toLowerCase()=='span') {
        switch(event.type){
            case 'mouseover':
                var oTxt=document.createTextNode('删除元素');
                target.insertBefore(oTxt,target.firstChild);
                target.className='hover';
                break;

            case 'mouseout':
                tagObj.render();
                break;

            case 'click':
                var index=tagObj.dataList.indexOf.call(target.parentNode.childNodes,target);
                tagObj.dataList.splice(index,1);
                tagObj.render();
                break;
        }
    }
}

/**
 * 通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
 * 当点击“确认兴趣爱好”的按钮时，按照设定的间隔符，拆解成一个个的爱好，显示在textarea下方
 */
function hobbyAdd(){
    var re=/[,，;；、\s\n]+/g;
    var hobbyTxt=$('#hobby').value.trim().split(re);
    hobbyTxt.forEach(function(e){
        hobbyObj.addList(e);
    });
    oHobby.value='';    
}


var tagObj=new CreateList(tagList);
var hobbyObj=new CreateList(hobbyList);

//绑定事件
oTag.addEventListener('keyup',function(){
    tagAdd();
});

tagList.addEventListener('mouseover',function(){
    tagDel();
});

tagList.addEventListener('mouseout',function(){
    tagDel();
});

tagList.addEventListener('click',function(){
    tagDel();
});

hobbyBtn.addEventListener('click',hobbyAdd);
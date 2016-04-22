$=function(id){
    return document.querySelector(id);
};

//名称
var useName=$('#use-name');
var nameTip=$('#nameTip');
//密码
var passWord=$('#password');
var pwdTip=$('#passwordTip');
//确认密码
var pwdRepeat=$('#pwdRepeat');
var pwdReTip=$('#pwdRepeatTip');
//邮箱
var oEmail=$('#email');
var emailTip=$('#emailTip');
//手机
var oPhone=$('#phone');
var phoneTip=$('#phoneTip');
//提交按钮
var submitBtn=$('#submit');


var nameLength=0;

//一个双字节（汉字）字符长度计2字符
function getLength(str){
 return str.replace(/[^\x00-xff]/g,"xx").length;
}

//提示信息
var User={
    'class':{
        'focus': 'input-text input-focus',
        'error': 'input-text input-error',
        'succ': 'input-text input-succ',
    },
    'name':{
        'tip': '必填，仅支持汉字、字母、数字、下划线,长度为4~16个字符',
        'empty': '名称不能为空',
        'error': '格式错误，仅支持汉字、字母、数字、下划线组合',
        'length': '长度只能在4~16个字符之间',
        'succ': '名称格式正确'
    },
    'passWord':{
        'tip': '长度为6~20个字符，仅支持字母、数字',
        'empty': '密码不能为空',
        'error': '格式错误，仅支持字母、数字组合',
        'length': '长度只能在6~20个字符之间',
        'succ': '密码可用'
    },
    'pwdRepeat':{
        'tip': '请再次输入密码',
        'empty': '请再次输入密码',
        'error': '两次输入不一致',
        'succ': '密码输入一致'
    },
    'email':{
        'tip': '建议使用常用邮箱',
        'error': '邮箱格式错误',
        'succ': '邮箱格式正确'
    },
    'phone':{
        'tip': '建议使用常用手机',
        'error': '手机格式错误',
        'succ': '手机格式正确',
    }
};

/**
 * 获得焦点时提示
 */
User.tipShow=function(input,showTip,tip){
    input.className=User.class.focus;
    showTip.className='focus';
    showTip.innerHTML=tip;
};

//名称验证
function checkName(){
    var oName=useName.value;
    var re1=/[^\w\u4e00-\u9fa5]/g;
    var oTest=re1.test(oName);
    nameLength=getLength(oName);

    if (oName==='' || oTest || nameLength<4 || nameLength>16) {
        useName.className=User.class.error;
        nameTip.className='error';
    }
    //不能为空
    if (oName==='') {
        nameTip.innerHTML=User.name.empty;
    }
    //格式错误，仅支持汉字、字母、数字、下划线组合
    else if (oTest) {
        nameTip.innerHTML=User.name.error;
    }
    //长度只能在4~16个字符之间
    else if (nameLength<4 || nameLength>16) {
        nameTip.innerHTML=User.name.length;
    }
    //正确：名称格式正确
    else{
        useName.className=User.class.succ;
        nameTip.className='succ';
        nameTip.innerHTML=User.name.succ;
        return true;
    }
}

//密码验证
function checkPsw(){
    var oPsw=passWord.value;
    var re2=/[^a-zA-Z0-9]/g;
    var oTest=re2.test(oPsw);

    if (oPsw==='' || oTest || oPsw.length<6 || oPsw.length>16) {
        passWord.className=User.class.error;
        pwdTip.className='error';
    }

    //密码不能为空
    if (oPsw==='') {
        pwdTip.innerHTML=User.passWord.empty;
    }
    //格式错误，仅支持字母、数字组合
    else if (oTest) {
        pwdTip.innerHTML=User.passWord.error;
    }
    //长度只能在6~16个字符之间
    else if (oPsw.length<6 || oPsw.length>16) {
        pwdTip.innerHTML=User.passWord.length;
    }
    //正确：密码格式正确
    else{
        passWord.className=User.class.succ;
        pwdTip.className='succ';
        pwdTip.innerHTML=User.passWord.succ;
        return true;
    }    
}

//密码确认
function checkpwdRepeat(){
    //两次输入不一致
    if (pwdRepeat.value!== passWord.value) {
        pwdRepeat.className=User.class.error;
        pwdReTip.className='error';
        pwdReTip.innerHTML=User.pwdRepeat.error;
    }
    //两次输入一致
    else{
        pwdRepeat.className=User.class.succ;
        pwdReTip.className='succ';
        pwdReTip.innerHTML=User.pwdRepeat.succ;
        return true;
    }
}

//邮箱确认
function checkEmail(){
    var re3=/^\w+@[a-z0-9]+\.+[a-z]+$/i;
    //邮箱格式错误
    if (!re3.test(oEmail.value)) {
        oEmail.className=User.class.error;
        emailTip.className='error';
        emailTip.innerHTML=User.email.error;
    }    
    //邮箱格式正确
    else{
        oEmail.className=User.class.succ;
        emailTip.className='succ';
        emailTip.innerHTML=User.email.succ;
        return true;        
    }
}

//手机确认
function checkPhone(){
    var re4=/^1[3|4|5|7|8]\d{9}$/;
    //手机格式错误
    if (!re4.test(oPhone.value)) {
        oPhone.className=User.class.error;
        phoneTip.className='error';
        phoneTip.innerHTML=User.phone.error;
    }
    //手机格式正确
    else{
        oPhone.className=User.class.succ;
        phoneTip.className='succ';
        phoneTip.innerHTML=User.phone.succ;
        return true; 
   }
}

/**
 * 表单验证事件绑定
 */

//名称验证
useName.onfocus=function(){
    User.tipShow(this,nameTip,User.name.tip);
};

useName.onblur=checkName;

//密码验证
passWord.onfocus=function(){
    User.tipShow(this,pwdTip,User.passWord.tip);
};

passWord.onblur=checkPsw;

//确认密码
pwdRepeat.onfocus=function(){
    User.tipShow(this,pwdReTip,User.pwdRepeat.tip);
};

pwdRepeat.onblur=checkpwdRepeat;

//邮箱验证
oEmail.onfocus=function(){
    User.tipShow(this,emailTip,User.email.tip);
};

oEmail.onblur=checkEmail;

//手机验证
oPhone.onfocus=function(){
    User.tipShow(this,phoneTip,User.email.tip);
};

oPhone.onblur=checkPhone;

//提交按钮
submitBtn.onclick=function(){
    if (!checkName()|| !checkPsw()|| !checkpwdRepeat()|| !checkEmail()|| !checkPhone()) {
        alert('提交失败');
        return false;
    }else{
        alert('提交成功');
    }    
};

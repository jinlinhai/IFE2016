/**
 * 瀑布流布局
 * @param {[type]} selector  [实现瀑布流布局的id]
 * @param {[type]} itemClass [子元素的class]
 * @param {[type]} spacing   [设置的间距]
 * @param {[type]} cols      [设置的列数]
 * @param {[type]} data      [加载的图片数据]
 */
function Waterfall(selector,itemClass,spacing,cols,data){
    this.element=document.querySelector(selector);
    this.itemClass=itemClass;
    this.spacing=spacing;
    this.cols=cols;
    this.data=data;
    this.init();
}


/**
 * 初始化瀑布流布局
 */
Waterfall.prototype.init=function(){
    this.item=this.element.querySelectorAll(this.itemClass);    //取得所以子元素
    var len=this.item.length;
    var totalW= document.body.clientWidth || document.documentElement.clientWidth;      
    var boxW=Math.floor((totalW-this.spacing*(this.cols+1))/this.cols);     //计算出picbox的宽度
    var arrH=[];    //储存每列中的高度
    
    this.element.style.cssText="width:"+totalW+"px;margin: 0 auto;";       //设置父级的宽度、自动居中

    for (var i = 0; i < len; i++) {
        //设置每个picbox的宽度和间距
        this.item[i].style.cssText="width:"+boxW+"px;margin:"+this.spacing+"px 0 0 "+this.spacing+"px;";
        var boxsH=this.item[i].offsetHeight;

        if (i<this.cols) {
            arrH.push(boxsH);   //将第一行的高度存于arrH数组
        }else{
            var minH=Math.min.apply(null,arrH);     //arrH数组的最小高度
            var minHindex=this.getminHIndex(minH,arrH);     //最小高度的索引
             //设置第二行开始每个picbox的样式
            this.item[i].style.position='absolute';       
            this.item[i].style.top=(minH+this.spacing)+'px';
            this.item[i].style.left=(this.item[minHindex].offsetLeft-this.spacing)+'px';

             //arrH数组的最小高 + this.item[i]的高度和间距
            arrH[minHindex]+=this.item[i].offsetHeight+this.spacing;
        }
    }
};


//取得最小高度图片的索引
Waterfall.prototype.getminHIndex=function(minH,arr){
    var len=arr.length;
    for (var i = 0; i < len; i++) {
        if (arr[i] == minH) {
            return i;
        }
    }
};


/**
 * 判断是否到可加载条件
 * @return {[type]} [最后一张图片距离网页顶部小于 页面高度+滚动距离时 加载图片]
 */
Waterfall.prototype.checkScroll=function(){
    var lastBox=this.item[this.item.length-1];
    var lastBoxH=lastBox.offsetTop;
    var scrollTop= document.body.scrollTop || document.documentElement.scrollTop;
    var documentH= document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+documentH?true:false);
};


//页面滚动到一定距离时加载图片
Waterfall.prototype.scrollLoad=function(){
    if (this.checkScroll()) {
        var len=this.data.data.length;
        for (var i = 0; i < len; i++) {
            var box=document.createElement('div');
            box.className='picbox';
            box.innerHTML='<a href="images/'+this.data.data[i].src+'" target="_blank"><img src="images/'+this.data.data[i].src+'"></a>';
            this.element.appendChild(box);
        }
        this.init();
    }
};

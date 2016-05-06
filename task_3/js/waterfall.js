/**
 * 瀑布流布局
 * @param {[type]} selector  [实现瀑布流布局的id]
 * @param {[type]} itemClass [子元素的class]
 * @param {[type]} spacing   [设置的间距]
 * @param {[type]} cols      [设置的列数]
 * @param {[type]} data      [加载的图片数据]
 */
 function Waterfall(selector,itemClass,spacing,cols,data){
    var self = this;
    this.container = document.getElementById(selector);
    this.itemClass = itemClass;
    this.spacing = spacing || 16;
    this.cols = cols || 5;
    this.data = data;
    this.init();
    this.initPopup();

    //当页面滚动时加载图片
    window.onscroll=function(){
        self.scrollLoad();
    };

    //点击图片时，弹出当前图片的大图
    this.container.onclick=function(e){
        if (e.target.nodeName.toLowerCase() === 'img') {
            e.stopPropagation();
            self.currentPic = e.target;
            self.showPopup(e.target);
        }
    };

    //点遮罩时关闭遮罩和弹出层
    this.mask.onclick=function(){
        self.mask.style.display = 'none';
        self.popup.style.display = 'none';
    };

    //窗口改变宽高时重设图片和弹出层宽高
    var timer = null;
    window.onresize=function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            self.init();
            if (self.currentPic) {
                self.loadPicSize(self.currentPic);
            }            
        },400);
    };

}

/**
 * 初始化瀑布流布局
 */
 Waterfall.prototype.init=function(){
    this.items = this.container.querySelectorAll(this.itemClass);     //取得所以子元素
    var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
    winWidth = winWidth<1200?winWidth=1200:winWidth;    //设置容器不小于1200px
    var boxW = Math.floor((winWidth-this.spacing*(this.cols+1))/this.cols);     //计算出picbox的宽度
    var len = this.items.length;
    var arrH = [];      //储存每列中的高度

    this.container.style.width = winWidth+'px';
    this.container.style.margin = '0 auto';

    for (var i = 0; i < len; i++) {
        this.items[i].style.width = boxW+'px';
        this.items[i].style.padding = this.spacing+'px 0 0 '+this.spacing+'px';

        var boxH = this.items[i].offsetHeight;
        if (i<this.cols) {
            arrH.push(boxH);   //将第一行的高度存于arrH数组
        }else{
            var minH = Math.min.apply(null,arrH);      //arrH数组的最小高度
            var minHindex = this.getminHIndex(minH,arrH);     //最小高度的索引
            //设置第二行开始每个picbox的样式
            this.items[i].style.position = 'absolute';       
            this.items[i].style.top = (minH)+'px';

            this.items[i].style.left = (this.items[minHindex].offsetLeft)+'px';

            //arrH数组的最小高 + this.item[i]的高度和间距
            arrH[minHindex]+=this.items[i].offsetHeight;
        }
    }
    var maxH = Math.max.apply(null,arrH);
    this.container.style.height = maxH+this.spacing+'px';    //设置容器高度
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
    var lastBox = this.items[this.items.length-1];
    var lastBoxH = lastBox.offsetTop;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var documentH = document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+documentH?true:false);
};


//页面滚动到一定距离时加载图片
Waterfall.prototype.scrollLoad=function(){
    if (this.checkScroll()) {
        var len = this.data.data.length;
        for (var i = 0; i < len; i++) {
            var box = document.createElement('div');
            box.className = 'picbox';
            box.innerHTML = '<div class="pic-inner"><img src="images/small'+this.data.data[i].src+'" data-source="images/'+this.data.data[i].src+'"></div>';
            this.container.appendChild(box);
        }
        this.init();
    }
};


//初始化弹出层
Waterfall.prototype.initPopup=function(){
    this.mask = document.createElement('div');
    this.mask.id = 'mask';
    document.body.appendChild(this.mask);

    this.popup = document.createElement('div');
    this.popup.id = 'popup';
    document.body.appendChild(this.popup);

    this.popupPic=document.createElement('img');
    this.popup.appendChild(this.popupPic);
};

//显示遮罩、弹出层
Waterfall.prototype.showPopup=function(currentObj){
    var self = this;
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    var popupW = winW/2+10;
    var popupH = winH/2+10;

    this.mask.style.display = 'block';

    this.popup.style.display = 'block';
    this.popup.style.width = popupW+'px';
    this.popup.style.height = popupH+'px';
    this.popup.style.left = (winW-popupW)/2+'px';
    this.popup.style.top = (winH-popupH)/2+'px';

    this.popupPic.style.display = 'none';

    self.loadPicSize(currentObj);
};

//当图片加载完毕，并根据图片宽高设置弹出层
Waterfall.prototype.loadPicSize=function(currentObj){
    var sourcePic = currentObj.getAttribute('data-source');
    var self = this;
    this.popupPic.style.width = 'auto';
    this.popupPic.style.height = 'auto';

    this.preLoadImg(sourcePic,function(){
        self.popupPic.src = sourcePic;
        var picW = self.popupPic.width;
        var picH = self.popupPic.height;
        self.changePicSize(picW,picH);
    });
};

//根据图片宽高设置弹出层
Waterfall.prototype.changePicSize=function(picW,picH){
    var self = this;
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    var scale = Math.min(winW/(picW+10),winH/(picH+10),1);
    var popupW = Math.floor(picW*scale-10);
    var popupH = Math.floor(picH*scale-10);


    this.popup.style.width = popupW+'px';
    this.popup.style.height = popupH+'px';
    
    this.popup.style.left = (winW-popupW-10)/2+'px';
    this.popup.style.top = (winH-popupH-10)/2+'px';

    this.popupPic.style.width = popupW+'px';
    this.popupPic.style.height = popupH+'px';
    this.popupPic.style.display = 'block';
};

//检测图片是否加载完毕
Waterfall.prototype.preLoadImg=function(url,callback){
    var img = new Image();
    img.src = url;
    if (img.complete) {
        callback();
    }else{
        img.onload=function(){
            callback();
            img.onload = null;
        };
    }
};
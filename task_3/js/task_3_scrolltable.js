function Createtable(id,thead,thClass,data){
    this.id=id;
    this.th=thead;
    this.thStyle=thClass;
    this.data=data;
    this.render();
    this.addEvent();
    this.scrollData();
}


Createtable.prototype={
    constructor: Createtable,
    render: function(){
        var table=document.getElementById(this.id),
            tHead,
            td='';
        //判断table是否存在
        if (!table) {
            var oBody=document.body;
            table=document.createElement('table');
            table.id=this.id;
            oBody.insertBefore(table,oBody.firstChild);
        }
        //初始化table
        table.innerHTML="";
        //渲染表头
        tHead=document.createElement('tr');
        this.th.forEach(function(a){
            //判断表头是否进行排序按钮的显示
            if (a.sort) {
                td+='<td>'+a.title+'<i class="up"></i><i class="down"></i>'+'</td>';
            }else{
                td+='<td>'+a.title+'</td>';
            }
        });
        //添加表头样式
        tHead.className=this.thStyle;
        tHead.innerHTML=td;
        table.appendChild(tHead);

        //渲染表格数据
        this.data.forEach(function(a){
            var th="";
            var len=Object.keys(a).length;

            th=document.createElement('tr');            
            for (var i = 0; i < len; i++) {
                td='<td>'+a.名字+'</td>'+'<td>'+a.语文+'</td>'+'<td>'+a.数学+'</td>'+'<td>'+a.英语+'</td>'+'<td>'+a.总分+'</td>';
            }
            th.innerHTML=td;
            table.appendChild(th);
        });        
    },
    //从小到大排序
    sortTop: function(key){
        this.data.sort(function(a,b){
         return  a[key]-b[key];
     });
        this.render();
    },
    //从大到小排序
    sortDown: function(key){
        this.data.sort(function(a,b){
         return  b[key]-a[key];
     });
        this.render();
    },
    //首行冻结
    scrollData: function(){
        var oTable=document.getElementById(this.id);
        var oThead=oTable.getElementsByTagName('tr')[0];
        var OTitle=document.createElement('tr');
        OTitle.id='dataTitle';
        OTitle.className=oThead.className+' fixed';
        OTitle.innerHTML=oThead.innerHTML;
        OTitle.style.display='none';
        oTable.appendChild(OTitle);
        
        window.onscroll=function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var oTitle=document.getElementById('dataTitle');
            if (scrollTop>oTable.offsetTop && scrollTop<=(oTable.offsetHeight+oTable.offsetTop)) {
                oTitle.style.display='block';
            }else{
                oTitle.style.display='none';
            }
        };
    },


    //添加排序事件
    addEvent: function(){
        var that=this;
        document.getElementById(this.id).addEventListener('click',function(e){
            var index;
            var target=e.target;
            if (target.className==='up') {
                index=target.parentNode.childNodes[0].nodeValue;
                that.sortTop(index);
                if (that.scrollData) {
                    that.scrollData();
                }                                
            }else if (target.className==='down') {
                index=target.parentNode.childNodes[0].nodeValue;
                that.sortDown(index);
                if (that.scrollData) {
                    that.scrollData();
                }
            }
        });
    }
};

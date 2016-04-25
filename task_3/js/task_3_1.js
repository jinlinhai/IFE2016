$(function(){
    var dragging=false;
    var _x,_y;

    /**
     * 弹出浮出层
     * 禁止页面出现滚动
     */
    function showLogin(){
        $('.mask').show();
        $('.popover').slideDown(200);
        $(window).scroll(function(){
            $(window).scrollTop(0);
        });
    }

    //当页面打开时弹出登录
    showLogin();

    //点击登录时弹出
    $('.login').click(showLogin);

    /**
     * 关闭浮出层
     * 当浮出层显示时，点击关闭按钮、点击浮出层以外的部分，默认为关闭浮出层
     * 解除禁止页面出现滚动
     */
    $('.close,.mask').click(function(){
        $('.mask').hide();
        $('.popover').slideUp(200);
        $(window).unbind();
    });

    /**
     * 记录鼠标按下时的坐标
     */
    $('.popover').mousedown(function(e){
        dragging=true;
        _x=e.pageX-parseInt($(this).offset().left);
        _y=e.pageY-parseInt($(this).offset().top);
    });

    /**
     * 浮出层的拖拽，移动浮出窗口位置
     * 限制浮出层不溢出浏览器窗口
     * 开始拖拽时浮出层透明显示
     */
    $(document).mousemove(function(e){
        if (dragging) {
            var x=e.pageX-_x,
                y=e.pageY-_y,
                maxW=$(window).width()-$('.popover').width();
                maxH=$(window).height()-$('.popover').height();

                if (x<0) {
                    x=0;
                }else if (x>maxW) {
                    x=maxW;
                }

                if (y<0) {
                    y=0;
                }else if (y>maxH) {
                    y=maxH;
                }

            $('.popover').fadeTo(10,0.8);
            $('.popover').offset({left:x,top:y});
            return false;
        }
    /**
     * 鼠标释放停止拖拽
     * 恢复浮出层不透明度 
     */
    }).mouseup(function(e) {
        dragging=false;
        $('.popover').fadeTo(20,1);
    });
});
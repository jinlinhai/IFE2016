$(function(){
    var dragging=false;
    var _x,_y;


    /**
     * 弹出登陆框
     */
     function showLogin(){
        $('.mask').show();
        $('.popover').slideDown(200);
    }

    /**
     * 关闭登陆框
     */
    function hideLogin(){
        $('.mask').hide();
        $('.popover').slideUp(200);
    }

    /**
     * 拖拽
     */
     function drag(e){
        dragging=true;
        // 光标按下时光标和面板之间的距离
        _x=e.pageX-$(this).offset().left;
        _y=e.pageY-$(this).offset().top;

        this.setCapture && this.setCapture();
        $(document).bind('mousemove',mouseMove).bind('mouseup',mouseUp);

    }

    //按下鼠标后移动
    function mouseMove(e){
        if (dragging) {
            var x=e.pageX-_x,
            y=e.pageY-_y,
            //限制拖拽不可溢出文档
            maxW=$(document).width()-$('.popover').width(),
            maxH=$(document).height()-$('.popover').height();

            x=x<0?0:x;
            x=x>maxW?maxW:x;
            y=y<0?0:y;
            y=y>maxH?maxH:y;

            $('.popover').offset({left:x,top:y});
            return false;                    
        }
    }

    //释放鼠标
    function mouseUp(e){
        dragging=false;
        $('.popover').releaseCapture && $('.popover').releaseCapture();
        $('document').unbind('mousemove',mouseMove).unbind('mouseup',mouseUp);
    }

    //页面加载后弹出登录框
    showLogin();
    //点击’登录‘弹出登录框
    $('.login').click(showLogin);
    //点击’关闭‘、遮罩关闭登录框
    $('.close,.mask').click(hideLogin);
    //登陆框拖拽
    $('.popover').mousedown(drag);
});
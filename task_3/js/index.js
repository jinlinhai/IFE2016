window.onload=function(){
    var dataPic={'data':[{'src':'20.jpg'},{'src':'21.jpg'},{'src':'22.jpg'},{'src':'23.jpg'},
                        {'src':'24.jpg'}, {'src':'25.jpg'}, {'src':'26.jpg'}, {'src':'27.jpg'},
                        {'src':'28.jpg'}, {'src':'29.jpg'}, {'src':'30.jpg'}, {'src':'31.jpg'},
                        {'src':'32.jpg'}, {'src':'33.jpg'}, {'src':'34.jpg'}, {'src':'35.jpg'},
                        {'src':'36.jpg'}, {'src':'37.jpg'}, {'src':'38.jpg'}, {'src':'39.jpg'},
    ]};
    var waterfall1=new Waterfall('#waterfall','.picbox',16,5,dataPic);
    
    window.onscroll=function(){
        waterfall1.scrollLoad();
    };
};
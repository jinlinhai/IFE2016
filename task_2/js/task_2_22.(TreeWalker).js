    var node =  document.getElementById('parentNode');
    var walker;
    var nodeList = [];
    var timer =null;

    //先序遍历
    var preOrder = function(node){
        nodeList.push(node);
        walker = document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT,null,false);
        node = walker.nextNode();
        while( node !== null){
            nodeList.push(node);
            node = walker.nextNode();
        }
    };

    // 中序遍历
    var inOrder = function(node){
        if(node !== null){
            inOrder(node.firstElementChild);
            nodeList.push(node);
            inOrder(node.lastElementChild);
        }
    };

    // 后序遍历
    var posOrder =function(node){
        nodeList.push(node);
        walker = document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT,null,false);
        node = walker.nextNode();
        while( node !== null){
            nodeList.unshift(node);
            node = walker.nextNode();
        }
    };

    var traverseColor = function(){
        var i = 0,len = nodeList.length-1;
        var tip = document.getElementById('tip')
        nodeList[i].style.background = 'blue';
        timer = setInterval(function(){
            if (i < len) {
                i++;
                nodeList[i].style.background = 'blue';
                nodeList[i-1].style.background = '#fff';
                tip.innerHTML = '遍历中...';
            }else{
                clearInterval(timer);
                nodeList[i].style.background = '#fff';
                tip.innerHTML = '遍历完成！';
            }
        },300)
    };
    
    document.getElementById('prebtn').onclick = function(){
        nodeList = [];
        preOrder(node);
        traverseColor();           
    };

    document.getElementById('posbtn').onclick = function(){
        nodeList = [];
        posOrder(node);
        traverseColor();           
    };

    document.getElementById('inbtn').onclick = function(){
        nodeList = [];
        inOrder(node);
        traverseColor();           
    };
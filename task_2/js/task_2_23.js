(function(){
    var oRoot =  document.getElementById('parentNode'),
        walker,
        nodeList = [],
        timer =null,
        speed = 500;

    //先序遍历
    var preOrder = function(oRoot){
        nodeList = [];
        var node = oRoot;
        
        walker = document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT,null,false);
        while( node !== null){
            nodeList.push(node);
            node = walker.nextNode();
        }
    };

    // 中序遍历
    var inOrder = function(oRoot){
        nodeList = [];
        var node = oRoot.firstElementChild;
        var filter = function(node){
            return node.tagName.toLowerCase() == 'div'?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;
        };
        walker = document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT,filter,false);

        while( node !== null){
            nodeList.push(node);
            node = walker.nextNode();
        }

        node = document.getElementById('parentNode');
        nodeList.push(node);
        walker.currentNode = node.lastElementChild;
        node = walker.currentNode;

        while( node !== null){
            nodeList.push(node);
            node = walker.nextNode();
        }
    };

    // 后序遍历
    var posOrder =function(oRoot){
        nodeList = [];
        var node = oRoot,
            
        walker = document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT,null,false);
        while( node !== null){
            nodeList.unshift(node);
            node = walker.nextNode();
        }
    };

     // 遍历中的颜色
    var traverseColor = function(event){
        clearInterval(timer);
        nodeList.forEach(function(val){
            val.style.background = '#fff';
        })

        var i = 0,len = nodeList.length-1;
        var tip = document.getElementById('tip')
        nodeList[i].style.background = 'blue';
        timer = setInterval(function(){
            if (i < len) {
                i++;
                nodeList[i].style.background = 'blue';
                nodeList[i-1].style.background = '#fff';
                tip.innerHTML = '遍历中...';

                if (event && event.target.id == 'search') {
                    var oTxt = document.getElementById('keyword').value;
                    if(nodeList[i].firstChild.data.trim() == oTxt){
                        nodeList[i].style.background = 'red';
                        clearInterval(timer);
                        return;
                    }
                }
            }else{
                clearInterval(timer);
                nodeList[i].style.background = '#fff';
                tip.innerHTML = '遍历完成！';
            }
        },speed)
    };

    
    document.getElementById('prebtn').onclick = function(){
        preOrder(oRoot);
        traverseColor();           
    };

    document.getElementById('inbtn').onclick = function(){
        inOrder(oRoot);
        traverseColor();      
    };

    document.getElementById('posbtn').onclick = function(){
        posOrder(oRoot);
        traverseColor(event);       
    };

    document.getElementById('search').addEventListener('click',function(event){
        nodeList = [];
        preOrder(oRoot);
        traverseColor(event)
    });
})();

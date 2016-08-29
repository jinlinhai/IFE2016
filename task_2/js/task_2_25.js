(function(){
    var container = document.getElementById('container');
    var searchBtn = document.getElementById('searchBtn');

    //展开、收缩列表，增加、删除节点
    var setDomEvent = function(e){
        var target = e.target;
        switch (target.className){
            case 'slideup':
                target.className = 'slidedown';
                break;

            case 'slidedown':
                target.className = 'slideup';
                break;

            case 'iconfont addicont icont':
                var nodeTxt = prompt('请输入添加的列表','');
                    htmlNode = '',
                    oParent = target.parentNode,
                    len = oParent.getElementsByTagName('ul').length;
                if (len <1) {
                    htmlNode = '<ul><li><a href="#">'+nodeTxt+'</a><i class="iconfont addicont icont" ></i><i class="iconfont deicont icont"></i></li></ul>'; 
                    oParent.innerHTML += htmlNode;
                    oParent.className = 'slidedown';
                }else{
                    htmlNode = '<li><a href="#">'+nodeTxt+'</a><i class="iconfont addicont icont" ></i><i class="iconfont deicont icont"></i></li>';
                    oParent.lastElementChild.innerHTML += htmlNode;
                }
                break;

            case 'iconfont deicont icont':
                target.parentNode.parentNode.removeChild(target.parentNode);
                break;
            default:
                return false;
        }
    }

    //搜索关键词
    var searchKeyWord = function(){
        var keyWord = document.getElementById('keyWord').value,
            nodeList = [],
            node = '';
        var oParent;

        if (keyWord == '') { return;}

        // 过滤出带有文本的a标签
        var filter = function(node){
            return node.tagName.toLowerCase() == 'a'?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;
        }

        // 开始遍历节点
        walker = document.createTreeWalker(container,NodeFilter.SHOW_ELEMENT,filter,false);
        node = walker.nextNode();

        // 将有带有文本的节点存入数组nodeList
        while(node !== null){
            nodeList.push(node);
            node = walker.nextNode();
        }

        //初始化样式，并将匹配的文本以特殊形式展示
        nodeList.forEach(function(el,i,arr){
            el.style.color = '#000';
            if (el.innerText == keyWord) {
                el.style.color = 'red';

                //展开相应的父节点
                oParent = el.parentNode;
                while(oParent){
                    if (/slideup/.test(oParent.className)) {
                        oParent.className = 'slidedown';
                    }
                    oParent = oParent.parentNode;
                }
            }
        });
    };
    
    container.addEventListener('click',function(e){
        setDomEvent(e);
    });

    //搜索关键词
    searchBtn.onclick = searchKeyWord;
})();

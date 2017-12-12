     function thisindex(elm){
      var nodes = elm.parentNode.childNodes, node;
      var i = 0, count = i;
      while( (node=nodes.item(i++)) && node!=elm )
        if( node.nodeType==1 ) count++;
      return count;
    }

    function closeAll(index){
      var len = document.getElementsByTagName("details").length;

      for(var i=0; i<len; i++){
        if(i != index){
          document.getElementsByTagName("details")[i].removeAttribute("open");
        }
      }
    }

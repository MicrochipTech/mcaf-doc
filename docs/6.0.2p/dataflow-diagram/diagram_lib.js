function DiagramHandler(diagram_data, img_container, desc_container)
{
    this.data = diagram_data;
    var containers = this.img_container = {};
    var highlights = [];
    var highlighted_row = null;
    var diagram_ids = [];
    containers.img = img_container;
    containers.desc = desc_container;
    
    containers.img.querySelectorAll('img')
                  .forEach(function(img) {
        if (img.id.startsWith('diagram-')) {
            var id = img.id.slice(8);
            diagram_ids.push(id);
        }
    });
    containers.desc.querySelectorAll('table > tbody > tr')
                   .forEach(function(row) {
        var rowid = row.dataset.row;
        var rownum = parseInt(rowid);
        var data = diagram_data[rownum];
        var highlight = document.createElement('div');
        highlight.classList.add('highlightable');
        var img = document.getElementById('diagram-'+data.diagram);
        img.parentNode.appendChild(highlight);
        highlights[rownum] = {highlight:highlight};
        
        function highlightOnHover(source, target, extrafunc) {
            if (!extrafunc)
            {
                extrafunc = function() {};
            }
            var on = false;
            source.addEventListener('mouseenter',function(event) {
                target.classList.add('highlight-flash');
                setTimeout(function() {
                    target.classList.remove('highlight-flash');
                    target.classList.toggle('highlight',on);
                }, 50);
                extrafunc(event, true);
                on = true;
            });
            source.addEventListener('mouseleave',function(event) {
                target.classList.toggle('highlight',false);
                extrafunc(event, false);
                on = false;
            });
        }
        highlightOnHover(highlight, row, function(event, enter) {
            if (enter)
            {
                var targetRow = 'row-'+rowid
                window.location.hash = targetRow;
            }
        });
        highlightOnHover(row, highlight);
    });
    function toNode(tag, content)
    {
        var node = document.createElement(tag);
        if (typeof(content) === 'string')
        {
            node.textContent = content;
        }
        else
        {
            node.appendChild(content);
        }
        return node;
    }
    // Rescale image map to match image resizing.
    function resizeImageMap(event) {
      var scale = {};
      diagram_ids.forEach(function(id) {
          var img = document.getElementById('diagram-'+id);
          scale[id] = {
              x: img.offsetWidth/img.naturalWidth,
              y: img.offsetHeight/img.naturalHeight,
              ofsx: img.offsetLeft
          };
      });
      highlights.forEach(function(item, i) {
          var c0 = diagram_data[i].location;
          var r = scale[diagram_data[i].diagram];
          var c1 = [Math.round(c0[0]*r.x)+r.ofsx,
                    Math.round(c0[1]*r.y),
                    Math.round(c0[2]*r.x)+r.ofsx,
                    Math.round(c0[3]*r.y)];
          var width = c1[2]-c1[0];
          var height = c1[3]-c1[1];
          item.highlight.style = 
            "left:"+c1[0]+"px; top:"+c1[1]+"px; width:"+width+"px; height:"+height+"px;";
      });
    }
    function resize(event) {
        resizeImageMap(event);
        var thead = document.querySelector('.descriptions table > thead');
        var tbody = document.querySelector('.descriptions table > tbody');
        var scrollw = tbody.offsetWidth - tbody.clientWidth;
        var style = 'width: calc(100% - '+scrollw+'px);';
        thead.style = style;
    }
    window.addEventListener('resize', resize);
    window.addEventListener('load', resize);    
}
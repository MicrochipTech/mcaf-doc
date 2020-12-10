// see https://css-tricks.com/svg-fragment-identifiers-work/
document.addEventListener("DOMContentLoaded", function(event) {
    function replaceFragment(src, fragment) {
        var i = src.indexOf('#');
        return ((i >= 0) ? src.slice(0,i) : src)+'#'+fragment;
    }
    function svgView(img, x0, y0, w, h)
    {
        img.addEventListener('load',function(event) {
            console.log('svg view loaded!', event.target.src);
            img.height = img.width * h/w;
        });
        img.src = replaceFragment(img.src, 
                     'svgView(viewBox('
                     +[x0,y0,w,h].join(',')
                     +');preserveAspectRatio(xMinYMin))');
    }
    document.querySelectorAll('.svg-crop').forEach(function(svg_container)
    {
        var img = svg_container.querySelector('img');
        svg_container.className.split(' ').some(function(name) {
            if (name.startsWith('svg-crop-'))
            {
                var coords = name.slice(9).split('-');
                var x0 = +coords[0];
                var y0 = +coords[1];
                var w = +coords[2];
                var h = +coords[3];
                svgView(img, x0, y0, w, h);
                return true; // Stop iterating!
            }
        });
    });
});

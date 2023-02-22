const __HERE__ = document.currentScript.src;
document.addEventListener("DOMContentLoaded", function(event) {
    (function add_preliminary_draft_watermark() {
        var path = new URL(__HERE__).pathname.split('/');
        var top = path[path.length-3];
        console.log(top);
        if (!top.endsWith('p'))
            return;
        
        var text = "PRELIMINARY DRAFT";
        var doc = document.querySelector("div.document");
        doc.style.backgroundImage = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='360px' width='360px'><text x='50%' y='50%' fill='rgb(240,240,240)' font-size='36' font-family='Arial, Helvetica, sans-serif' font-weight='bold' text-anchor='middle' transform='rotate(-45,180,180)'>" + text + "</text></svg>\")";    
    })();

    (function body_width_from_preferences() {
        const w = window.localStorage.getItem("mcaf-doc:body-max-width");
        const body = document.querySelector("div.body");
        if (w === null)
        {
            body.style.removeProperty("max-width");
        }
        else
        {
            body.style.setProperty("max-width",w);
        }
    })();
});

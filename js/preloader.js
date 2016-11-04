
// Preloader to load right after body tag is rendered

// preLoad function to add overlay and animated gif
function preLoader() {
    bg = '#78787A';
    document.body.innerHTML += '<div id="preLoader" style="position:fixed;top:0; left:0;width:100%;height:100%;opacity:1;z-index:99999999;background:' + bg + ';"><img src="img/loading.gif" style="position:absolute; top:50%; left:50%; width:60px; height:60px; margin-left:-30px; margin-top:-30px"/></div>';
}

// remove the preloader when window has finished loading
window.onload = function () {
    count = 10;
    setTimeout(function () {
        // fade preloader overlay out
        function preLoadStop() {
            count--;
            document.getElementById("preLoader").style.opacity = (count / 10);
            if (count === 0) {
                clearInterval(preLoadFader);
                document.getElementById("preLoader").style.display = "none"; // remove preloader overlay
            }
        }
        preLoadFader = setInterval(preLoadStop, 25);
    }, 1000);
};
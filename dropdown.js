(function() {
    window.addEventListener("load", function(){
        var t = document.getElementsByClassName("typeahead")[0]
        t.style.display = "none"
        var s =  document.getElementById("search")
        s.addEventListener("keyup", onKeyEvent)
    })
    
    function onKeyEvent() {
        var t = document.getElementsByClassName("typeahead")[0];
    
        if (t.getElementsByTagName("div").length > 0) {
            console.log(t.getElementsByTagName("div").length)
            t.style.display = "block";
        } else {
            t.style.display = "none";
        }
    }
})();
window.addEventListener("load", function(){
    var t = document.getElementsByClassName("typeahead")[0];
    t.style.display = "none";
    document.getElementById("search").addEventListener("keydown", function() {
        var t = document.getElementsByClassName("typeahead")[0];
        
        if (t.getElementsByTagName("div")[0] !== 'undefined') {
            t.style.display = "block";
        } else {
            t.style.display = "none";
        }
    });
});
$("#wrapper").toggleClass("toggled");
function togglear(mq) {
    if ((mq.matches) && ($('.toggled').length > 0) ){ 
        $("#wrapper").toggleClass("toggled");
    } 
}
$("#menu-toggle").click(function() {
    $("#wrapper").toggleClass("toggled");
    });
var x = window.matchMedia("(max-width: 700px)")
togglear(x) 
x.addListener(togglear)  

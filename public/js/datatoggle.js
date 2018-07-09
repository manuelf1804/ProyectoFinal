$(document).ready(function(){
    $('#orden').change(function(){
    let arr=0;
        $('.valor').each(function(){
            let precio = ($(this).find('.precio').val());
            let qty = parseInt($(this).find('.qty').val());
            arr += (precio*qty);
        })
    $('#total').text(arr.toFixed(2));
    })
});
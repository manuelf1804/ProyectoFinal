$(document).ready(function(){
    function calcular(){
        let arr=0;
        $('.valor').each(function(){
            let precio = ($(this).find('.precio').val());
            let qty = parseInt($(this).find('.qty').val());
            arr += (precio*qty)*1.07;
        })
        if(!isNaN(arr))
            $('#total').text(arr.toFixed(2));
        else
            $('#total').text('0.00');
    }
    calcular();
    $('#orden').change(function(){
        calcular();
    })
});
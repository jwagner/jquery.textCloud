$(function(){
    function update(){
        $.get('trends.json', function(trends) {
            $('#cloud').textCloud(trends);
        });
    }

    window.setInterval(update, 10000); 
    update();
});

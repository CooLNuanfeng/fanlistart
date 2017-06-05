;(function(FAPP){
    var vm;
    FAPP.add('init',function(){
        function bindInit(){
            // init ...
            vm = new Vue({
                el : '#app',
                data : {},
                methods : {}
            })
        }

        function bindEvent(){
            // bind event
        }

        function setUp(){
            bindInit();
            bindEvent();
        }
        setUp();
    }).init();
})(FLNS.register(''));

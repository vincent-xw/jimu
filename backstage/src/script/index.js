
    var Jimu = function(){};
    Jimu.prototype = {
        load:function(){
            this.conf();
        },
        conf:function(){
            // fullPage配置
            var runPage = new FullPage({
                id : 'pageContain',                            // id of contain
                slideTime : 800,                               // time of slide
                continuous : false,                            // create an infinite feel with no endpoints
                effect : {                                     // slide effect
                        transform : {
                        translate : 'Y',                      // 'X'|'Y'|'XY'|'none'
                        scale : [1, 1],                      // [scalefrom, scaleto]
                        rotate : [0, 0]                       // [rotatefrom, rotateto]
                        },
                        opacity : [0, 1]                       // [opacityfrom, opacityto]
                    },                           
                mode : 'touch',               // mode of fullpage
                easing : 'ease',                               // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
                start : 1					 // which page will display when install
                //  ,onSwipeStart : function(index, thisPage) {   // callback onTouchStart
                //    return 'stop';
                //  }
                 ,beforeChange : function(index, thisPage) {   // callback before pageChange
                   console.log(index);
                 }
                //  ,callback : function(index, thisPage) {       // callback when pageChange
                //    alert(index);
                //  };
            });
            // 播放音乐
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', '/audio/bgmusic.mp3');
            
            audioElement.addEventListener('ended', function() {
                this.play();
            }, false);

            $('.music').click(function() {
                var temp = $(this).attr("data-status");
                if(temp == "true"){
                    $(this).attr("data-status",false);
                    audioElement.pause();
                }else{
                    $(this).attr("data-status",true);
                    audioElement.play();
                }
                
            });
            // 自动播放
            // audioElement.play();
            
            // 加载首页配置
            this.switchTeam();
        },
        switchTeam:function(){
            var index = 0;
            $(".left").click(function(){
                
                index--;
                if(index < 0){
                    index = 2;
                }
                $(".teamContainer").hide();
                $(".teamContainer").eq(index).show();
            });
            $(".right").click(function(){
                
                index++;
                if(index > 2){
                    index = 0;
                }
                $(".teamContainer").hide();
                $(".teamContainer").eq(index).show();
            });
            $(".teamContainer").hide();
            $(".teamContainer").eq(index).show();
        }
    };
    
// preloader
var loading = {
    config: null,
    index: 0,
    load: function () {
        var t = this.config[this.index]['type'];
        var s = this.config[this.index]['src'];
        if (t === 'js') {
            this.loadJs(s);
        }else if (t === 'image') {
            this.loadImage(s);
        }else if (t === 'audio') {
            this.loadAudio(s);
        }
    },
    loadJs: function (src) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () {
            ++loading.index;
            loading.refresh();
        };
        document.head.appendChild(script);
    },
    loadImage: function (src) {
        var image = document.createElement('img');
        image.src = src;
        image.onload = function () {
            ++loading.index;
            loading.refresh();
        };
    },
    loadAudio: function (src) {
        var audio = new Audio();
        audio.src = src;
        audio.load();
        ++loading.index;
        loading.refresh();
    },
    refresh: function () {
        var p = Math.ceil(this.index / this.config.length * 100);
        if(this.index !== this.config.length) {
            // document.getElementById('loading-process').innerHTML = p + '%';
            this.load();
        }else{
            $("#pageContain").show();
            $("#continue").show();
            $("#loading").on({
                "touchstart":function(){
                    console.log(111);
                    $(".loadingImage").css("position","static");
                    $("#loading").animate({ 
                        top: "-120%",
                    }, 300 );
                    var jimu = new Jimu();
                    jimu.load();
                }
            });
            this.finish(function () {
                window.loadFn();
            });
        }
    },
    finish: function (fn) {
        
        // alert('加载完成啦~我只是个演示，忽略我。');
        // document.getElementById('loading').style.display = 'none';
        // fn && fn();
    }
};
loading.config = [
    {type: 'image', src: '/image/loading/bgimg.png'},
    {type: 'audio', src: '/audio/bgmusic.mp3'},
    
];
document.addEventListener('DOMContentLoaded',function () {
    loading.load();
},false);
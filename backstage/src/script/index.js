
    var Jimu = function(){};
    Jimu.prototype = {
        load:function(){
            this.conf();
        },
        loadUserInfo:function(callback){
            var userInfo = {    
                "openid":" OPENID",  
                "nickname": "vincent",   
                "sex":"1",   
                "province":"PROVINCE",   
                "city":"CITY",   
                "country":"COUNTRY",    
                "headimgurl":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",  
                "privilege":[],    
                "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL" 
            }
            callback(userInfo);
        },
        conf:function(){
            var that = this;
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
                mode : 'wheel',               // mode of fullpage
                easing : 'ease',                               // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
                start : 0					 // which page will display when install
                //  ,onSwipeStart : function(index, thisPage) {   // callback onTouchStart
                //    return 'stop';
                //  }
                 ,beforeChange : function(index, thisPage) {   // callback before pageChange
                   console.log(index);
                 }
                //  ,callback : function(index, thisPage) {       // callback when pageChange
                //    if(index == 1){
                //         window.aaa();
                //    }
                //  }
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
            
            // 构造用户信息
            var user = this.generateInfo();
            // 加载首页配置
            this.switchTeam();
            $("#confirmBtn").click(function(){
                var team;
                $(".teamContainer").each(function(){
                    if($(this).css("display") == "block"){
                        team = $(this).attr("data-team");
                    }
                });
                if(user.isLoadEnd()){
                    if(user.insert("team",team)){
                        that.buildRobot(runPage,user);
                        
                    };
                }
            });
        },
        // init:function(){
        //     var that = this;
        //     this.dragData = {};
        //     this.buildRobotInfo = {};
        //     this.dragProgram = {}; 
        // },
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
            $(".checkMore").click(function(){
                if($(".chooseTeamImg").hasClass("hidden")){
                    $(".chooseTeamImg").removeClass("hidden");
                    $(".basha").addClass("hidden");
                }else{
                    $(".chooseTeamImg").addClass("hidden");
                    $(".basha").removeClass("hidden");
                }
            });
        },
        buildRobot:function(obj,user){
            var that = this;
            obj.go(1);
            // 配置拼图数据
            // 拼搭程序写在这里
            var team = user.getInfo("team");
            var dragData = {
                "xingbao":{
                    "pos":[
                        {
                            "left":"20px",
                            "top":"10px"
                        },
                        {
                            "left":"20px",
                            "top":"50px"
                        },
                        {
                            "left":"20px",
                            "top":"90px"
                        },
                        {
                            "left":"20px",
                            "top":"130px"
                        },
                        {
                            "left":"20px",
                            "top":"170px"
                        },
                        {
                            "left":"20px",
                            "top":"210px"
                        }
                    ],
                    "range":[],
                    "point":[
                        {
                            "minLeft":"0.242",
                            "minTop":"0.184",
                            "maxLeft":"0.764",
                            "maxTop":"0.415"
                        },
                        {
                            "minLeft":"0.26",
                            "minTop":"0",
                            "maxLeft":"0.67",
                            "maxTop":"0.46"
                        },
                        {
                            "minLeft":"0.26",
                            "minTop":"0.46",
                            "maxLeft":"0.67",
                            "maxTop":"0.75"
                        },
                        {
                            "minLeft":"0",
                            "minTop":"0.27",
                            "maxLeft":"1",
                            "maxTop":"0.71"
                        },
                        {
                            "minLeft":"0.10",
                            "minTop":"0.72",
                            "maxLeft":"0.41",
                            "maxTop":"1"
                        },
                        {
                            "minLeft":"0.52",
                            "minTop":"0.72",
                            "maxLeft":"0.85",
                            "maxTop":"1"
                        }
                    ]
                },
                "zhihuiyang":{
                    "pos":[],
                    "range":[],
                    "point":[
                        {
                            "minLeft":"0.36",
                            "minTop":"0",
                            "maxLeft":"1",
                            "maxTop":"0.51"
                        },
                        {
                            "minLeft":"0.06",
                            "minTop":"0.22",
                            "maxLeft":"0.88",
                            "maxTop":"0.6"
                        },
                        {
                            "minLeft":"0.32",
                            "minTop":"0.45",
                            "maxLeft":"1",
                            "maxTop":"1"
                        },
                        {
                            "minLeft":"0",
                            "minTop":"0.46",
                            "maxLeft":"0.64",
                            "maxTop":"0.89"
                        }
                    ]
                },
                "yingwu":{
                    "pos":[
                        {
                            "left":"20px",
                            "top":"10px"
                        },
                        {
                            "left":"20px",
                            "top":"60px"
                        },
                        {
                            "left":"20px",
                            "top":"110px"
                        },
                        {
                            "left":"20px",
                            "top":"160px"
                        },
                        {
                            "left":"20px",
                            "top":"210px"
                        }
                    ],
                    "range":[],
                    "point":[
                        {
                            "minLeft":"0.62",
                            "minTop":"0",
                            "maxLeft":"1",
                            "maxTop":"0.35"
                        },
                        {
                            "minLeft":"0.41",
                            "minTop":"0.22",
                            "maxLeft":"0.85",
                            "maxTop":"0.59"
                        },
                        {
                            "minLeft":"0",
                            "minTop":"0.26",
                            "maxLeft":"0.45",
                            "maxTop":"0.44"
                        },
                        {
                            "minLeft":"0.33",
                            "minTop":"0.41",
                            "maxLeft":"0.73",
                            "maxTop":"1"
                        },
                        {
                            "minLeft":"0.5",
                            "minTop":"0.56",
                            "maxLeft":"0.82",
                            "maxTop":"0.85"
                        }
                    ]
                }
            };
            var buildRobotInfo = {
                robotArr : [],
            }
            if(team == "lxp"){
                buildRobotInfo.type = team;
                var xb_big = "";
                var xb_comp = "";
                for(var i = 1; i < 7; i++){
                    xb_comp += '<li><img id="drag_xb_'+i+'" style="left:'+dragData.xingbao.pos[i-1].left+';top:'+dragData.xingbao.pos[i-1].top+';" src="/image/pinjie/xingbao/com/com_xb_'+i+'.png" alt=""></li>';
                    if(i == 1){
                        xb_big += '<img id="mainImg" class="bgImg_bottom" src="/image/pinjie/xingbao/'+(i-1)+'.png" alt="">';
                    }else if(i == 2){
                        xb_big += '<img class="bgImg hidden" style="z-index:1" src="/image/pinjie/xingbao/'+(i-1)+'.png" alt="">';
                    }else{
                        xb_big += '<img class="bgImg hidden" src="/image/pinjie/xingbao/'+(i-1)+'.png" alt="">';
                    }
                    
                }
                xb_big += '<img class="bgImg hidden" src="/image/pinjie/xingbao/'+6+'.png" alt="">';
                $("#bigContainer").html(xb_big);
                $("#comList").html(xb_comp);
                that.getPos(dragData,"xingbao",function(){
                    new Drag({
                        dragEle: "#drag_xb_1",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.xingbao.range[0].min_left && obj.left < dragData.xingbao.range[0].max_left && obj.top > dragData.xingbao.range[0].min_top && obj.top < dragData.xingbao.range[0].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(0);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_xb_1").css(dragData.xingbao.pos[0]);
                            }
                        }
                    });
                    
                    new Drag({
                        dragEle: "#drag_xb_2",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.xingbao.range[1].min_left && obj.left < dragData.xingbao.range[1].max_left && obj.top > dragData.xingbao.range[1].min_top && obj.top < dragData.xingbao.range[1].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(1);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_xb_2").css(dragData.xingbao.pos[1]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_xb_3",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.xingbao.range[2].min_left && obj.left < dragData.xingbao.range[2].max_left && obj.top > dragData.xingbao.range[2].min_top && obj.top < dragData.xingbao.range[2].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(2);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_xb_3").css(dragData.xingbao.pos[2]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_xb_4",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.xingbao.range[3].min_left && obj.left < dragData.xingbao.range[3].max_left && obj.top > dragData.xingbao.range[3].min_top && obj.top < dragData.xingbao.range[3].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(3);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_xb_4").css(dragData.xingbao.pos[3]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_xb_5",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.xingbao.range[4].min_left && obj.left < dragData.xingbao.range[4].max_left && obj.top > dragData.xingbao.range[4].min_top && obj.top < dragData.xingbao.range[4].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(4);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_xb_5").css(dragData.xingbao.pos[4]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_xb_6",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.xingbao.range[5].min_left && obj.left < dragData.xingbao.range[5].max_left && obj.top > dragData.xingbao.range[5].min_top && obj.top < dragData.xingbao.range[5].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(5);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_xb_6").css(dragData.xingbao.pos[5]);
                            }
                        }
                    });
                });
                
            }else if(team == "ly"){
                buildRobotInfo.type = team;
                var yw_big = "";
                var yw_comp = "";
                for(var i = 1; i < 6; i++){
                    yw_comp += '<li><img id="drag_yw_'+i+'" style="left:'+dragData.yingwu.pos[i-1].left+';top:'+dragData.yingwu.pos[i-1].top+';" src="/image/pinjie/yingwu/com/com_yw_'+i+'.png" alt=""></li>';
                    if(i == 1){
                        yw_big += '<img id="mainImg" class="bgImg_bottom" style="top:145px;" src="/image/pinjie/yingwu/'+(i-1)+'.png" alt="">';
                    }else if(i == 2){
                        yw_big += '<img class="bgImg hidden" style="top:145px;z-index:1" src="/image/pinjie/yingwu/'+(i-1)+'.png" alt="">';
                    }else{
                        yw_big += '<img class="bgImg hidden" style="top:145px;" src="/image/pinjie/yingwu/'+(i-1)+'.png" alt="">';
                    }
                    
                }
                yw_big += '<img class="bgImg hidden" src="/image/pinjie/yingwu/'+6+'.png" alt="">';
                $("#bigContainer").html(yw_big);
                $("#comList").html(yw_comp);
                that.getPos(dragData,"yingwu",function(){
                    new Drag({
                        dragEle: "#drag_yw_1",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.yingwu.range[0].min_left && obj.left < dragData.yingwu.range[0].max_left && obj.top > dragData.yingwu.range[0].min_top && obj.top < dragData.yingwu.range[0].max_top && obj.type == "end"){
                                
                                buildRobotInfo.robotArr.push(0);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_yw_1").css(dragData.yingwu.pos[0]);
                            }
                        }
                    });
                    
                    new Drag({
                        dragEle: "#drag_yw_2",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.yingwu.range[1].min_left && obj.left < dragData.yingwu.range[1].max_left && obj.top > dragData.yingwu.range[1].min_top && obj.top < dragData.yingwu.range[1].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(1);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_yw_2").css(dragData.yingwu.pos[1]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_yw_3",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.yingwu.range[2].min_left && obj.left < dragData.yingwu.range[2].max_left && obj.top > dragData.yingwu.range[2].min_top && obj.top < dragData.yingwu.range[2].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(2);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_yw_3").css(dragData.yingwu.pos[2]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_yw_4",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.yingwu.range[3].min_left && obj.left < dragData.yingwu.range[3].max_left && obj.top > dragData.yingwu.range[3].min_top && obj.top < dragData.yingwu.range[3].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(3);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_yw_4").css(dragData.yingwu.pos[3]);
                            }
                        }
                    });
                    new Drag({
                        dragEle: "#drag_yw_5",
                        targetEle: "#bigContainer",
                        ondrag: function (obj) {
                            console.log(obj);
                            if(obj.left > dragData.yingwu.range[4].min_left && obj.left < dragData.yingwu.range[4].max_left && obj.top > dragData.yingwu.range[4].min_top && obj.top < dragData.yingwu.range[4].max_top && obj.type == "end"){
                                buildRobotInfo.robotArr.push(4);
                                that.updateBig(buildRobotInfo);
                            }else{
                                $("#drag_yw_5").css(dragData.yingwu.pos[4]);
                            }
                        }
                    });
                });
                
            }
            
            $("#restart").click(function(){
                $(".bgImg").addClass("hidden");
                for(var i = 0; i < 6; i ++){
                    $("#drag_xb_"+i).removeClass("hidden");
                    $("#drag_yw_"+i).removeClass("hidden");
                    $("#drag_zhy_"+i).removeClass("hidden");
                }
                
            });
            $("#wakeUp").click(function(){
                if(that.checkBuilt(buildRobotInfo)){
                    that.program(obj,user);
                }else{
                    alert("您还有未完成的拼接组件哟");
                }
            });
        },
        updateBig:function(obj){
            if(obj.type == "lxp"){
                $(".bgImg").addClass("hidden");
                for(var i = 0; i < obj.robotArr.length; i ++){
                    var index = obj.robotArr[i]+1;
                    $(".bgImg").eq(obj.robotArr[i]).removeClass("hidden");
                    $("#drag_xb_"+index).addClass("hidden");
                }
            }else if(obj.type == "ly"){
                $(".bgImg").addClass("hidden");
                for(var i = 0; i < obj.robotArr.length; i ++){
                    var index = obj.robotArr[i]+1;
                    $(".bgImg").eq(obj.robotArr[i]).removeClass("hidden");
                    $("#drag_yw_"+index).addClass("hidden");
                }
            }
        },
        checkBuilt:function(obj){
            if(obj.type == "lxp"){
                if(obj.robotArr.length == 6){
                    return true;
                }
            }
            return false;
        },
        getPos:function(obj,type,callback){
            document.getElementById('mainImg').onload=(function(){
                var imgWidth = $("#mainImg").width();
                var imgHeight = $("#mainImg").height();
                var imgOffset = $("#mainImg").offset();
                var targetOffset = $("#comList").offset();
                var windowHeight = $(window).height();
                var windowWidth = $(window).width();
                if(type == "xingbao"){
                    // var targetOffset = [
                    //     $("#drag_xb_1").offset(),
                    //     $("#drag_xb_2").offset(),
                    //     $("#drag_xb_3").offset(),
                    //     $("#drag_xb_4").offset(),
                    //     $("#drag_xb_5").offset(),
                    //     $("#drag_xb_6").offset()
                    // ];
                    var posObj = [];
                    for(var i = 0; i < obj.xingbao.point.length; i ++){
                        var temp = {};
                        temp.min_left = imgWidth*obj.xingbao.point[i].minLeft + imgOffset.left - targetOffset.left;
                        temp.min_top = imgHeight*obj.xingbao.point[i].minTop + imgOffset.top - targetOffset.top;
                        temp.max_left = imgWidth*obj.xingbao.point[i].maxLeft + imgOffset.left - targetOffset.left;
                        temp.max_top = imgHeight*obj.xingbao.point[i].maxTop + imgOffset.top - targetOffset.top;
                        posObj.push(temp);
                    }
                    obj.xingbao.range = posObj;

                    console.log(posObj);
                }else if(type == "zhihuiyang"){
                    // var targetOffset = [
                    //     $("#drag_zhy_1").offset(),
                    //     $("#drag_zhy_2").offset(),
                    //     $("#drag_zhy_3").offset(),
                    //     $("#drag_zhy_4").offset()
                    // ];
                    var posObj = [];
                    for(var i = 0; i < obj.zhihuiyang.point.length; i ++){
                        var temp = {};
                        temp.min_left = imgWidth*obj.zhihuiyang.point[i].minLeft + imgOffset.left - targetOffset[i].left;
                        temp.min_top = imgHeight*obj.zhihuiyang.point[i].minTop + imgOffset.top - targetOffset[i].top;
                        temp.max_left = imgWidth*obj.zhihuiyang.point[i].maxLeft + imgOffset.left - targetOffset[i].left;
                        temp.max_top = imgHeight*obj.zhihuiyang.point[i].maxTop + imgOffset.top - targetOffset[i].top;
                        posObj.push(temp);
                    }
                    obj.zhihuiyang.range = posObj;
                }else{
                    var targetOffset = [
                        $("#drag_yw_1").offset(),
                        $("#drag_yw_2").offset(),
                        $("#drag_yw_3").offset(),
                        $("#drag_yw_4").offset(),
                        $("#drag_yw_5").offset()
                    ];
                    var posObj = [];
                    for(var i = 0; i < obj.yingwu.point.length; i ++){
                        var temp = {};
                        temp.min_left = imgWidth*obj.yingwu.point[i].minLeft + imgOffset.left - targetOffset[i].left;
                        temp.min_top = imgHeight*obj.yingwu.point[i].minTop + imgOffset.top - targetOffset[i].top;
                        temp.max_left = imgWidth*obj.yingwu.point[i].maxLeft + imgOffset.left - targetOffset[i].left;
                        temp.max_top = imgHeight*obj.yingwu.point[i].maxTop + imgOffset.top - targetOffset[i].top;
                        posObj.push(temp);
                    }
                    obj.yingwu.range = posObj;
                    console.log(posObj);
                }
                callback();
                

            });
            
        },
        program:function(obj,user){
            var that = this;
            obj.next();
            // 编程程序卸载这里
            var team = user.getInfo("team");
            var buildProgram = {};
            if(team == "lxp"){
                buildProgram.type = 'lxp';
                buildProgram.robotArr = [];
                $("#task").addClass("xingbao");
                $("#showResult").html('<img class="robot" id="robot" src="/image/program/xingbao/static.png" alt=""><img class="robotBottom" src="/image/program/robotBottom.png" alt="">');
                var programData = {
                    "xingbao":{
                        "pos":[
                            {
                                "top":"0px",
                                "left":"38%"
                            },
                            {
                                "top":"0px",
                                "left":"59%"
                            },
                            {
                                "top":"0px",
                                "left":"80%"
                            }
                        ],
                        "range":[
                            {
                                "min_left":"-133",
                                "max_left":"164",
                                "min_top":"60",
                                "max_top":"250"
                            },
                            {
                                "min_left":"-214",
                                "max_left":"84",
                                "min_top":"60",
                                "max_top":"250"
                            },
                            {
                                "min_left":"-300",
                                "max_left":"0",
                                "min_top":"60",
                                "max_top":"250"
                            },
                        ]
                    }
                };
                var com_str = "";
                var program_str = '<img class="instructionImg_bg" src="/image/program/xingbao/program_0.png" alt="">';
                for(var i = 0; i < 3; i ++){
                    com_str +='<img id="program_xb_'+i+'" style="top:0px;left:'+programData.xingbao.pos[i].left+'" src="/image/program/xingbao/com_'+i+'.png" alt="">';
                    program_str +='<img class="instructionImg hidden" src="/image/program/xingbao/program_'+(i+1)+'.png" alt="">';
                }
                $("#task").html(com_str);
                $("#instruction").html(program_str);
                new Drag({
                    dragEle: "#program_xb_0",
                    targetEle: "#instruction",
                    ondrag: function (obj) {
                        console.log(obj);
                        if(obj.left > programData.xingbao.range[0].min_left && obj.left < programData.xingbao.range[0].max_left && obj.top > programData.xingbao.range[0].min_top && obj.top < programData.xingbao.range[0].max_top && obj.type == "end"){
                            buildProgram.robotArr.push(0);
                            that.updateProgram(buildProgram);
                        }else{
                            $("#program_xb_0").css(programData.xingbao.pos[0]);
                        }
                    }
                });
                new Drag({
                    dragEle: "#program_xb_1",
                    targetEle: "#instruction",
                    ondrag: function (obj) {
                        console.log(obj);
                        if(obj.left > programData.xingbao.range[1].min_left && obj.left < programData.xingbao.range[1].max_left && obj.top > programData.xingbao.range[1].min_top && obj.top < programData.xingbao.range[1].max_top && obj.type == "end"){
                            buildProgram.robotArr.push(1);
                            that.updateProgram(buildProgram);
                        }else{
                            $("#program_xb_1").css(programData.xingbao.pos[1]);
                        }
                    }
                });
                new Drag({
                    dragEle: "#program_xb_2",
                    targetEle: "#instruction",
                    ondrag: function (obj) {
                        console.log(obj);
                        if(obj.left > programData.xingbao.range[2].min_left && obj.left < programData.xingbao.range[2].max_left && obj.top > programData.xingbao.range[2].min_top && obj.top < programData.xingbao.range[2].max_top && obj.type == "end"){
                            buildProgram.robotArr.push(2);
                            that.updateProgram(buildProgram);
                        }else{
                            $("#program_xb_2").css(programData.xingbao.pos[2]);
                        }
                    }
                });
            }
            $("#complete").click(function(){
                if(that.checkProgram(buildProgram)){
                    var timer = null;
                    if(buildProgram.type == "lxp"){
                        $("#robot").fadeOut(200,"swing",function(){
                            $(this).attr("src","/image/program/xingbao/dynamic.gif");
                            $(this).css("width","50%")
                            $("#robot").fadeIn(200,"swing");
                        });
                        
                    }
                    timer = setTimeout(function(){
                        that.joinTeam(obj,user);
                    },3000);
                    
                }else{
                    alert("程序还缺少步骤");
                }
                
            });
        },
        updateProgram:function(obj){
            if(obj.type == "lxp"){
                $(".instructionImg").addClass("hidden");
                for(var i = 0; i < obj.robotArr.length; i++){
                    $(".instructionImg").eq(obj.robotArr[i]).removeClass("hidden");
                    $("#program_xb_"+obj.robotArr[i]).addClass("hidden");
                }
            }
        },
        checkProgram:function(obj){
            if(obj.type == "lxp"){
                if(obj.robotArr.length == 3){
                    return true;
                }
            }
            return false;
        },
        joinTeam:function(obj,user){
            var that = this;
            obj.next();
            var info = user.getUserInfo();
            $("#headImg").attr("src",info.headImg);
            $("#name").html(info.name);
            $("#phone").click(function(){
                that.showTeam(obj,user);
            });
            $("#goGetIt").click(function(){
                alert("链接未给出");
            });
            
        },
        showTeam:function(obj,user){
            var that = this;
            obj.next();
            that.loadTotleTeam(user,function(data){
                var str = '';
                // for(var i = 0; i < data.length; i++){
                //     str +='<div class="team">\
                //                 <div class="robot">\
                //                     <img src="/image/share/'+data[i].team+'.png" alt="">\
                //                 </div>\
                //                 <div class="score">\
                //                     <img class="bar" src="/image/share/bar-'+(3-i)+'.png" alt="">\
                //                     <p class="teamGroup">'+data[i].teamName+'</p>\
                //                     <p class="scoreGroup">'+data[i].vote+'</p>\
                //                 </div>\
                //                 <div class="clearfix"></div>\
                //             </div>';
                // }
                // $("#teamContainer").html(str);
            });
        },
        loadTotleTeam:function(user,callback){
            // 此处调用接口并且返回组队数据，假设已经返回
            var data = [
                {
                    "team":"lzy",
                    "teamName":"智慧羊战队",
                    "vote":"2048",
                    "bar":"bar-3"
                },
                {
                    "team":"ly",
                    "teamName":"鹦鹉战队",
                    "vote":"1024",
                    "bar":"bar-2"
                },
                {
                    "team":"lxp",
                    "teamName":"星宝战队",
                    "vote":"512",
                    "bar":"bar-1"
                }
            ];
            callback(data);
        },
        generateInfo:function(){
            var userInfo = {};
            this.loadUserInfo(function(data){
                userInfo.name = data.nickname;
                userInfo.headImg = data.headimgurl;
            });
            return {
                isLoadEnd:function(){
                    if(JSON.stringify(userInfo) != "{}"){ 
                        return true;
                    }else{
                        return false;
                    }
                },
                insert:function(key,value){
                    if(key && value){
                        userInfo[key] = value;
                        return userInfo;
                    }else{
                        return false;
                    }
                    
                },
                getInfo:function(key){
                    return userInfo[key] || "";
                },
                getUserInfo:function(){
                    return userInfo;
                },
                clear:function(){
                    userInfo = {};
                }
            }
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
                "touchend":function(){
                    console.log(111);
                    $(".loadingImage").css("position","static");
                    $("#loading").animate({ 
                        top: "-100%",
                        opacity:"1"
                    }, 500 );
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
    {type: 'image', src: '/image/pinjie/xingbao/0.png'},
    {type: 'image', src: '/image/pinjie/xingbao/1.png'},
    {type: 'image', src: '/image/pinjie/xingbao/2.png'},
    {type: 'image', src: '/image/pinjie/xingbao/3.png'},
    {type: 'image', src: '/image/pinjie/xingbao/4.png'},
    {type: 'image', src: '/image/pinjie/xingbao/5.png'},
    {type: 'image', src: '/image/pinjie/xingbao/6.png'},
    {type: 'image', src: '/image/pinjie/xingbao/com/com_xb_1.png'},
    {type: 'image', src: '/image/pinjie/xingbao/com/com_xb_2.png'},
    {type: 'image', src: '/image/pinjie/xingbao/com/com_xb_3.png'},
    {type: 'image', src: '/image/pinjie/xingbao/com/com_xb_4.png'},
    {type: 'image', src: '/image/pinjie/xingbao/com/com_xb_5.png'},
    {type: 'image', src: '/image/pinjie/xingbao/com/com_xb_6.png'},
    {type: 'audio', src: '/audio/bgmusic.mp3'},
    
];
document.addEventListener('DOMContentLoaded',function () {
    loading.load();
},false);
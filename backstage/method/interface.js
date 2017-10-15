module.exports = function(app){
    var mongo = require("./conf");
    // 加入战队
    app.post('/api/joinTeam', function (req, res) {
        var obj = req.body;
        
        mongo().insert(obj,function(status){
            // console.log(status);
            var result = {
                "status":500,
                "msg":"error"
            };
            if(status.status == true){
                result.status = 200;
                result.msg = status.msg;
                result.data = "";
                mongo().count(function(msg){
                    if(msg.status){
                        result.data = msg.data;
                    }
                    res.send(result);
                });
            }else{
                
                if(status.code == "11000" && status.msg.split(" ")[7] == "userId_1"){
                    result.status = 500;
                    result.msg = "您已经参加过活动了";
                }else if(status.code == "11000" && status.msg.split(" ")[7] == "phone_1"){
                    result.status = 501;
                    result.msg = "该手机号已重复";
                }
                res.send(result);
            }
            
        });
        
            
    });
    app.post('/api/quitTeam', function (req, res) {
        var obj = req.body;
        
        mongo().delete(obj,function(status){
            // console.log(status);
            var result = {
                "status":500,
                "msg":"error"
            };
            if(status.status == true){
                result.status = 200;
                result.msg = status.msg;
            }else{
                result.msg = status.msg;
                // if(status.code == "11000" && status.msg.split(" ")[7] == "userId_1"){
                //     result.status = 500;
                //     result.msg = "您已经参加过活动了";
                // }else if(status.code == "11000" && status.msg.split(" ")[7] == "phone_1"){
                //     result.status = 501;
                //     result.msg = "该手机号已重复";
                // }
            }
            res.send(result);
        });
        
            
    });
}
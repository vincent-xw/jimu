module.exports = function(){
    var MongoClient = require('mongodb').MongoClient,
        f = require('util').format,
        assert = require('assert');
    var user = encodeURIComponent('xuewen');
    var password = encodeURIComponent('abc456');
    var authMechanism = 'DEFAULT';

    // Connection URL
    var url = f('mongodb://%s:%s@localhost:12345/jimu?authMechanism=%s',user, password, authMechanism);

    return {
        coon:function(){
           
            // Use connect method to connect to the Server
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("连接成功");
        
                db.close();
            });
        },
        insert:function(obj,callback){
            
            // Use connect method to connect to the Server
            return MongoClient.connect(url, function(err, db) {
                var collection = db.collection("userInfo");
                assert.equal(null, err);
                collection.insert(obj, function(err, result) { 
                    if(err){
                        db.close();
                        var errMsg = {
                            status : false,
                            code:err.toJSON().code,
                            msg:err.message
                        };
                        callback(errMsg);
                    }else{
                        db.close();
                        var successMsg = {
                            status : true,
                            msg:"success"
                        };
                        callback(successMsg);
                    }    
                });
                
            });
        },
        delete:function(obj,callback){
            return MongoClient.connect(url, function(err, db) {
                var collection = db.collection("userInfo");
                assert.equal(null, err);
                var whereStr = {}
                collection.remove(obj,1, function(err, result) { 
                    if(err){
                        db.close();
                        var errMsg = {
                            status : false,
                            code:err.toJSON().code,
                            msg:err.message
                        };
                        callback(errMsg);
                    }else{
                        db.close();
                        console.log(result.result);
                        if(result.result.n == 1){
                            var successMsg = {
                                status : true,
                                msg:"success"
                            };
                        }else{
                            var successMsg = {
                                status : true,
                                msg:"no remove"
                            };
                        }
                        
                        callback(successMsg);
                    }    
                });
            
            });
        },
        count:function(callback){
            return MongoClient.connect(url, function(err, db) {
                var collection = db.collection("userInfo");
                assert.equal(null, err);
                var whereStr = {}
                var obj = [{ $group: { "_id":{ "team":"$team"}, "count": { $sum: 1 } }},{"$sort": {"count": -1}} ];
                collection.aggregate(obj, function(err, result) { 
                    if(err){
                        db.close();
                        var errMsg = {
                            status : false,
                            code:err.toJSON().code,
                            msg:err.message
                        };
                        callback(errMsg);
                    }else{
                        db.close();
                        var successMsg = {
                                status : true,
                                data:result,
                                msg:"success"
                            };
                        callback(successMsg);
                    }    
                });
            
            });
        }
    };
    
}

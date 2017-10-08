module.exports = function(){
    var MongoClient = require('mongodb').MongoClient,
        f = require('util').format,
        assert = require('assert');
    var user = encodeURIComponent('xuewen');
    var password = encodeURIComponent('abc456');
    var authMechanism = 'DEFAULT';

// Connection URL
var url = f('mongodb://%s:%s@localhost:12345/jimu?authMechanism=%s',
user, password, authMechanism);

    return {
        coon:function(){
           
            // Use connect method to connect to the Server
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("连接成功");
        
                db.close();
            });
        },
        insert:function(obj){
            
            // Use connect method to connect to the Server
            MongoClient.connect(url, function(err, db) {
                var collection = db.collection("userInfo");
                assert.equal(null, err);
                collection.insert(obj, function(err, result) { 
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }     
                    console.log(result);
                    db.close();
                });
            });
        }
    };
    
}

module.exports = function(){
    var MongoClient = require('mongodb').MongoClient,
        f = require('util').format,
        assert = require('assert');
    var user = encodeURIComponent('xuewen');
    var password = encodeURIComponent('abc456');
    var authMechanism = 'DEFAULT';

    // Connection URL
    var url = f('mongodb://%s:%s@localhost:12345/admin?authMechanism=%s',
    user, password, authMechanism);

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("连接成功");

        db.close();
    });
}

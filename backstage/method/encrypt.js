module.exports = function(){
    console.log("222");
    let crypto = require('crypto');
    let buffer = "pwd2017";
    return {
        //加密
        cipher:function(key){
            var encrypted = "";
            var cip = crypto.createCipher('aes-256-cbc', buffer);
            encrypted += cip.update(key,'utf8', 'hex');
            encrypted += cip.final('hex');
            console.log(encrypted);
            return encrypted;
        },
        // 解密
        decipher : function(key){
            var dec = "";
            var decipher = crypto.createDecipher('aes-256-cbc',buffer)
            var dec = decipher.update(key,'hex','utf8');
            dec += decipher.final('utf8');
            console.log(dec);            
        }
    };
}


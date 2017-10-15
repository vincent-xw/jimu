module.exports = function(app){
    // router
    app.get('/', function (req, res){
        res.render('index');
    });
    app.get('*', function(req, res){
    res.render('404',{'data':{"bgimg":"404.jpg"}});
    });
}
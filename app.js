var express=require('express');
var app=express();

var routes=require('./routes/route.js');

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.get('/',routes.home);
app.get('/:category',routes.category);

var port = process.env.PORT || 8080;

var server=app.listen(port,function(req,res){
    console.log("Server running at port:"+port);
});

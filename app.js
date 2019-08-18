var express = require('express');
var app = express();
var request = require('request');

app.set("view engine",'ejs');

app.get("/",function(req,res){
    res.render('search');
});
app.get('/results',function(req,res){
    var valueName = req.query.nameValue;
    var apiUrl = 'http://www.omdbapi.com/?s='+valueName+'&apikey=thewdb'
    request(apiUrl,function(error, response, body){
        if(error){
            console.log('something went wrong');
            console.log(error);
        }else{
            if(response.statusCode == 200){
                var result = JSON.parse(body);
                res.render("results",{result:result});
            }
        }
    });
});
app.listen(8080, process.env.IP, function(){
    console.log('server has started');
});
var express = require("express");
var app= express();

app.get("/",function(req,res){
    res.send("Hi there!");
})


app.get("/bye",function(req,res){
    res.send("goodbye!!");
})

app.get("/dog",function(req,res){
    res.send("MEOW!!");
})

app.get("/r/:subName",function(req,res){
    var sub= req.params.subName;
    res.send("welcome to the " + sub + " subreddit");
})

app.get("*",function(req,res){
    res.send("you are a star");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
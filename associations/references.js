var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/blog_dem0_2");



var PostModel= require("./models/post");
var User= require("./models/user");

PostModel.create({
    title:"how to cook a fahjta pt.3",
    content:"like mexicans do   mkkkk"
},function(err,post){
    User.findOne({name: "ram syam"}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                }
            })
        }
    })
} );


User.findOne({name:"ram syam"}).populate("posts").exec(function(err,user){
if(err){
    console.log(err);
}
else{
    console.log(user);
}
    
})









var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var PostModel = mongoose.model("Post", postSchema)

var userSchema= new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});

var User = mongoose.model("User",userSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just kidding.  Go to potions class to learn it!"
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });



// var newUser= new User({
//     email:"charlie@brown.edu",
//     name:"charlie brown"
// });

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(user);
//     }
// });


// var newPost = new PostModel({
//     title:"reflection of apple",
//     content:"they look lile bums"
// }) 

// newPost.save(function(err, post){
//      if(err){
//         console.log(err);
//     }
//     else{
//         console.log(post);
//     }
// });




User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort.  Voldemort. Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});














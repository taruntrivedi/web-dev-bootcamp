var express = require("express"),
mongoose= require("mongoose"),
expressSanitizer= require("express-sanitizer"),
methodOverride = require("method-override"),
bodyparser = require("body-parser"),
app= express();


//app config
mongoose.connect("mongodb://localhost/blogapp");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//schema config
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body: String,
    created:{type:Date, default:Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful routes config

// Blog.create({
//     title:"Test blog",
//     image:"https://i.pinimg.com/736x/fc/fb/8c/fcfb8cb716f1e46cde5f4bd33504d6f4--instagram-design-crazy-dog-lady.jpg",
//     body:"hello this is a blog post"
// });

app.get("/", function(req,res){
    res.redirect("/blogs");
});


app.get("/blogs", function(req,res){
   Blog.find({}, function(err,blogs){
       if(err){
           console.log("ERROR!");
       }
       else{
           res.render("index",{blogs:blogs});
       }
   }) ;
});


//new route
app.get("/blogs/new", function(req,res){
    res.render("new");
})

//create route
app.post("/blogs" , function(req,res){
    
    req.body.blog.body= req.sanitize( req.body.blog.body)
    Blog.create(req.body.blog, function(err,newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog:foundBlog});
        }
    });
});

//edit route

app.get("/blogs/:id/edit", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       }
       else{
           res.render("edit",{blog: foundBlog});
       }
       
   });
});


//update route

app.put("/blogs/:id", function(req,res){
        req.body.blog.body= req.sanitize( req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
    
});

//delete route

app.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/blogs");
          
      }
      else{
          res.redirect("/blogs");
          
      }
  })
  
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running");
})
var express = require ("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var bodyParser= require("body-parser");


var Campground= require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

//seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));


//  Campground.create(
//          {name:"jodhpur", 
//           image:"https://media-cdn.tripadvisor.com/media/photo-s/11/8b/92/de/delhi-jaipur-private.jpg",
//           description:"hot, royal and cultured. birth place of jodha and mirchibadas"
//          }, function(err,campground){
//          if(err){
//              console.log(err);
//          }
//          else{
//              console.log("newly created campground:");
//              console.log(campground);
//          }
//      }
//      );



app.set("view engine","ejs");

app.get("/",function(req,res){
   res.render("landing") 
});

app.get("/campgrounds",function(req,res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    })
    
});


app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc =  req.body.description;
    var newCampground={name:name,image:image , description:desc};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else
        {
          res.redirect("/campgrounds");  
        }
    }
        );
    
     
});

app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new")
})

//show particular campground with more details
app.get("/campgrounds/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
            
        }
        else{
            res.render("campgrounds/show",{campground:foundCampground});
            
        }
        
    });
});

//====================comments routes====================

app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
            
        }
    })
})


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp server has started")
});
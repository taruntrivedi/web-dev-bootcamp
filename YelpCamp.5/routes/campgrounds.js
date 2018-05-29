var  express = require("express"),
    router  = express.Router(),
    Campground= require("../models/campground"),
    Comment= require("../models/comment")



router.get("/campgrounds",function(req,res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser:req.user});
        }
    })
    
});


router.post("/campgrounds", isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc =  req.body.description;
    var author= {
        id : req.user._id,
        
        username:req.user.username 
    };
    var newCampground={name:name,image:image , description:desc, author:author};
    
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

router.get("/campgrounds/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new")
})

//show particular campground with more detail

router.get("/campgrounds/:id", function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
            
        }
        else{
            res.render("campgrounds/show",{campground:foundCampground});
            
        }
        
    });
});


function isLoggedIn(req,res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
    
};


module.exports = router;
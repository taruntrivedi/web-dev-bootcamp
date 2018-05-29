var  express = require("express"),
    router  = express.Router(),
    Campground= require("../models/campground"),
    Comment= require("../models/comment"),
    middleware= require("../middleware/index.js")
    
    

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


router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
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

router.get("/campgrounds/new",  middleware.isLoggedIn, function(req,res){
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

//edit campground route

router.get("/campgrounds/:id/edit",  middleware.checkCampgroundOwnership, function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else
        {
            res.render("campgrounds/edit", {campground:foundCampground});
        }
    });
});


//update campground route
router.put("/campgrounds/:id",  middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//destroy campground route


router.delete("/campgrounds/:id",  middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      }
      else{
          res.redirect("/campgrounds");
      }
  })
});




module.exports = router;
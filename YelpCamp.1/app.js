var express = require ("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//schema setup

var campgroundSchema = new mongoose.Schema({
    name : String,
    image :String,
    description:String
});

 var Campground= mongoose.model("Campground", campgroundSchema);

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
            res.render("index", {campgrounds:allcampgrounds});
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
    res.render("new")
})

//show particular campground with more details
app.get("/campgrounds/:id", function(req,res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            
        }
        else{
            res.render("show",{campground:foundCampground});
            
        }
        
    });
});

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp server has started")
});
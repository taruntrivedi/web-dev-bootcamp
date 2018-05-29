var express = require ("express"),
     app = express()

var commentRoutes = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexroutes = require("./routes/index");


var mongoose = require("mongoose");
var passport= require("passport");
var flash = require("connect-flash");
var LocalStrategy = require ("passport-local");
mongoose.connect("mongodb://localhost/yelp_camp");
var bodyParser= require("body-parser");
var methodOverride = require("method-override");

var User = require("./models/user");
var Campground= require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

//seedDB();


//passport configuration

app.use(require("express-session")({
    secret: "rama rama kya hain ye drama",
    resave:false,
    saveUninitialized: false
}));


app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
    
});






app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));



app.set("view engine","ejs");

app.use(indexroutes);
app.use(campgroundRoutes);
app.use(commentRoutes);




app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The YelpCamp server has started")
});
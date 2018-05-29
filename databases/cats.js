var mongoose= require ("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema= new mongoose.Schema({
   name: String,
   age : Number,
   temperament:String
});

var Cat= mongoose.model("Cat", catSchema);

var george=new Cat({
    name:"norris",
    age:11,
    temperament:"cute"
});

george.save(function(err, cat){
    if(err){
        console.log("something went wrong")
        
    }
    else{
        console.log("we just saved a cat to the DB")
        console.log(cat);
    }
})


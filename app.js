var express         = require("express"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    expressSession  = require("express-session"),
    methodOverride  = require("method-override"),
    User            = require("./models/userModel"),
    Blog            = require("./models/blogModel"),
    bodyParser      = require("body-parser"),
    app             = express();

    // var data = {
    //     title:"Test Title"
    // }

//Routes Requiring
var siteRoutes = require('./routes/siteRoutes'),
    blogRoutes = require('./routes/blogRoutes'),
    adminRoutes = require('./routes/adminRoutes');


// AppConfig
mongoose.connect("mongodb://localhost/MyBlogApp");
app.set('view engine','ejs');   
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Passport Config
app.use(require("express-session")({
    secret:"this is our secret sentence",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Share current user info within all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes Usage
app.use(siteRoutes);
app.use(blogRoutes);
app.use(adminRoutes);

//deneme yapiyoruz...

var server = app.listen(3000, function(err){
    if(err){
        console.log(err);
    }
    console.log('App Started. Port Number: 3000');
});
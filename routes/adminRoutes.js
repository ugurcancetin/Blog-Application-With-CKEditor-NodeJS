var express         = require('express'),
    passport        = require('passport'),
    Blog            = require("../models/blogModel"),
    User            = require("../models/userModel"),
    router          = express.Router();

router.get("/signup",isLoggedIn, function(req, res){
    res.render("signup");
});

router.post("/signup",isLoggedIn, function(req, res){
    // console.log(req.body)
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, newCreatedUser){
        if(err){
            console.log(err);
            res.redirect("/signup");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

router.get("/signin", function(req, res){
    res.render("signin");
});

router.post("/signin", passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/signin"
    }), function(res, req){
});


router.get("/signout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;
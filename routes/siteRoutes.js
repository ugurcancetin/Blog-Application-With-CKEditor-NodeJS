var express         = require('express'),
    Blog            = require("../models/blogModel"),
    router          = express.Router();

// Routes
router.get("/", function(req, res){
    Blog.find({},function(err, posts){
        if(err){
            console.log("======================= ERROR ===========================");
            console.log(err);
        } else {
            res.render("home",{posts:posts});
        }
    })
    
});

router.get("/about", function(req, res){
    res.render("about");
});

router.get("/contact", function(req, res){
    res.render("contact");
});

module.exports = router;
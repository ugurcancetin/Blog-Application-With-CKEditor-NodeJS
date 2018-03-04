var express         = require('express'),
    Blog            = require("../models/blogModel"),
    router          = express.Router();


router.get("/addnewblog", isLoggedIn,  function(req, res){
    res.render("addNewBlog");
});


router.post("/addnewblog", isLoggedIn, function(req, res){
    var title = req.body.data.blogTitle;
    var subTitle = req.body.data.blogSubTitle;
    var comImage = req.body.data.comImage;
    var blog = req.body.data.blog;

    var newBlog = { title:title, subTitle:subTitle, comImage:comImage, blog:blog }

    Blog.create(newBlog)
    .then(function(newAddedBlog){
        console.log(newAddedBlog);
        res.status(201).json(newAddedBlog);
    })
    .catch(function(err){
        console.log("======================= ERROR ===========================");
        console.log(err);
        res.send(err);
    })

});

router.get("/blogs/:blogId", function(req,res){
    console.log(req.params.blogId);

    Blog.findById(req.params.blogId)
    .then(function(foundBlog){
        res.render("blog",{foundBlog:foundBlog});
    })
    .catch(function(err){
        console.log(err);
        res.send(err);
    })
});

router.delete("/blogs/:blogId", isLoggedIn, function(req, res){
    Blog.findByIdAndRemove(req.params.blogId, function(err){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

router.get("/blogs/:blogId/edit",isLoggedIn,function(req, res){
    Blog.findById(req.params.blogId, function(err, foundBlog){
        if(err) throw err;
        res.render("updateBlog", {foundBlog:foundBlog});
    });
});

router.put("/blogs/:blogId",isLoggedIn, function(req, res){
    console.log("============================================================");
    console.log("============================================================");
    console.log("============================================================");
    console.log("============================================================");
    console.log(req.body);
    Blog.findByIdAndUpdate(req.params.blogId, req.body, function(err, blog){
        if(err) throw err;
    });
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;
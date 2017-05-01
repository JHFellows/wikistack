const express = require("express");
const router = express.Router();
var models = require("../models");
var Page = models.Page;
var User = models.User;
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false })); // for HTML form submits
router.use(bodyParser.json()); // would be for AJAX requests

router.get("/",function(req,res,next){
            //relative path /wiki/
  res.redirect('/');

});
router.post("/",function(req,res,next){
  var page = Page.build({
    title: req.body.title,
    content: req.body.text
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  var save = page.save()._boundTo;
  res.json(save);
});
router.get("/add",function(req,res,next){
            //relative path /wiki/add/

  res.render("addpage");      //HOW DID THIS HAPPEN?? addpage not defined anywhere
});

// search for attributes
//Project.findOne({ where: {title: 'aProject'} }).then(function(project) {
  // project will be the first entry of the Projects table with the title 'aProject' || null
router.get("/:urlTitle",function(req,res,next){
  var title = req.params.urlTitle;
    Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function(foundPage){
      res.json(foundPage);
    })
    .catch(next);
})


module.exports = router;

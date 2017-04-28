const express = require("express");
const router = express.Router();

router.get('/',function(req,res,next){
  console.log("hiii")
  res.send('index')
})


module.exports = router;

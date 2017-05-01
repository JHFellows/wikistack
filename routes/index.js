const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const wikiRouter = require("./wiki");
//routers are middleware
router.use("/wiki",wikiRouter);
router.use("/user",userRouter);

router.get('/',function(req,res,next){
  console.log("hiii")
  res.send('homepage')
})


module.exports = router;

const express = require('express')
const router = express.Router();
const {validateAdmin} = require("../middelwares/admin")
const {categoryModel} = require("../models/category")

router.post("/create", validateAdmin, async function(req,res){
   let category =  await categoryModel.create({name: req.body.name});
   res.redirect("back")
})

module.exports = router
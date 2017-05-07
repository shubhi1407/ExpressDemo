var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  res.send('All Machines');
})

router.get('/report',function(req,res){
  res.send('report for machine');
})

module.exports = router

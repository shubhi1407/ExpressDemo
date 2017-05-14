var express = require('express');
var router = express.Router();
 var db = require('./db');

router.get('/',function(req,res){
  var collection = db.get().collection('Machines');
  collection.find().toArray(function(err,docs){
    docs.forEach(function(machine){
      machine.name = machine.name.charAt(0).toUpperCase() + machine.name.slice(1);
    })
    res.json({response : docs})
  })
})

router.post('/:id/report',function(req,res){
  var machine_id = req.params.id;
    var collection = db.get().collection('Reports');
    var report = req.body;
    report.machine_id = req.params.id;
    report.createdAt = new Date();
    collection.insertOne(report,function(err,result){
      if(err)
          res.json(err);
      else if(result.insertedCount>0){
        res.json(report);
      }
      else {
        res.json({err:"Some error occured"})
      }
    })

})

router.get('/:id/lastfourreport',function(req,res){
  var machineId=req.params.id;
    var collection = db.get().collection('Reports');
    collection.find({machine_id:machineId}).sort({createdAt:1}).limit(4).toArray(function(err,docs){
    if(err){
      res.json(err);
    }else{
      res.json(docs);
    }
    });
})

router.get('/:id/questions',function(req,res){
  var machine_id = req.params.id;
  var collection = db.get().collection('Questions');
  collection.find().toArray(function(err,docs){
    res.json({response:docs});
  })
})
module.exports = router

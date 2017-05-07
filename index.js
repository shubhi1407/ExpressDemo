var express = require('express'),
bodyParser = require('body-parser');
var app = express();

var db = require('./app/db')

var machine = require('./app/machine');

var mongodb = require('mongodb').MongoClient
,assert= require('assert');
var tataurl ='mongodb://shubhi1407:Doodle%40123@cluster0-shard-00-00-wjeh9.mongodb.net:27017,cluster0-shard-00-01-wjeh9.mongodb.net:27017,cluster0-shard-00-02-wjeh9.mongodb.net:27017/tata?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

db.connect(tataurl,function(err){
  if(err)
  console.log('Error while connection to database');
  else {
    app.listen(3000,function(err){
      if(err)
      console.log('not able to listen');
      else {
        console.log('listening in port 3000');
      }
    })
  }
})
app.use(bodyParser.json());
app.use('/machine', machine);
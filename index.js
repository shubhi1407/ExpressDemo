var express = require('express'),
bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var db = require('./app/db')

var machine = require('./app/machine');

var mongodb = require('mongodb').MongoClient
,assert= require('assert');

var node_xj = require("xls-to-json");



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
        // node_xj({
        //   input: "D:/NodeTestProj/Parameter and Equiment.xlsx",  // input xls
        //   output: "D:/NodeTestProj/Output.json", // output json
        //   sheet: "Sheet2"  // specific sheetname
        // }, function(err, result) {
        //   if(err) {
        //     console.error(err);
        //   } else {
        //
        //     var machines = _.map(result,function(item){
        //       return {name:item["List OF EQ"]}
        //     })
        //     //console.log(questions);
        //     var col = db.get().collection('Machines');
            // col.insertMany(machines, function(err, r) {
            //
            //  });
          }
        });
      }
    })
  

app.use(bodyParser.json());
app.use(function(req, res, next) {
    console.log("New incoming request");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/machine', machine);

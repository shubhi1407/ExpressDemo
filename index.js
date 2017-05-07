var express = require("express");
var request = require('request');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', function (req, res) {
    res.json({
        name: 'Vaibhav is my teacher'
    });
})

app.get('/twitter',function(req,res){
    console.log(req.query)
    var options={
    url:'https://api.twitter.com/1.1/search/tweets.json?q=%23'+req.query.hashtag + '&result_type=recent',
        method :"GET",
        headers:{'Authorization': 'Bearer '+ app.twitterToken}
        
    }
    if(req.query.hashtag){
    request(options,function(error, response, body){
         if(error){
             res.send(error);
            console.log(error)//Print error
        }
         if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body)); // Print the google web page.

        }
    })
    }
    else
        res.send("please send hastag");
            
            
})

app.listen(9000, function () {
    console.log('app is running');
    var options = {
        url: 'https://api.twitter.com/oauth2/token',
        method: 'POST',
        useQuerystring :false,
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',

    'Authorization': 'Basic ' + new Buffer("6z7uz6HGOdlm0xp7TgYxLYc7O:poQ41r4AcCPcYxk1lJH188WIQfPLER4hByON2rbgsNcACIWuTR").toString('base64')
        },
        form: {
            'grant_type': 'client_credentials'
        }
    }

    //getting twitter token
    request(options, function (error, response, body) {
        if(error){
            console.log(error)//Print error
        }
        if (!error && response.statusCode == 200) {
            console.log('Fetched twitter token',JSON.parse(body).access_token); // Print the google web page.
            app.twitterToken = JSON.parse(body).access_token;
        }
    })
})

// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();

const fetch = require("node-fetch");

// import * as fetch from "node-fetch";

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging

app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
});

app.use(express.json());
// app.use(express.text());


// No static server or /public because this server
// is only for AJAX requests


app.get("/reply_frontend", function(req, res, next){
  res.send({message: "sup frontend wyd"});
});


app.post("/getChartData", function(req, res, next){

  let queryString = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO&SensorNums=15&dur_code=M&Start=${req.body.startDate}&End=${req.body.endDate}`;

  fetch(queryString)
    .then( async resp=>{
      resp = await resp.json();
      res.json(resp);
    })
    .catch((err) => {
      res.json(err);
    })

});


// respond to all AJAX querires with this message
app.use(function(req, res, next) {
  res.json({msg: "No such AJAX request"})
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(6005, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

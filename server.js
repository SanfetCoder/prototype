const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Tell app to use static
app.use(express.static("public"));
// Tell app to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

// When the user sent a form
app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const email = req.body.email;
  const country = req.body.country;
  const mobileNo = req.body.mobileNo;
  const startingDate = req.body.departDate;
  const endingDate = req.body.arriveDate;

  // Define the data structure to upload to mailchimp
  var dataSchema = {
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields : {
        EMAIL : email,
        PHONE : mobileNo,
        FNAME : firstName,
        LNAME : surname,
        COUNTRY : country,
        SDATE : startingDate,
        EDATE : endingDate
        }
      }
    ]
  };

  // Convert from Javascript Object to Javascript Orient3d Notation (JSON)
  const jsonData = JSON.stringify(dataSchema);

  // The url for mailchimp admin
  const url = 'https://us21.api.mailchimp.com/3.0/lists/68180a79fe';

  // Options for settings of html request
  const options = {
    // By using post, we are trying to uplaod the data to the server
    method : "POST",
    auth: "sanphet2:bb70802716c22e4a3391db6b24c34af9-us21"
  }

  // Use hhtps protol to request to post to the designated url
  // By using https.request() it allows us to more flexible request. Because you can specify more options
  // such as method or auth
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data))
    });
  });
  
  request.write(jsonData);

  request.end();

});

app.listen(port, function(req,res){
  console.log("Just started the server at port " + port);
})
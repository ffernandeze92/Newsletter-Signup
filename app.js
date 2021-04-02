
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
      members : [
        {
          email_address:email,
          status:"subscribed",
          marge_fields:{
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
  };

  console.log(firstName,lastName,email);
  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/70cd20380b";

  const options = {
        method: "POST",
        auth: "Fernando1:7db10a014a55951ec349ec85068c85f0-us1"
    }

const request = https.request(url,options,function(response){
      response.on("data",function(data){
        console.log(JSON.parse(data));
      });
  })

  request.write(jsonData);

  console.log("llego hasta aquí")

  request.end();
  console.log("END")

});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});

//API KEY
//7db10a014a55951ec349ec85068c85f0-us1
//listId

//70cd20380b

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });



const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article",articleSchema)


app.get("/articles", async (req,res)=>{
   
        try{
            const foundArticles = await Article.find();
            console.log(foundArticles);
            res.send(foundArticles)
        }
        catch{
            res.send("There is an error")
        }
        
    });
    app.post("/articles", async (req,res)=>{
        try{
           console.log(req.body.title);
            console.log(req.body.content);
            //Dont have any html,ejs,form data.So,post this data to postman and enter key value.
            //Then send the data from postman
            const newArrticle =  new Article({
                title: req.body.title,
                content: req.body.content
            });
          await newArrticle.save()
            res.send("Seccessfully saved")//display the message to the sender.
        }
        catch{
            console.log("Error");
        }
    });




app.listen(3000,()=>{
    console.log("Server Started On Port 3000")
})

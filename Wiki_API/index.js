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
//chained method
app.route("/articles").get(async (req,res)=>{
   
    try{
        const foundArticles = await Article.find();
        console.log(foundArticles);
        res.send(foundArticles)
    }
    catch{
        res.send("There is an error")
    }
    
})

app.route("/articles")
    .post(async (req, res) => {
        try {
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });
            await newArticle.save();
            res.send("Successfully saved");
        } catch (error) {
            console.error("Error saving article:", error);
            res.status(500).send("Error saving article");
        }
    })
app.route("/articles")
    .post(async (req, res) => {
        try {
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });
            await newArticle.save();
            console.log(newArticle.save());
            res.send("Successfully saved");
           
        } catch (error) {
            console.error("Error saving article:", error);
            res.status(500).send("Error saving article");
        }
    })

.delete(async (req, res) => {
    try {
        const result = await Article.deleteMany({});
        try{
            await res.send("Successfully Deleted");
        } catch {
            res.send("No articles found to delete");
        }
    } catch  {
        res.send("error");
    }
})
//bcz of chained rule we will not use app.get or post or anything. we will use app.route.
app.route("/articles/:articleTitle")

.get(async (req,res)=>{

    try{
       const foundArticle =  await Article.findOne({title:req.params.articleTitle});
        try{
            await res.send(foundArticle);
        }
        catch{
            res.send("error");
        }
    }
    catch{
        res.send("Found Error");
    }
})

.put(async (req, res) => {
    try {
        await Article.updateOne(
            { title: req.params.articleTitle },
          {$set:  { title: req.body.title, content: req.body.content }}, 
            { overwrite: true }
        );
        res.send("Successfully updated");
    } catch{
        // console.error("Error updating article:", error);
        res.send("Error updating article");
    }
})
// we can update a single thing in PUT.
.patch( async (req,res)=>{
            try {
                await Article.updateOne(
                    { title: req.params.articleTitle },
                  {$set:  { title: req.body.title, content: req.body.content }}, 
                    { overwrite: true }
                );
                res.send("Successfully updated");
            } catch{
            res.send("error");
        }
})
.delete(async (req, res) => {
    try {
        await Article.deleteOne({ title: req.params.articleTitle });
        res.send("Successfully Deleted");
    } catch (error) {
        res.status(500).send("Error deleting article");
    }
});

//get
// app.get("/articles", );
    //post
    // app.post("/articles", );

    //delete
    // app.delete("/articles", );
    
    
app.listen(3000,()=>{
    console.log("Server Started On Port 3000")
})

//if we have space between the title then instead of space use %20 bcz value of space in UTF-8 :- %20

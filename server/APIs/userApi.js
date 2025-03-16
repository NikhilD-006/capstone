const exp=require('express')
const userApp=exp.Router();
const UserAuthor=require("../models/userAuthorModel")
const expressAsyncHandler=require("express-async-handler");
const createUserOrAuthor=require("./createUserOrAuthor");
const Article=require("../models/articleModel")

//API

//create new user
userApp.post("/user",expressAsyncHandler(createUserOrAuthor))

//add comment
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    console.log(commentObj,req.params.articleId)
    //add commnetObj to comments array of article
   const articleWithComments= await Article.findOneAndUpdate(
        { articleId:req.params.articleId},
        { $push:{ comments:commentObj}},
        {returnOriginal:false})

        console.log(articleWithComments)
    //send res
    res.status(200).send({message:"comment added",payload:articleWithComments})

}))
// Get all articles
userApp.get("/articles", expressAsyncHandler(async (req, res) => {
    try {
        const articles = await Article.find(); // Fetch all articles from MongoDB
        res.status(200).json({ message: "Articles fetched successfully", payload: articles });
    } catch (error) {
        res.status(500).json({ message: "Error fetching articles", error: error.message });
    }
}));

module.exports=userApp;
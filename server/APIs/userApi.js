const exp=require('express')
const userApp=exp.Router();
const UserAuthor=require("../models/userAuthorModel")

//API
userApp.get("/users",async(req,res)=>{
    //get user
    let usersList=await UserAuthor.find();
    res.send({message:"users",payload:usersList})
})

module.exports=userApp;
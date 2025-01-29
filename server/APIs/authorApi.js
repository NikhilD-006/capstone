const exp=require('express')
const authorApp=exp.Router();

//API
authorApp.get("/",(req,res)=>{
    res.send({message:"from author api"})
})

module.exports=authorApp;
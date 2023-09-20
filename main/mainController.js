const jwt =require('jsonwebtoken');
const {task}=require('./mainModel');
const {userModel}=require('../users/usersModel');


exports.allTasksHandler=async function(req, res) {
    console.log("all tasks");
    const author=await userModel.findOne({email:req.user.email});
    const query=await task.find({author:author._id});
  res.json(query);
}

exports.newTaskHandler=async function(req, res){
    try{
      const author=await userModel.findOne({email:req.user.email});
      const t=new task({
        title:req.body.title,
        author:author._id,
        body:req.body.body
      });
      await t.save();
      res.status(200).json(t);
    }
    catch(err){
      res.status(401).send("Task creation failed");
    }
}


exports.taskDoneHandler=async function(req,res){
  const taskid=req.params.taskid;
  try{
    const author=await userModel.findOne({email:req.user.email});
    let query = await task.findOne({_id:taskid,author:author});
    if(query!==null){
      const date =new Date();
      await query.updateOne({enddate:date,status:true});
      query = await task.findOne({_id:taskid,author:author});
      res.status(200).send(query);
    }
    else{
      res.status(404).send("Task not found");
    }
  }catch(err){
    res.status(404).json(err);
    console.error(err);
  }
}

exports.taskDetailHandler=async function(req, res){
    const taskid=req.params.taskid;
    try{
      const author=await userModel.findOne({email:req.user.email});
      const query = await task.findOne({_id:taskid,author:author});
      console.log(query);
      if(query!==null){
        res.status(200).json(query);
      }
      else{
        res.status(404).send("Task not found");
      }
    }catch(err){
      res.status(404).send("Task not found");
      console.error(err);
    }
}


exports.authenticateHandler=async function(req,res,next){
  const token = req.header('token');
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  await jwt.verify(token,jwtSecretKey,(err,user)=>{
    if(err){
      res.status(401).send("Invalid Token");
    }else{
      req.user=user;
      next();
    }
  })

}

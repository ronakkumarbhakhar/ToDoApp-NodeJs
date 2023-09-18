const {userModel} =require('./usersModel');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.loginHandler=async function(req,res){
    let password =req.body.password;
    let query=await userModel.findOne({ email: req.body.email });
    console.log(query);
    if(query!==null){
      let hash=query.password;
      if(await bcrypt.compare(password, hash)){
          // before this we need to use bcrypt to check hash password stored in db
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let data = {
            email: query.email,
            password:hash,
          }
          const token = await jwt.sign(data, jwtSecretKey);
          res.send(token);
      }else{
        res.status(401).send("wrong password");
      }
    }else{
      res.status(404).send("User not found");
    }
}

exports.singupHandler=async function(req,res){
   let password=req.body.password;
   try {
    // Generate a salt
    const salt = await bcrypt.genSalt();
    // Hash password
    password= await bcrypt.hash(password, salt);
    await userModel.create({email:req.body.email,password:password});
    res.status(200).send("User created successfully");
  } catch (error) {
    console.log(error)
    res.status(401).send("User creation failed");
  }
}
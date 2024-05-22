const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../Model/UserModel');
const {UserRegisterSchema,UserLoginSchema}=require('../Model/ValidateSchema')


router.post('/register',async(req,res)=>{
    try{
        console.log(req.body);
        const {name,email,password,phone,address}=req.body;
        const salt=await bcrypt.genSalt(12);
        const hash=await bcrypt.hash(password,salt);
        const newUser=new User({name,email,password,phone,address});
        console.log(newUser);
        await newUser.save();
    
    
        const payload={user:{id:User.id}};
        
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
            if(err){
                throw err;  
            }
            res.json({token});
        });
    } catch (error) {
        console.error(error.message);
    }
});




router.post('/login',async(req,res)=>{
    try{
    console.log('Request Body:', req.body);
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:'user not found'});
    }

    console.log('Stored Password:', user.password);
    // const validUser=await bcrypt.compare(password,user.password);

    // console.log('Password Comparison Result:', validUser);

    if(password!==user.password){
        return res.status(404).json({message:'Invalid Password'});
    }


    const payload={user:{id:user.id}};
    
    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
        if(err){
            throw err;  
        }
        res.json({token});
    });
}catch (error) {
    console.error(error.message);
    }
       
});


module.exports=router;
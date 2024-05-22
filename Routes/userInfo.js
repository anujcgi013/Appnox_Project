const express=require('express');
const router=express.Router();
const auth=require('../Middleware/auth');
const User=require('../Model/UserModel');
const {UserRegisterSchema}=require('../Model/ValidateSchema');


//Create and update user

router.post('/',auth,async(req,res)=>{
    const {error}=UserRegisterSchema.validate(req.body);
    if(error){
        return res.status(400).json({errors:error})
    }
    const {name,email,password,phone,address}=req.body;
    const user=await User.findById(req.user.id);
    if(user){
        user.name=name;
        user.email=email;
        user.phone=phone;
        user.address=address;
        await user.save();
        return res.json(user);
    }

    user=new User({
        _id:req.user.id,
        name,
        email,
        phone,
        address
    })
    await user.save();
    res.json(user);
});



// Get user Profile

router.get('/',auth,async(req,res)=>{
    const user=await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({message:'use not found'});
    }
    res.json(user);
});




//Delete user 

router.delete('/',auth,async(req,res)=>{
    const user=await User.findById(req.user.id);
    const index=User.indexOf(user);
    User.splice(index);
    res.json({message:'User Deleted'});
});

module.exports=router;
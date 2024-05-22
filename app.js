const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const User=require('./Model/UserModel');
const authRouter=require('./Routes/authentication');
const userInfoRouter=require('./Routes/userInfo');

dotenv.config();
app.use(express.json());


  

mongoose.connect('mongodb://127.0.0.1:27017/authenticationDemo')
.then(()=>{
    console.log('DB Connected Successfully')
})
.catch((err)=>{
    console.log(err)
});



app.use('/auth',authRouter);
app.use('/user',userInfoRouter);




const port=process.env.port || 3000;

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});



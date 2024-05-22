const jwt=require('jsonwebtoken');

function authenticate(req,res,next)
{
    const token=req.header('x-auto-token');
    if(!token){
        return res.status(404).json({message:'Authorization Denied'});
    }
    const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
    req.user=verifyToken.user;
    next();
}

module.exports=authenticate;
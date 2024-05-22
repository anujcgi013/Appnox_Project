const Joi=require('joi');

const UserRegisterSchema=Joi.object({
    name:Joi.string().required().messages({
        'string.empty':'Name is required'
    }),
    email:Joi.string().required().messages({
        'string.email':'Please provide a valid email',
        'string.empty':'Email is required'
    }),
    password:Joi.string().required().messages({
        'string.min':'Please provide a strong password',
        'string.empty':'Password is required'
    }),
    phone:Joi.string().required().messages({
        'string.empty':'Phone Number is required'
    }),
    address:Joi.string().required().messages({
        'string.empty':'Address is required'
    })
});


const UserLoginSchema=Joi.object({
    email:Joi.string().required().messages({
        'string.email':'Please provide a valid email',
        'string.empty':'Email is required'
    }),
    password:Joi.string().required().messages({
        'string.min':'Please provide a strong password',
        'string.empty':'Password is required'
    })
});


module.exports={
    UserRegisterSchema,
    UserLoginSchema
}
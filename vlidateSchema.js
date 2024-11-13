
// yha ha ye ishliye krr rhe hai like maan lo mene api ke through jo request bheji ushme mene koi bhi field me uske datatype
// ke alawa koi or datatype daal diya wo ye jo niche likha hia usse ha 
// ye galti rok skte hai ki jitne bhi firls hai unme jo bhi datatype diya gya hia
// fill krne ko wo hi fill ho or agr galat hua koi bhi firld ka datatype jo bhara hai
// uske liye error aa jayega

const joi = require('joi');


module.exports = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().required().allow("", null)
    }).required()
});

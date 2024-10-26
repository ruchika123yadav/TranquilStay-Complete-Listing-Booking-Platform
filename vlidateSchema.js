const joi = require('joi')

module.exports= joi.object({
      listing: joi.object({
      title:joi.string().require(),
      description:joi.string().require(),
      location:joi.string().require(),
      country:joi.string().require(),
      price:joi.number.require().min(0),
      image:joi.string().require().allow("",null),

      }).require()

})
const Joi = require("joi");
const { pick } = require("../helper/pick");

const validate = (schema) => (req, res, next) => {
   // console.log(Object.keys(schema));
   //    console.log(req.body);

   const objs = pick(req, Object.keys(schema))

   // console.log(objs);

   const { error, value } = Joi.compile(schema)
      .prefs({
         abortEarly: false,
      })
      .validate(objs);

   console.log("error", error);
   if (error) {
      const errMsg = error.details.map((v) => v.message).join(", ")

      return next(new Error("Validation: " + errMsg))
   }

   console.log("value", value);

   Object.assign(req, value)

   next()


}

module.exports = validate;
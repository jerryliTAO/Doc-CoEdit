import Joi from "joi";

//==============   validate schema  ======================
//sing up schema
export const singUpValidation = (data: object) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).max(128).required(),
    name: Joi.string().required(),
  });

  return schema.validate(data);
};

export const singInValidation = (data: object) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

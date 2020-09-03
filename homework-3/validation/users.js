import Joi from 'joi';

const bodySchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required()
});

const paramsSchema  = Joi.object({
    id: Joi.string()
        .required()
});

const querySchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .max(30),
    limit: Joi.number()
        .greater(0)
        .positive()
});

export { bodySchema, paramsSchema, querySchema };

import Joi from 'joi';

const bodySchema = Joi.object({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .required()
});

export { bodySchema };

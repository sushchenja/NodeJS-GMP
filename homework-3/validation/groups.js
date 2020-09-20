import Joi from 'joi';

const bodySchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    permissions: Joi.array().items(
        Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
    ).required()
});

const paramsSchema  = Joi.object({
    id: Joi.string()
        .required()
});

const querySchema = Joi.object({
    id: Joi.array().items(
        Joi.number().integer().required()
    ).required()
});

export { bodySchema, paramsSchema, querySchema };

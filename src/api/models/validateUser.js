const Joi = require('@hapi/joi');

const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;

const loginSchemaObj = {
    login: Joi.string()
        .pattern(/[\w]+$/)
        .min(2)
        .max(100)
        .required(),
    password: Joi.string()
        .pattern(/[\w]+$/)
        .min(8)
        .max(100)
        .required()
};

const registerValidation = data => {
    const schema = Joi.object(Object.assign({
        firstname: Joi.string()
            .pattern(namePattern)
            .min(2)
            .max(100)
            .required(),
        lastname: Joi.string()
            .pattern(namePattern)
            .min(2)
            .max(100)
            .required()   
    }, loginSchemaObj));

    return schema.validate(data);
};

const loginValidation = data => Joi.object(loginSchemaObj).validate(data);

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
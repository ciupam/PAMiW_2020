const Joi = require('@hapi/joi');

const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;

const usernameSchemaObj = {
    login: Joi.string()
        .pattern(/[A-Za-z0-9]+$/)
        .min(2)
        .max(100)
        .required()
};

const loginSchemaObj = Object.assign({
    password: Joi.string()
        .pattern(/[A-Za-z0-9]+$/)
        .min(8)
        .max(100)
        .required()
    }, usernameSchemaObj);

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

const usernameValidation = data => Joi.object(usernameSchemaObj).validate(data);

module.exports.loginValidation = loginValidation;
module.exports.usernameValidation = usernameValidation;
module.exports.registerValidation = registerValidation;
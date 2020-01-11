import Joi from '@hapi/joi';

const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;

const usernameSchemaObj = {
    login: Joi.string()
        .pattern(/[A-Za-z0-9]+$/)
        .min(2)
        .max(255)
        .required()
};

const loginSchemaObj = Object.assign({
    password: Joi.string()
        .pattern(/[A-Za-z0-9]+$/)
        .min(8)
        .max(1024)
        .required()
    }, usernameSchemaObj);

export const registerValidation = data => {
    const schema = Joi.object(Object.assign({
        firstname: Joi.string()
            .pattern(namePattern)
            .min(2)
            .max(255)
            .required(),
        lastname: Joi.string()
            .pattern(namePattern)
            .min(2)
            .max(255)
            .required(),
        email: Joi.string()
            .max(1014)
            .required()
    }, loginSchemaObj));

    return schema.validate(data);
};

export const loginValidation = data => Joi.object(loginSchemaObj).validate(data);

export const usernameValidation = data => Joi.object(usernameSchemaObj).validate(data);
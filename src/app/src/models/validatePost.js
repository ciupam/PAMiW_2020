import Joi from '@hapi/joi';

const namePattern = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/;

export default data => (
    Joi.object({
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
        _public: Joi.bool()
            .required(),
        files: Joi.array().items(
            Joi.object({
                url: Joi.string()
            })
        ),
        title: Joi.string()
            .min(2)
            .max(255)
            .required()
    }).validate(data)
);
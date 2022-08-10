import Joi from "joi";

const requestValidations: {
    [key: string]: Joi.ObjectSchema
} = {
    // services: Joi.object({
    //     files: { image: Joi.required(), price_list: Joi.required() },
    //     fields: {
    //         title_arm: Joi.required(), title_eng: Joi.required(), description_arm: Joi.required(),
    //         description_eng: Joi.required()
    //     }
    // })
    add_news: Joi.object({
        files: { image: Joi.required(), blog_image: Joi.required(), mobile_image: Joi.required() },
        fields: {
            title: Joi.string().required(),
            body: Joi.string().required()
        }
    }),
    update_news: Joi.object({
        files: { image: Joi.not(), blog_image: Joi.not(), mobile_image: Joi.not() },
        fields: {
            title: Joi.string(),
            body: Joi.string()
        }
    }),
}


export default requestValidations;

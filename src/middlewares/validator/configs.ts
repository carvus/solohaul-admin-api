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
}


export default requestValidations;

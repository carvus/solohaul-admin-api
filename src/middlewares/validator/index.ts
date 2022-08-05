import requestValidations from "./configs";
import { _WRONG_PARAMS_ } from "../../helpers/error-codes";
import { TDictionary, TMiddleware } from "../../lib/types";

 
const validate = (type: string): TMiddleware => (req, res, next) => {
    const currentValidation = requestValidations[type]; 
    
    if (currentValidation) {
        const fields: TDictionary = {};
        let files:  TDictionary = {};

        if(req.file){
            files[req.file.fieldname] = req.file
        }
        else if(Array.isArray(req.files)){
            files[req.files[0].fieldname] = req.files;
        }else if(req.files){
            files = {...req.files};
        }
        
        for(let key in req.body){
            if(!(key in files))
                fields[key] = req.body[key];
        }

        const payload: {
            files: { [key: string]: any },
            fields: { [key: string]: any }
        } = { files, fields };
 
        
        const { error } = currentValidation.validate(payload);
        if (error) throw _WRONG_PARAMS_;
    }
    next();
}

export default validate;

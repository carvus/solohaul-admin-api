import { _WRONG_PARAMS_ } from './../../helpers/error-codes';
import multer, { Options, diskStorage } from "multer";
import { TMiddleware, TError } from './../../lib/types';
import filesTypes from "./filesTypes"
// import { addWaterMarkToFile, getFilePath } from '../../lib';

class MyError extends Error {
    code: number;
    status: number;
    constructor({ message, code, status }: TError) {
      super(message);
      this.code = code;
      this.message = message;
      this.status = status;
    }
}

const multerOptions: Options = {
    storage: diskStorage({
        destination(req, file, cb) {
            cb(null, `public/protected_files`);
        },
        filename(req, file, cb) {
            const fileName = Date.now() + `--` + file.originalname.replace(/ +/g,"_");;

            req.body[file.fieldname] = req.body[file.fieldname]
            ? Array.isArray(req.body[file.fieldname])
                ? [...req.body[file.fieldname], fileName]
                : [req.body[file.fieldname], fileName]
            : fileName;

            cb(null, fileName);
        }
    }),
    fileFilter(req, file, cb) { 
        const [fileType, fileFormat] = file.mimetype.split(`/`);

        if (!req.fromMiddleware?.filesTypesKey) {
            if (fileType != `image`)  
                cb(new MyError(_WRONG_PARAMS_));
        } else {
            const currentType = filesTypes[req.fromMiddleware.filesTypesKey];
            if (currentType) { 
                if (currentType.forAll) {
                    if( fileType != currentType.type){
                        cb(new MyError(_WRONG_PARAMS_));
                    } 
                } else {
                    const validTypes = currentType[file.fieldname] ? currentType[file.fieldname].split(`/`) : [];
                    if(!validTypes.includes(fileType))
                        cb(new MyError(_WRONG_PARAMS_));
                }
            }
        }
        cb(null, true)

    }
}

export const fType = (type: string): TMiddleware => (req, res, next) => {
    if (req.fromMiddleware)
        req.fromMiddleware.filesTypesKey = type;
    else
        req.fromMiddleware = { filesTypesKey: type };
    next();
}

// export const addWMark: TMiddleware = async (req, res, next) => {
//     let files: TDictionary = { ...req.files };
//     if(req.file) files[req.file.fieldname]  = req.file.filename;
    
//     const waterMarkPath = getFilePath(`public`, `watermark.png`);
//     for (let key in files) {
//         const outputFileName = `w${req.body[key]}`;
//         const currentFilePath = getFilePath(`public/protected_files`, req.body[key]);
//         const outputFilePath =  getFilePath(`public/protected_files`, outputFileName);
//         await addWaterMarkToFile(waterMarkPath, currentFilePath, outputFilePath, true);        
//         req.body[key] = outputFileName;
//     }
//     next();
// }

export default multer(multerOptions);

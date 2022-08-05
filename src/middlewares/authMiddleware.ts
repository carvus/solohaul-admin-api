import { TMiddleware } from '../lib/types';
import { _TOKEN_IS_WRONG_ } from '../helpers/error-codes';
import jwt from 'jsonwebtoken';

const authMiddleware: TMiddleware = (req, res, next) => {

  try {
    const token: string | undefined = (req.header(`Authorization`) || "").split(` `)[1];
    if (token) {
      const sectey_key = process.env.JWT_SECRET;
      let parsedToken = jwt.verify(token, sectey_key || '');
    
      if (typeof parsedToken == "string" || !parsedToken.uid) throw new Error();
      req.user = { uid: parsedToken.uid };    
    } else throw new Error();
  } catch (err) { 
    throw _TOKEN_IS_WRONG_; 
  }
  next();

}


export default authMiddleware;
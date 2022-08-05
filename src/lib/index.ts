import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { Request, Response, Router } from "express";
import { TResponseTemplate, TRoute, TMiddleware, TController } from "./types";
import { sqlErrorHandler } from '../helpers/error-handlers'; 
import { _CANT_SEND_MAIL_ } from '../helpers/error-codes';



export function createController(body: (req: Request, res: Response) => any): TController {
  return async (req: Request, res: Response) => {
    const result: TResponseTemplate = getResponseTemplate();
    try {
      result.data = (await body(req, res)) || {};
    }
    catch (e) { 
      console.log(`error`, e);
      let err: any = e;
      if (err.isSql)
        sqlErrorHandler(err, result);
      else
        result.meta.error = {
          code: err.code || err.errCode || 5000,
          message: err.message || err.errMessage || "Unknown Error"
        };
        result.meta.status = err.status || 500;
    }
    res.status(result.meta.status).json(result);
  };
};

export function getResponseTemplate(): TResponseTemplate {
  return {
    meta: {
      error: null,
      status: 200
    },
    data: {}
  };
};

export function setupRouter(apiRoutes: TRoute[], router: Router) {
  for (let i = 0; i < apiRoutes.length; i++) {
    const miidl: TMiddleware[] = [];
    const route = apiRoutes[i];
    if (route.middlewares && route.middlewares.length > 0) {
      miidl.push(...route.middlewares);
    }

    router.use(route.path, ...miidl, route.router);
  }

}

export async function hashingString (password: string): Promise<string> {
      try{
          const hashSalt = await bcrypt.genSalt(10); 
           
          const hashedStr = await bcrypt.hash(password+"", hashSalt);  
          
          return hashedStr;
      }catch(err){ 
          throw ({
              errCode: 1623,
              message: "Հեշավորումը ավարտվեց անհաջողությամբ"
          });
      }              
} 

export async function sendEmail(email: string, options: { subject?: string, text?: string, html?: string } ) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Yandex",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: options.subject,
      text: options.text,
      html: options.html
    });

    return { message: `Նամակը ուղարկվեց հաջողությամբ` };
  } catch (error) {
    throw _CANT_SEND_MAIL_;
  }
}
 

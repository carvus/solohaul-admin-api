import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


import { _RESET_CODE_IS_WRONG_, _WRONG_LOGIN_OR_PASSWORD, _WRONG_PARAMS_ } from './../helpers/error-codes';
import { createController, hashingString, sendEmail } from '../lib';
import DbOperations from '../providers/db/operations';
const { common } = DbOperations;
import { TController } from './../lib/types';


export const loginController: TController = createController(async (req, res) => {
  let admin = (await common.select(`admins`, `*`, { email: req.body.email }))[0];
  if (!admin) throw _WRONG_LOGIN_OR_PASSWORD;

  const loggedIn = await bcrypt.compare(req.body.password, admin.password);
  if (!loggedIn) throw _WRONG_LOGIN_OR_PASSWORD;

  const jwtSecret = process.env.JWT_SECRET || "";

  const token = jwt.sign({
    uid: admin.uid,
  }, jwtSecret, { expiresIn: 60 * 60 * 24 * 365 });

  return { token };
});



export const forgetPasswordCheckEmailController: TController = createController(async (req, res) => {
  let currentUser = (await common.select(`admins`, `*`, { email: req.body.email }))[0];
  if (!currentUser) throw _WRONG_PARAMS_;

  const jwtSecret: string = process.env.JWT_SECRET || ``;

  const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  const resetToken = await hashingString(`${random}`);

  const token = jwt.sign({
    email: req.body.email,
    token: resetToken
  }, jwtSecret, { expiresIn: 60 * 60 });

  await sendEmail(req.body.email, { subject: `Reset Code`, text: random.toString() });
  return { token };
});
export const forgetPasswordVerifyCodeController: TController = createController(async (req, res) => {
  const token = typeof req.headers.reset_token == "string" ? req.headers.reset_token : ``;
  const code = req.body.code;
  const jwtSecret: string = process.env.JWT_SECRET || ``;


  let decoded = jwt.verify(token, jwtSecret);
  decoded = typeof decoded == `string` ? {} : decoded;
  const isCodeTrue = await bcrypt.compare(code, decoded.token);
  if(!isCodeTrue) throw _RESET_CODE_IS_WRONG_;

  const currentUser = (await common.select(`admins`, `*`, { email: decoded.email }))[0];

  const newToken = jwt.sign({
    email: currentUser.email,
    password: currentUser.password
  }, jwtSecret, { expiresIn: 60 * 60 });

  return { token: newToken }
});
export const forgetPasswordResetPasswordController: TController = createController(async (req, res) => {
  const token = typeof req.headers.reset_token == "string" ? req.headers.reset_token : ``;
  const jwtSecret: string = process.env.JWT_SECRET || ``;

  let decoded = jwt.verify(token, jwtSecret);
  decoded = typeof decoded == `string` ? {} : decoded;

  const user = (await common.select(`admins`, `*`, { email: decoded.email }))[0];
  if (user.password != decoded.password) throw _WRONG_PARAMS_;

  const newPassword = await hashingString(req.body.password);
  await common.update(`admins`, { password: newPassword }, { email: user.email });

  return { message: `Request ended successfully` };
});

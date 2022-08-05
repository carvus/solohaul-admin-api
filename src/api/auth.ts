import { Router } from "express";   
import validate from "../middlewares/validator";
import { loginController, forgetPasswordCheckEmailController, forgetPasswordVerifyCodeController,
    forgetPasswordResetPasswordController } from './../controllers/auth';

const router: Router = Router();

router.post('/login', loginController); 
router.post('/forget_password_check_email', forgetPasswordCheckEmailController);
router.post('/forget_password_verify_code', forgetPasswordVerifyCodeController);
router.put('/forget_password_reset_password',  validate(`reset_password`), forgetPasswordResetPasswordController);

export default router;

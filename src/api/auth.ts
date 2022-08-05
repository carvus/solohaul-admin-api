import { Router } from "express";
import validate from "../middlewares/validator";
import {
    loginController, forgetPasswordCheckEmailController, forgetPasswordVerifyCodeController,
    forgetPasswordResetPasswordController
} from './../controllers/auth';

const router: Router = Router();

router.post('/login', loginController);
router.post('/forget-password-check-email', forgetPasswordCheckEmailController);
router.post('/forget-password-verify-code', forgetPasswordVerifyCodeController);
router.put('/forget-password-reset-password', validate(`reset_password`), forgetPasswordResetPasswordController);

export default router;

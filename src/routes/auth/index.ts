import express,{Request,Response,NextFunction, response} from "express";
import { body } from 'express-validator';
const router = express.Router();
import * as userController from "../../controller/userController";
import {checkRequestValidationMiddleware} from "../../middleware/index"

router.post('/login',[
    body("email").exists().withMessage("email is required"),
    body("password").exists().withMessage("password is required"),
    checkRequestValidationMiddleware
], userController.login);

router.post('/signup', [
    body("name").exists().withMessage("name is required"),
    body("email").exists().withMessage("email is required"),
    body("password").exists().withMessage("password is required"),
],checkRequestValidationMiddleware,userController.register);

export const auth = router;
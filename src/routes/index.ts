import express from "express";
import { auth ,checkRequestValidationMiddleware} from "../middleware/index";
import * as notesController from "../controller/notesController";
import {body,param,query} from "express-validator"
const router = express.Router();

router.get("/notes",auth,notesController.notesList);

router.get("/search",[
    query("q").exists().withMessage("Id is required")
],checkRequestValidationMiddleware,auth,notesController.notesList);

router.get("/notes",[
    param("id").exists().withMessage("Id is required")
],checkRequestValidationMiddleware,auth,notesController.noteById);

router.post("/notes",[
    param("id").exists().withMessage("Id is required")
],checkRequestValidationMiddleware,auth,notesController.share);

router.post("/create",[
    body("description").exists().withMessage("description is required"),
    body("title").exists().withMessage("title is required"),
],checkRequestValidationMiddleware,auth,notesController.createNote);

router.delete("/notes", [
    param("id").exists().withMessage("Id is required")
], auth, notesController.deleteNote);

router.put("/notes",[
    param("id").exists().withMessage("Id is required")
],checkRequestValidationMiddleware,auth,notesController.editNote);

export default router;
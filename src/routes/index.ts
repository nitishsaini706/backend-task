import express from "express";
import { auth } from "../middleware/index";
import * as notesController from "../controller/notesController";
import {body,param,query} from "express-validator"
const router = express.Router();

router.get("/notes",auth,notesController.notesList);

router.get("/search",[
    query("q").exists().withMessage("Id is required")
],auth,notesController.notesList);

router.get("/notes",[
    param("id").exists().withMessage("Id is required")
],auth,notesController.noteById);

router.post("/notes",[
    param("id").exists().withMessage("Id is required")
],auth,notesController.share);

router.post("/notes",[
    body("description").exists().withMessage("description is required"),
    body("title").exists().withMessage("title is required"),
],auth,notesController.createNote);

router.delete("/notes", [
    param("id").exists().withMessage("Id is required")
], auth, notesController.deleteNote);

router.put("/notes",[
    param("id").exists().withMessage("Id is required")
],auth,notesController.editNote);

export default router;
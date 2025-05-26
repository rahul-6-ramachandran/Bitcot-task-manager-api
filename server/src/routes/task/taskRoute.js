import express from "express";
import { authenticateUser } from "../../utils/validators.js";
import { createNewTask } from "../../controllers/task/taskController.js";

const router = express.Router();


//  -----  Task Creation -----
//  Method : POST
//  Endpoint : api/task/:userId
//  Body : email,password
//  Params : userId

router.post("/:userId", authenticateUser, createNewTask);

export default router;

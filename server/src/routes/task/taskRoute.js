import express from "express";
import { authenticateUser, validateCreateTask } from "../../utils/validators.js";
import { createNewTask, updateAssignedTo } from "../../controllers/task/taskController.js";

const router = express.Router();


//  -----  Task Creation -----
//  Method : POST
//  Endpoint : api/task
//  Body : { title,description,status,priority,deadLine,assignedTo }
//  Params : 

router.post("/", authenticateUser,validateCreateTask(), createNewTask);



//  -----  Task Assignment -----
//  Method : POST
//  Endpoint : api/task
//  Body : { assignedTo }
//  Params : taskId
router.patch("/:taskId", authenticateUser, updateAssignedTo);

export default router;

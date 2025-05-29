import express from "express";
import { authenticateUser, validateCreateTask } from "../../utils/validators.js";
import { createNewTask,updateUserTask } from "../../controllers/task/taskController.js";

const router = express.Router();


//  -----  Task Creation -----
//  Method : POST
//  Endpoint : api/task
//  Body : { title,description,status,priority,deadLine,assignedTo }
//  Params : 

router.post("/", authenticateUser,validateCreateTask(), createNewTask);



//  -----  Task Assignment -----
//  Method : PATCH
//  Endpoint : api/task
//  Body : { assignedTo }
//  Params : taskId
router.patch("/:taskId", authenticateUser, updateUserTask);


//  -----  Task Fetch -----
//  Method : GET
//  Endpoint : api/task
//  Body : {  }
//  Params : taskId
// router.get("/filter",authenticateUser,getAllUserTasks)

export default router;

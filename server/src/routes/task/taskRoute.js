import express from "express";
import { authenticateUser, validateCreateTask, validateUpdateTask } from "../../utils/validators.js";
import { createNewTask,getAllUserTasks,updateUserTask } from "../../controllers/task/taskController.js";

const router = express.Router();

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create Tasks
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the Task
 *                 required : false
 *               status:
 *                 type: string
 *                 description: Status of the task (e.g., 'Not Started', 'Completed' , 'In Progress')
 *               priority:
 *                 type: string
 *                 description: Priority of the task (e.g., 'High', 'Medium', 'Low')
 *               deadLine:
 *                 type: string
 *                 format: date
 *                 description: Deadline of the task (e.g., '2025-05-30')
 *               assignedTo:
 *                 type: string
 *                 description: User ID to whom the task is assigned
 *               description:
 *                 type: string
 *                 description: Description for the task
 *     responses:
 *       200:
 *         description: Create Tasks with provided body
 */


router.post("/", authenticateUser,validateCreateTask(), createNewTask);



/**
 * @swagger
 * /api/task/:taskId:
 *   patch:
 *     summary: Update Tasks
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the Task
 *                 required : false
 *               status:
 *                 type: string
 *                 description: Status of the task (e.g., 'Not Started', 'Completed' , 'In Progress')
 *               priority:
 *                 type: string
 *                 description: Priority of the task (e.g., 'High', 'Medium', 'Low')
 *               deadLine:
 *                 type: string
 *                 format: date
 *                 description: Deadline of the task (e.g., '2025-05-30')
 *               assignedTo:
 *                 type: string
 *                 description: User ID to whom the task is assigned
 *               description:
 *                 type: string
 *                 description: Description for the task
 *     responses:
 *       200:
 *         description: Updates the tasks with taskId 
 */

router.patch("/:taskId", authenticateUser, updateUserTask);

/**
 * @swagger
 * /api/task/filter:
 *   post:
 *     summary: Get tasks with optional filters and sorting
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: Status of the task (e.g., 'Not Started', 'In Progress', 'Completed')
 *                   priority:
 *                     type: string
 *                     description: Priority of the task (e.g., 'High', 'Medium', 'Low')
 *                   deadLine:
 *                     type: string
 *                     format: date
 *                     description: Deadline of the task (e.g., '2025-05-30')
 *               sort:
 *                 type: object
 *                 properties:
 *                   priority:
 *                     type: boolean
 *                     description: Whether to sort by priority
 *                   deadLine:
 *                     type: boolean
 *                     description: Whether to sort by deadline
 *                   status:
 *                     type: boolean
 *                     description: Whether to sort by status
*     responses:
 *       200:
 *         description: Fetch all Filtered Tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 userTasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserTask'
 */


router.post("/filter",authenticateUser,validateUpdateTask(), getAllUserTasks)

export default router;

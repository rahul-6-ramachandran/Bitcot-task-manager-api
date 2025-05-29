import {
  createTask,
  getTaskById,
  updateTask,
} from "../../services/task/taskService.js";
import {
  createTaskIndex,
  updateTaskIndex,
} from "../../services/commonService.js";
import mongoose, { Types } from "mongoose";
import { Priority, Status } from "../../utils/enum.js";

const createNewTask = async (req, res) => {
  let { body } = req;
  // console.log(body,"body")
  const { userId } = req.user;

  body = {
    ...body,
    createdBy: userId,
  };

  const newTask = await createTask(body);
  if (!newTask) {
    return res.status(500).json({ error: "Cannot Add Task" });
  }

  createTaskIndex(newTask)
    .then(() => {
      return res.status(200).json({ message: "Task Created Successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Cannot Add Task" });
    });
};

const updateUserTask = async (req, res) => {
  const { userId } = req.user;
  const { taskId } = req.params;
  const { body } = req;

  const task = await getTaskById(taskId);

  if (!task) {
    return res.status(500).json({ error: "Task Not Found" });
  }

  if (body?.assignedTo) {
    if (task?.createdBy.toString() !== userId) {
      return res.status(401).json({ error: "Unauthorised Request" });
    }
  }

  if (body?.status && !Object.values(Status).includes(body.status)) {
    return res.status(500).json({ error: "Please Enter Valid Status" });
  }

  if (body?.priority && !Object.values(Priority).includes(body?.priority)) {
    return res
      .status(500)
      .json({ error: "Please Enter a Valid Priority Constraint" });
  }

  const updatedTask = await updateTask(taskId, req.body);

  if (!updatedTask) {
    return res.status(500).json({ error: "Cannot Update Task" });
  }

  updateTaskIndex(updatedTask).then(() => {
    return res.status(200).json({ message: "Task Updated Successfully" });
  });
};

export { createNewTask, updateUserTask };

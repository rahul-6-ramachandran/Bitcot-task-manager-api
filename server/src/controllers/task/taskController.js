import {
  createTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../../services/task/taskService.js";
import {
  createTaskIndex,
  getFilteredTasks,
  updateTaskIndex,
} from "../../services/commonService.js";

import { Priority, Status, UserActions } from "../../utils/enum.js";
import { createLog } from "../../services/logs/logsService.js";
import { getFilteredQueryForTasks, getLogBodyForTaskUpdate } from "../../utils/queryModel.js";

const createNewTask = async (req, res) => {
  let { body } = req;
  // console.log(body,"body")
  const { userId , username } = req.user;

  body = {
    ...body,
    createdBy: userId,
  };

  const newTask = await createTask(body);

 
  if (!newTask) {
    return res.status(500).json({ error: "Cannot Add Task" });
  }

  console.log(newTask)

  await createTaskIndex(newTask)
    .then(async()=>{
        const logBody = {
            action : UserActions.CREATE_TASK,
            description :  `${username} created new task ${newTask?.title}`,
            userId : userId,
            path : req.originalUrl
        }
        return await createLog(logBody)

    })
    .then((result) => {
        if(result){
            return res.status(200).json({ message: "Task Created Successfully" });
        }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Cannot Add Task" ,err});
    });
};

const updateUserTask = async (req, res) => {
  const { userId } = req.user;
  const { taskId } = req.params;
  const { body } = req;

  const task = await getTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task Not Found" });
  }

  
  if (body?.assignedTo && task?.createdBy.toString() !== userId) {
      return res.status(401).json({ error: "Unauthorised Request" });
  }

  if (body?.status && !Object.values(Status).includes(body.status)) {
    return res.status(400).json({ error: "Please Enter Valid Status" });
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

  const logBody = await getLogBodyForTaskUpdate(body,req,task)

  updateTaskIndex(updatedTask)
  .then(async()=>{
    const logPromises = logBody.map(log => createLog(log));
    return Promise.all(logPromises);
  })
  .then(() => {
    return res.status(200).json({ message: "Task Updated Successfully" });
  });
};

const getAllUserTasks = async(req,res)=>{
  const {userId} = req.user
  const {body}  = req

  
  const  query = await getFilteredQueryForTasks(body ,userId)

  const tasks = await getFilteredTasks(query)

  if(tasks){
    return res.status(200).json({
      status : 200,
      userTasks : tasks?.hits?.hits
    })
  }
 
}


export { createNewTask, updateUserTask ,getAllUserTasks };

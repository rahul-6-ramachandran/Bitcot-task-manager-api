import Task from "../../models/task/taskModel.js";
import { Status } from "../../utils/enum.js";

export const createTask = async (model) => {
  try {
    return await Task.create(model);
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (_id, model) => {
  try {
    return await Task.findByIdAndUpdate(
      _id,
      model,
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};


export const getTaskById = async(_id)=>{
    try {
        return await Task.findById({_id})
    } catch (error) {
        throw error;
    }
}

export const getTasks = async(userId)=>{
  try {
    return await Task.find({
      createdBy : userId,
      status : {$ne : Status.COMPLETED}
    })
    .populate("createdBy", "username email")

  } catch (error) {
    throw error
  }
}
import Task from "../../models/task/taskModel.js";

export const createTask = async (model) => {
  try {
    return await Task.create(model);
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
};


export const getTaskById = async(_id)=>{
    try {
        return await Task.findById(_id)
    } catch (error) {
        throw new Error(error);
    }
}
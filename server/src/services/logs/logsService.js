import Logs from "../../models/logs/logModel.js"

export const createLog = async (logBody)=>{
    return await Logs.create(logBody)
}

export const getLogs = async (model)=>{
    return await Logs.find(model)
}

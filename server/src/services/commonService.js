import { getKeyByValue } from "../../helpers/index.js"
import esClient from "../config/elasticSearch/elasticClient.js"
import { Priority, PriorityIndex, Status, StatusIndex } from "../utils/enum.js"

// ElasticSearch Indexing Functions
export const createTaskIndex = async(newTask)=>{
    try {
        const statusIdx = await getKeyByValue(Status,newTask?.status)
    console.log(newTask)
        return await esClient.index({
            index: 'tasks',
            id: newTask._id.toString(),
            document: {
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              status: newTask.status,
              priorityIndex : PriorityIndex[newTask?.priority],
              statusIndex : StatusIndex[statusIdx],
              createdBy: newTask.createdBy.toString(),
              assignedTo: newTask.assignedTo.toString(),
              deadLine: newTask.deadLine,
              createdAt: newTask.createdAt,
            },
        })
    } catch (error) {
        throw new Error(`An Unexpected Error Occured ${error}`)
    }
   
}


export const updateTaskIndex = async(updatedTask)=>{
    try {
        const statusIdx = await getKeyByValue(Status,updatedTask?.status)
        await esClient.update({
            index: 'tasks',
            id: updatedTask._id.toString(),
            doc: {
                title: updatedTask.title,
                description: updatedTask.description,
                priority: updatedTask.priority,
                status: updatedTask.status,
                statusIndex : StatusIndex[statusIdx],
                createdBy: updatedTask.createdBy.toString(),
                priorityIndex : PriorityIndex[updatedTask?.priority],
                assignedTo: updatedTask.assignedTo.toString(),
                deadLine: updatedTask.deadLine,
                updatedAt: updatedTask.updatedAt,
            },
        })
    } catch (error) {
        throw new Error(`An Unexpected Error Occured ${error}`)
    }
}

export const getFilteredTasks = async({filterQuery,sortQuery})=>{
    try {
       return await esClient.search({
        index : 'tasks',
        body : {
            query : {
                bool : {
                    must_not : [
                        { term: { 'status.keyword': Status.COMPLETED } }
                    ],
                    filter : [
                        ...filterQuery
                    ]
                }
            },
            sort : [
                ...sortQuery
            ]
            
        }
       }) 

    } catch (error) {
        throw new Error(`An Unexpected Error Occured ${error}`)
    }
}
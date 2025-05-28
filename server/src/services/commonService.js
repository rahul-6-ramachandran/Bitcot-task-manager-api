import esClient from "../config/elasticSearch/elasticClient.js"

// ElasticSearch Indexing Functions
export const createTaskIndex = async(newTask)=>{
    try {
        await esClient.index({
            index: 'tasks',
            id: newTask._id.toString(),
            document: {
              title: newTask.title,
              description: newTask.description,
              priority: newTask.priority,
              status: newTask.status,
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
        await esClient.update({
            index: 'tasks',
            id: updatedTask._id.toString(),
            doc: {
                title: updatedTask.title,
                description: updatedTask.description,
                priority: updatedTask.priority,
                status: updatedTask.status,
                createdBy: updatedTask.createdBy.toString(),
                assignedTo: updatedTask.assignedTo.toString(),
                deadLine: updatedTask.deadLine,
                updatedAt: updatedTask.updatedAt,
            },
        })
    } catch (error) {
        
    }
}
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// swaggerOptions
export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task-Manager API',
        version: '1.0.0',
        description: 'API documentation for Task management',
      },
      servers: [
        {
          url: process.env.HOST_URL || 'http://localhost:2255', 
        },
      ],
      components: {
        schemas: {
          UserLog: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '68382b38d8cedb13a0ecb78f' },
              action: { type: 'string', example: 'UpdateTask' },
              userId: { type: 'string', example: '68347afcf6e79efb0d48ca23' },
              description: { type: 'string', example: 'rahul updated task' },
              path: { type: 'string', example: '/api/task/123' },
              createdAt: { type: 'string', format: 'date-time', example: '2025-05-29T11:33:44.148Z' },
              updatedAt: { type: 'string', format: 'date-time', example: '2025-05-29T11:33:44.148Z' },
              __v: { type: 'integer', example: 0 },
            },
          },
          UserTask:
        {  type: 'object',
          properties:
           { _index:
             { type: 'string',
              example: "tasks"},
            _id:
              {type: 'string',
              example: "6839bf561a29f10661235f0d"},
            _score:
              {type: 'number',
              example: 0},
            _source:
             { type: 'object',
              properties:
                {title:
                  {type: 'string',
                  example: "test-2"},
                description:
                  {type: 'string',
                  example: ""},
                priority:
                  {type: 'string',
                  example: "High"},
                status:
                {  type: 'string',
                  example: "Not Started"},
                priorityIndex:
                  {type: 'integer',
                  example: 3},
                statusIndex:
                 { type: 'integer',
                  example: 3},
                createdBy:
                  {type: 'string',
                  example: "68347afcf6e79efb0d48ca23"},
                assignedTo:
                {  type: 'string',
                  example: "68347afcf6e79efb0d48ca23"},
                deadLine:
                 { type: 'string',
                  format: 'date-time',
                  example: "2025-05-30T00:00:00.000Z"},
                createdAt:
                  {type: 'string',
                  format: 'date-time',
                  example: "2025-05-30T14:23:18.928Z"}}}}
        }
        },
      },
    },
    apis: [
        path.join(__dirname, '../routes/**/*.js'), 
        path.join(__dirname, '../controllers/**/*.js')
      ],
  };
  


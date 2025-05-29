import express, { Router } from 'express'
import { authenticateUser } from '../../utils/validators.js';
import { getUserLogs } from '../../controllers/logs/logController.js';

const router = express.Router();


//  ----- Activity Logs Fetch -----
//  Method : GET
//  Endpoint : api/logs
//  Body : None
//  Params : None

router.get("/", authenticateUser, getUserLogs );

export default router
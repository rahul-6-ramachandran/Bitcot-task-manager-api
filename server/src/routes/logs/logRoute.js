import express, { Router } from 'express'
import { authenticateUser } from '../../utils/validators.js';
import { getUserLogs } from '../../controllers/logs/logController.js';

const router = express.Router();

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all activity logs of the user
 *     tags:
 *       - Logs
 *     responses:
 *       200:
 *         description: Fetch all logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 userLogs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserLog'
 */


router.get("/", authenticateUser, getUserLogs );

export default router
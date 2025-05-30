import express from "express";
import {
  checkTokenForResetPassword,
  getUserTokenForForgotPassword,
  registerUser,
  updatePassword,
} from "../../controllers/auth/authcontoller.js";
import {
  validateEmail,
  validatePassword,
  validateUserSignin,
} from "../../utils/validators.js";

const router = express.Router();

/**
 * @swagger
 * /api/user/signin:
 *   post:
 *     summary: User login (Sign In)
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rahulramachandran432@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login Successful / Registration Successful
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       500:
 *         description: Validation error or incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 */

router.post("/signin", validateUserSignin(), registerUser);

/**
 * @swagger
 * /api/user/forgot-passsword:
 *   post:
 *     summary: Request password reset link
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rahuloff432@gmail.com
 *     responses:
 *       200:
 *         description: Reset Mail Sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Reset link has been sent to your email
 *       404:
 *         description: User Does Not Exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 */

router.post(
  "/forgot-passsword",
  validateEmail(),
  getUserTokenForForgotPassword
);


/**
 * @swagger
 * /api/user/reset-passsword:
 *   get:
 *     summary: Verify password reset token
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token sent to the user's email for password reset
 *     responses:
 *       200:
 *         description: User Validation Successful Using Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Reset Link Expired
 *       500:
 *         description: Cannot Find User
 */

router.get("/reset-password/:token", checkTokenForResetPassword);


/**
 * @swagger
 * /api/user/reset-passsword:
 *   put:
 *     summary: Reset user password
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token received via email for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewSecurePassword123
 *                 description: New password to set
 *     responses:
 *       200:
 *         description: Password Changed Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Password has been updated
 *       404:
 *         description: Cannot Find User
 *       500:
 *         description: Internal server error
 */

router.put("/reset-password/:token", validatePassword(), updatePassword);



export default router;

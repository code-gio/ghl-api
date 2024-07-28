import express from "express";
import { authCallback, initiateAuth, refreshToken } from "../controllers/auth";

const router = express.Router();

/**
 * @openapi
 * /api/auth/initiate:
 *   get:
 *     summary: Initiate authentication
 *     tags: [Authentication]
 *     description: Redirects the user to the GoHighLevel OAuth page to initiate the authentication process
 *     responses:
 *       302:
 *         description: Redirect to GoHighLevel OAuth page
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: URL of the GoHighLevel OAuth page
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/initiate", initiateAuth);

/**
 * @openapi
 * /api/auth/callback:
 *   get:
 *     summary: OAuth callback
 *     tags: [Authentication]
 *     description: Handles the callback from GoHighLevel after user authorization
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: The authorization code returned by GoHighLevel
 *     responses:
 *       200:
 *         description: Authorization code received successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request, authorization code is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/callback", authCallback);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     description: Refreshes the access token using a refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: The refresh token
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request, refresh token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/refresh", refreshToken);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *         data:
 *           type: object
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: failure
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

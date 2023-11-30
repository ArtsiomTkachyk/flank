import express from "express";
import axios from 'axios';
import crypto from 'crypto';
import dotenv from "dotenv";


/* CONFIGURATION */
dotenv.config({ path: "./config.env" });


const router = express.Router();
let API_URL = process.env.BASE_URL;


/**
 * @swagger
 * /userauth/login:
 *   post:
 *     summary: 
 *     description: This endpoint will be use to authenticate existing users
 *     tags: [Authentication]
 *     operationId: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestBody'
 *     responses:
 *       200:
 *         description: Authenticated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *       400:
 *         description: Invalid username/password supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginInvalidResponse'
 */

// Login endpoint
router.post("/login", ((req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(402).json({ msg: "Email or Password is missing", data: null })
    }
    let hashedPassword = crypto.createHash('md5').update(password).digest("hex")
    let obj = {
        "login": email,
        "password": hashedPassword
    };
    axios({
        method: 'POST',
        url: `${API_URL}/token`,
        data: obj
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Login: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

export default router;
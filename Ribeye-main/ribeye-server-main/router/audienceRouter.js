import express from "express";
import axios from 'axios';
import dotenv from "dotenv";
import checkBearerToken from "../middleware/checkBearerToken.js";

/* CONFIGURATION */
dotenv.config({ path: "./config.env" });

const router = express.Router();
let API_URL = process.env.BASE_URL;

// Get third-party-audiences
router.get("/:advertiserPublicId", checkBearerToken, ((req, res) => {
    let { advertiserPublicId } = req.params;
    axios({
        method: 'GET',
        url: `${API_URL}/audiences/${advertiserPublicId}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get audiences/advertiserPublicId : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

export default router;
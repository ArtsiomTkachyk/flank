import express from "express";
import axios from 'axios';
import dotenv from "dotenv";
import checkBearerToken from "../middleware/checkBearerToken.js";

/* CONFIGURATION */
dotenv.config({ path: "./config.env" });

const router = express.Router();
let API_URL = process.env.BASE_URL;

// Get third-party-audiences
router.get("/", checkBearerToken, ((req, res) => {
    let { client_api_ref, audience_type } = req.query;
    axios({
        method: 'GET',
        url: `${API_URL}/third-party-audiences?client_api_ref=${client_api_ref}&audience_type=${audience_type}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get third-party-audiences : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get third-party-audiences/taxonomies
router.get("/taxonomies", checkBearerToken, ((req, res) => {
    let { audience_types, providers } = req.query;
    axios({
        method: 'GET',
        url: `${API_URL}/third-party-audiences/taxonomies?audience_types=${audience_types}&providers=${providers}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get third-party-audiences/taxonomies : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

export default router;
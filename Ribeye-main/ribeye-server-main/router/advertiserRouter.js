import express from "express";
import axios from 'axios';
import dotenv from "dotenv";
import checkBearerToken from "../middleware/checkBearerToken.js";


/* CONFIGURATION */
dotenv.config({ path: "./config.env" });


const router = express.Router();
let API_URL = process.env.BASE_URL;


// Get advertisers
router.get("/", checkBearerToken, ((req, res) => {
    const { client_api_ref } = req.query;

    // Check if client_api_ref avail
    if (!client_api_ref) {
        return res.status(403).json({ error: 'client_api_ref is missing' });
    };

    axios({
        method: 'GET',
        url: `${API_URL}/advertisers?client_api_ref=${client_api_ref}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Advertisers: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get single advertiser 
router.get("/:publicId", checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    if (!publicId) {
        return res.status(403).json({ error: 'Public identifier ID is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/advertisers/view/${publicId}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get a single Advertiser: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });

}));

// Create new advertiser 
router.post("/create", checkBearerToken, ((req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    axios({
        method: 'POST',
        url: `${API_URL}/advertisers/create`,
        data: data,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Create new Advertiser: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });

}));



export default router;
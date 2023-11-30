import express from "express";
import axios from 'axios';
import dotenv from "dotenv";
import checkBearerToken from "../middleware/checkBearerToken.js";

/* CONFIGURATION */
dotenv.config({ path: "./config.env" });

const router = express.Router();
let API_URL = process.env.BASE_URL;


router.get("/", ((req, res) => {
    res.send(
        "<div style='height: 100vh; display: flex; text-align: center; justify-content: center; align-items: center;'><h1>Welcome to <br /> Ribeye - Server</h1></div>"
    );
}));

// Get categories 
router.get("/categories", checkBearerToken, ((req, res) => {
    axios({
        method: 'GET',
        url: `${API_URL}/categories`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Categories: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get countries 
router.get("/countries", checkBearerToken, ((req, res) => {
    axios({
        method: 'GET',
        url: `${API_URL}/countries`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Countries: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get cities 
router.get("/cities", checkBearerToken, ((req, res) => {
    const { countries, ids } = req.query;
    axios({
        method: 'GET',
        url: `${API_URL}/cities?countries=${countries}&ids=${ids}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Cities: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get Dmas 
router.get("/dmas", checkBearerToken, ((req, res) => {
    const { countries } = req.query;
    axios({
        method: 'GET',
        url: `${API_URL}/dmas?countries=${countries}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Dmas: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get Regions 
router.get("/regions", checkBearerToken, ((req, res) => {
    const { countries } = req.query;
    axios({
        method: 'GET',
        url: `${API_URL}/regions?countries=${countries}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Regions: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get Postal codes 
router.get("/postal-codes", checkBearerToken, ((req, res) => {
    const { countries, ids } = req.query;
    axios({
        method: 'GET',
        url: `${API_URL}/postal-codes?countries=${countries}&ids=${ids}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get All Postal codes: error from main API => ", err);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get Inventory packages
router.get("/inventory-packages/:clientApiRef", checkBearerToken, ((req, res) => {
    const { creative_type } = req.query;
    let { clientApiRef } = req.params;
    if (!clientApiRef) {
        return res.status(403).json({ error: 'ClientApiRef is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/inventory-packages/${clientApiRef}?creative_type=${creative_type || ""}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get /inventory-packages/clientApiRef?creative_types : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get bid-types
router.get("/bid-types/:clientApiRef", checkBearerToken, ((req, res) => {
    let { clientApiRef } = req.params;
    if (!clientApiRef) {
        return res.status(403).json({ error: 'ClientApiRef is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/bid-types/${clientApiRef}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get bid-types : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get optimization-goals
router.get("/optimization-goals/:clientApiRef", checkBearerToken, ((req, res) => {
    let { clientApiRef } = req.params;
    if (!clientApiRef) {
        return res.status(403).json({ error: 'ClientApiRef is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/optimization-goals/${clientApiRef}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get optimization-goals : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get traffic-types
router.get("/traffic-types", checkBearerToken, ((req, res) => {
    axios({
        method: 'GET',
        url: `${API_URL}/traffic-types`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get traffic-types : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get exchanges
router.get("/exchanges/:publicId", checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    if (!publicId) {
        return res.status(403).json({ error: 'Public ID is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/exchanges/${publicId}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get exchanges : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Get deals
router.get("/deals/:publicId", checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    if (!publicId) {
        return res.status(403).json({ error: 'Public ID is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/deals/${publicId}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get deals : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Create deals
router.post("/deals/create", checkBearerToken, ((req, res) => {
    let data = req.body;
    axios({
        method: 'GET',
        url: `${API_URL}/deals/create`,
        data: data,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Create deals : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));



export default router;
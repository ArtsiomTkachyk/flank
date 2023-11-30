import express from "express";
import axios from 'axios';
import dotenv from "dotenv";
import multer from "multer";
import checkBearerToken from "../middleware/checkBearerToken.js";

/* CONFIGURATION */
dotenv.config({ path: "./config.env" });

const router = express.Router();
let API_URL = process.env.BASE_URL;

let upload = multer();

// Get creatives
router.get("/:publicId", checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    let { show_archived, show_icons, creative_types } = req.query;
    if (!publicId) {
        return res.status(403).json({ error: 'Public ID is missing' });
    }
    axios({
        method: 'GET',
        url: `${API_URL}/creatives/${publicId}?show_archived=${show_archived}&show_icons=${show_icons}&creative_types=${creative_types}`,
        headers: {
            "Authorization": `Bearer ${req.token}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Get creatives : error from main API => ", err.response);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// ----------- Video ---------------
// Create video creative
router.post("/video/create/:publicId", upload.single("upload_file"), checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    let data = req.body;

    if (!data || Object.keys(data).length === 0 || !req.file) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    if (!publicId) {
        return res.status(403).json({ error: 'Public ID is missing' });
    }
    let BOUNDARY = "BOUNDARY"
    let BOUNDARY_DATA = `
    --${BOUNDARY}
Content-Disposition: form-data; name="upload_file"

${req?.file}
--${BOUNDARY}
Content-Disposition: form-data; name="click_url"

${data?.click_url}
--${BOUNDARY}
Content-Disposition: form-data; name="pixel_urls"

${data?.pixel_urls}
--${BOUNDARY}
Content-Disposition: form-data; name="creative_type"

--${data?.creative_type}
--${BOUNDARY}
Content-Disposition: form-data; name="language_id"

--${parseInt(data?.language_id)}

--${BOUNDARY}--
    `
    axios({
        method: 'POST',
        url: `${API_URL}/creatives/video/create/${publicId}`,
        data: BOUNDARY_DATA,
        headers: {
            "Authorization": `Bearer ${req.token}`,
            "Content-Type": `multipart/form-data; boundary=${BOUNDARY}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Create video creative : error from main API => ", err?.response?.data);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Put/Edit video creative
router.put("/video/update/:externalId", checkBearerToken, ((req, res) => {
    let { externalId } = req.params;
    let data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    if (!externalId) {
        return res.status(403).json({ error: 'External ID is missing' });
    }

    axios({
        method: 'PUT',
        url: `${API_URL}/creatives/video/update/${externalId}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${req.token}`,
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Update video creative : error from main API => ", err?.response?.data);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// ----------- Audio ---------------
// Create audio creative
router.post("/audio/create/:publicId", upload.single("upload_file"), checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    let data = req.body;

    if (!data || Object.keys(data).length === 0 || !req.file) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    if (!publicId) {
        return res.status(403).json({ error: 'Public ID is missing' });
    }
    let BOUNDARY = "BOUNDARY"
    let BOUNDARY_DATA = `
    --${BOUNDARY}
Content-Disposition: form-data; name="upload_file"

${req?.file}
--${BOUNDARY}
Content-Disposition: form-data; name="click_url"

${data?.click_url}
--${BOUNDARY}
Content-Disposition: form-data; name="pixel_urls"

${data?.pixel_urls}
--${BOUNDARY}
Content-Disposition: form-data; name="language_id"

--${parseInt(data?.language_id)}

--${BOUNDARY}--
    `
    axios({
        method: 'POST',
        url: `${API_URL}/creatives/audio/create/${publicId}`,
        data: BOUNDARY_DATA,
        headers: {
            "Authorization": `Bearer ${req.token}`,
            "Content-Type": `multipart/form-data; boundary=${BOUNDARY}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Create audio creative : error from main API => ", err?.response?.data);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Put/Edit audio creative
router.put("/audio/update/:externalId", checkBearerToken, ((req, res) => {
    let { externalId } = req.params;
    let data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    if (!externalId) {
        return res.status(403).json({ error: 'External ID is missing' });
    }

    axios({
        method: 'PUT',
        url: `${API_URL}/creatives/audio/update/${externalId}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${req.token}`,
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Update audio creative : error from main API => ", err?.response?.data);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// ----------- Display-Mobile ---------------
// Create display-mobile creative
router.post("/display-mobile/create/:publicId", upload.single("upload_file"), checkBearerToken, ((req, res) => {
    let { publicId } = req.params;
    let data = req.body;

    if (!data || Object.keys(data).length === 0 || !req.file) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    if (!publicId) {
        return res.status(403).json({ error: 'Public ID is missing' });
    }
    let BOUNDARY = "BOUNDARY"
    let BOUNDARY_DATA = `
    --${BOUNDARY}
Content-Disposition: form-data; name="upload_file"

${req?.file}
--${BOUNDARY}
Content-Disposition: form-data; name="click_url"

${data?.click_url}
--${BOUNDARY}
Content-Disposition: form-data; name="pixel_urls"

${data?.pixel_urls}
--${BOUNDARY}
Content-Disposition: form-data; name="js_pixel_url"

${data?.js_pixel_url}
--${BOUNDARY}
Content-Disposition: form-data; name="language_id"

--${parseInt(data?.language_id)}

--${BOUNDARY}--
    `
    axios({
        method: 'POST',
        url: `${API_URL}/creatives/display-mobile/create/${publicId}`,
        data: BOUNDARY_DATA,
        headers: {
            "Authorization": `Bearer ${req.token}`,
            "Content-Type": `multipart/form-data; boundary=${BOUNDARY}`
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Create display-mobile creative : error from main API => ", err?.response?.data);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

// Put/Edit display-mobile creative
router.put("/display-mobile/update/:externalId", checkBearerToken, ((req, res) => {
    let { externalId } = req.params;
    let data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(403).json({ error: 'Request body is missing' });
    }
    if (!externalId) {
        return res.status(403).json({ error: 'External ID is missing' });
    }

    axios({
        method: 'PUT',
        url: `${API_URL}/creatives/display-mobile/update/${externalId}`,
        data: data,
        headers: {
            "Authorization": `Bearer ${req.token}`,
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        return res.status(200).json({ msg: "OK", ...resp.data });
    }).catch((err) => {
        console.log("Update display-mobile creative : error from main API => ", err?.response?.data);
        return res.status(err.status || 400).json({ msg: err.message || "ERROR", err: err.response.data || {} });
    });
}));

export default router;
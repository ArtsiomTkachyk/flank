import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import checkBearerToken from '../middleware/checkBearerToken.js';

/* CONFIGURATION */
dotenv.config({ path: './config.env' });

const router = express.Router();
let API_URL = process.env.BASE_URL;

// Get all campaigns
router.get('/', checkBearerToken, (req, res) => {
  const { advertiser_public_identifier } = req.query;
  // Check if client_api_ref avail
  if (!advertiser_public_identifier) {
    return res.status(403).json({ error: 'Public identifier is missing' });
  }

  axios({
    method: 'GET',
    url: `${API_URL}/campaigns?advertiser_public_identifier=${advertiser_public_identifier}`,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Get All Campaigns: error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Get single campaign
router.get('/:publicId', checkBearerToken, (req, res) => {
  let { publicId } = req.params;
  if (!publicId) {
    return res.status(403).json({ error: 'Public identifier ID is missing' });
  }
  axios({
    method: 'GET',
    url: `${API_URL}/campaigns/view/${publicId}`,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Get Campaign: error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Create new campaign
router.post('/create', checkBearerToken, (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(403).json({ error: 'Request body is missing' });
  }
  axios({
    method: 'POST',
    url: `${API_URL}/campaigns/create`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Campaigns/create : error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update and existing campaign
router.put('/update/:publicId', checkBearerToken, (req, res) => {
  let data = req.body;
  let { publicId } = req.params;
  if (!publicId) {
    return res.status(405).json({ error: 'Public identifier ID is missing' });
  }
  if (!data) {
    return res.status(403).json({ error: 'Request body is missing' });
  }
  axios({
    method: 'PUT',
    url: `${API_URL}/campaigns/update/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Campaigns/update/:publicId : error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update campaign status
router.put('/status/:publicId', checkBearerToken, (req, res) => {
  let data = req.body;
  let { publicId } = req.params;
  if (!publicId) {
    return res.status(405).json({ error: 'Public identifier ID is missing' });
  }
  if (!data) {
    return res.status(403).json({ error: 'Request body is missing' });
  }
  axios({
    method: 'PUT',
    url: `${API_URL}/campaigns/status/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Campaigns/update/:publicId : error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

export default router;

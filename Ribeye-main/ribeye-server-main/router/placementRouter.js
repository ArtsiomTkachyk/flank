import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import checkBearerToken from '../middleware/checkBearerToken.js';

/* CONFIGURATION */
dotenv.config({ path: './config.env' });

const router = express.Router();
let API_URL = process.env.BASE_URL;

// Get all placements
router.get('/', checkBearerToken, (req, res) => {
  const { campaign_public_identifier, status } = req.query;

  // Check if client_api_ref avail
  if (!campaign_public_identifier) {
    return res.status(403).json({ error: 'Public identifier is missing' });
  }

  axios({
    method: 'GET',
    url: `${API_URL}/placements?campaign_public_identifier=${campaign_public_identifier}&status=${status}`,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Get All Placements: error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Get single placement
router.get('/:publicId', checkBearerToken, (req, res) => {
  let { publicId } = req.params;
  if (!publicId) {
    return res.status(403).json({ error: 'Public identifier ID is missing' });
  }
  axios({
    method: 'GET',
    url: `${API_URL}/placements/view/${publicId}`,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Get a single Placement: error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Create new placement
router.post('/create', checkBearerToken, (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(403).json({ error: 'Request body is missing' });
  }
  axios({
    method: 'POST',
    url: `${API_URL}/placements/create`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log('Create new Placement: error from main API => ', err);
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update and existing placement
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
    url: `${API_URL}/placements/update/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log(
        'Update and existing Placement: error from main API => ',
        err
      );
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update placement name
router.put('/name/:publicId', checkBearerToken, (req, res) => {
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
    url: `${API_URL}/placements/name/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log(
        'Update and existing Placement: error from main API => ',
        err
      );
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update placement status
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
    url: `${API_URL}/placements/status/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log(
        'Update and existing Placement: error from main API => ',
        err
      );
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update placement bid
router.put('/bid/:publicId', checkBearerToken, (req, res) => {
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
    url: `${API_URL}/placements/bid/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log(
        'Update and existing Placement: error from main API => ',
        err
      );
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

// Update placement budget
router.put('/budget/:publicId', checkBearerToken, (req, res) => {
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
    url: `${API_URL}/placements/budget/${publicId}`,
    data: data,
    headers: {
      Authorization: `Bearer ${req.token}`,
    },
  })
    .then((resp) => {
      return res.status(200).json({ msg: 'OK', ...resp.data });
    })
    .catch((err) => {
      console.log(
        'Update and existing Placement: error from main API => ',
        err
      );
      return res
        .status(err.status || 400)
        .json({ msg: err.message || 'ERROR', err: err.response.data || {} });
    });
});

export default router;

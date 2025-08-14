const express = require('express');
const router = express.Router();
const {
  getLogs,
  createLog,
  getSummary
} = require('../controllers/logController.js');

router.get('/', getLogs);
router.post('/', createLog);
router.get('/summary', getSummary);

module.exports = router;

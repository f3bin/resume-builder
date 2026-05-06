const express = require('express');
const router = express.Router();
const { getResume, saveResume, updateTemplate } = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getResume);
router.put('/', authMiddleware, saveResume);
router.patch('/template', authMiddleware, updateTemplate);

module.exports = router;

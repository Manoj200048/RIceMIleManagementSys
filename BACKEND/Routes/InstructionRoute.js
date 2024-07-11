// routes/textRoutes.js

const express = require('express');
const router = express.Router();
const textController = require('../Controllers/InstructionController');

router.get('/', textController.getText);
router.post('/', textController.saveText);

module.exports = router;

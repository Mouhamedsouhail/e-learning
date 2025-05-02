const express = require("express");
const router = express.Router();
const assistantController = require("../controllers/assistant.controller");

// @route   POST /api/assistant/message
// @desc    Handle chatbot message
// @access  Public // Or Private if authentication is needed
router.post("/message", assistantController.handleMessage);

module.exports = router;

const express = require("express");
const router = express.Router();
const {authMiddleware , adminAuth} = require("../middleware/authentication")
const {
    getCurrentSettings,
    updateSettings
} = require("../controllers/settings");

router.get("/", authMiddleware, adminAuth, getCurrentSettings);
router.patch("/", authMiddleware, adminAuth, updateSettings);

module.exports = router;

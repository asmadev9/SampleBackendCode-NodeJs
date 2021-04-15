const express = require("express");
const Toy = require("../modals/Buddies");
const { protect, authorize } = require("../middleware/auth");
const { addBuddy, getBuddies } = require("../controllers/buddies");
const router = express.Router();

router.route("/").put(addBuddy).get(protect, getBuddies);

module.exports = router;

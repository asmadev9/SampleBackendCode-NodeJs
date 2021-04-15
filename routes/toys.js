const express = require("express");
const Toy = require("../modals/Toys");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { addToy, getUserToys, getAllToys } = require("../controllers/toys");

router.route("/").get(protect, getAllToys).post(protect, addToy);
router.route("/user").get(protect, getUserToys);

module.exports = router;

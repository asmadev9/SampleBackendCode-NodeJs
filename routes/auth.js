const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  resetToken,
  getCurrentUser,
  updateUser,
  uploadProfilePhoto,
  // appleSignin,
} = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.post("/resettoken", resetToken);
// router.post("/sign-in-with-apple", appleSignin);
router.get("/me", protect, getCurrentUser);
router.put("/uploadphoto/:id", protect, uploadProfilePhoto);
router.put("/updateuser", protect, updateUser);

module.exports = router;

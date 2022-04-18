const express = require("express");
const router = require("express").Router();

const {
  registerUser,
  userLogin,
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUsers,
  updateUser,
} = require("../controllers/userControllers");

const {protect, admin}  = require('../middleware/authMiddleware')

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", userLogin);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router
    .route('/:id')
    .get(protect,  getUserById)
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser)

module.exports = router;

const express = require("express");
const userController = require("../../../src/controllers/userController");
const postController = require("../../../src/controllers/postController");
const router = express.Router();


router.post("/signup",userController.signup);
router.get("/signin",userController.login);
router.get("/forgetPassword",userController.forgetPassword);
router.post("/post/add",userController.isAuthenticated,postController.addPost);
router.get("/post/get",userController.isAuthenticated,postController.fetchPost);
router.get("/post/filter",userController.isAuthenticated,postController.filter);

module.exports = router;
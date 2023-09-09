// routes.js
const express = require('express');
const { getadminUserList, AdminAdduser } = require("../controllers/UserControllers");
// const passport = require("passport");

const {  secureMiddleware } = require("../middleware/secureMiddleware");
const { userVerification } = require('../middleware/authentication');
const router = express.Router();
// router.use(jwtAuth);

router.post("/Adminsignup",secureMiddleware, AdminAdduser,(req, res) => {
  
   const { user } = req;
 
   // Your code to handle the protected resource
   res.json({ message: 'Access to protected resource granted', user });
 });
router.post('/', userVerification)

router.get("/users", getadminUserList);

module.exports = router;

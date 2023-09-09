const express=require("express")
const routerenrollment=express.Router();
const {  getsignup, findsignup, deletesignup,  signup } = require("../controllers/SignupControllers");



routerenrollment.post("/",signup);
routerenrollment.get("/get",getsignup);
routerenrollment.get("/findenroll/:id",findsignup)
routerenrollment.delete("/deletesignup/:id",deletesignup);

module.exports=routerenrollment;
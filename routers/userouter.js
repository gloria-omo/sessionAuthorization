const express = require("express");
const router = express.Router();
const { signUp, logIn, getAll, logOut, home ,socalAuth,callBack} = require("../controllers/userController");
const { isloggedIn } = require("../middleware/session");



 router.post("/sign-up",signUp);
 router.post("/log-in",logIn);
 router.get("/sociallogin", async(req,res)=>{
    res.redirect("http://localhost:5000/auth/google/callback")
 })

 router.get("/auth/google/callback",socalAuth)
 router.get("auth/google/success",async(req,res)=>{
    req.session.user = req.user
 })

 router.get("/log-out",logOut);
 router.get("/get-all",isloggedIn,getAll);
 router.get("/home",isloggedIn,home);


module.exports = router  
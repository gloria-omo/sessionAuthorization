const express = require("express");
const router = express.Router();
const { signUp, logIn, getAll, logOut } = require("../controllers/userController");
const { isloggedIn } = require("../middleware/session");



 router.post("/sign-up",signUp);
 router.post("/log-in",logIn);
 router.get("/log-out",logOut);
 router.get("/get-all",isloggedIn,getAll);



module.exports = router  
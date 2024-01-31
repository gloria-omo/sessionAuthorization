const express = require("express");
const config = require("./config")
const session = require("express-session")
const userRouter = require("./routers/userouter");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;


const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.sessionKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

// initialize passport
app.use(passport.initialize());
// integrate passsport with our session auth
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID:     process.env.clientId,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  // passReqToCallback   : true
},
(request, accessToken, refreshToken, profile, done)=>{

    return done(err, profile);
 
}
));
// 
passport.serializeUser((user,done)=>{
  return done(null,user)
})

passport.deserializeUser((user,done)=>{
  return done(null,user)
})




app.use("/api",userRouter);

const port = process.env.port;
app.listen(port,()=>{
    console.log(`server is listening to port: ${port}`)
});
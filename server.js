const express = require("express");
const config = require("./config")
const session = require("express-session")
const userRouter = require("./routers/userouter");
require("dotenv").config();


const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.sessionKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use("/api",userRouter);

const port = process.env.port;
app.listen(port,()=>{
    console.log(`server is listening to port: ${port}`)
});
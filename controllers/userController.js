const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const passport =require("passport");
exports.signUp = async(req,res)=>{
    try{
        const {fullName,email,password,confirmPassword} = req.body;
        const checkEmail = await userModel.findOne({email});
        if(checkEmail){
            return res.status(400).json({
                message:"user already exist"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"password does nor match"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);

        const user = await userModel.create({
            fullName,
            email,
            password:hash
        });

        res.status(200).json({
            message:"user created",
            data:user
        })


    }catch(error){
        res.status(500).json({
            error:`unable to sign-up${error.message}`
        })
    }
}

exports.logIn = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }
        const checkPassword = bcrypt.compareSync(password,user.password);
        if(!checkPassword){
            return res.status(400).json({
                message:"incorrect password"
            })
        }
        req.session.user = user;

        res.status(200).json({
            message:"log-in successfully"
        })

    }catch(error){
        res.status(500).json({
            error:`unable to log-in${error.message}`
        })
    
    }
};

exports.getAll = async (req,res)=>{
    try{
    const allUser = await userModel.find();
    if(allUser.length === 0){
        return res.status(400).json({
            message:"no user found"
        })
    }
    res.status(200).json({
        message:`There are ${allUser.length} user `,
        data:allUser
    })
    }
    catch(error){
        res.status(500).json({
            error:`unable to get-all${error.message}`
        })
    }
}

exports.logOut = async (req,res)=>{
    try{
        req.session.destroy();
        res.status(200).json({
            message:"log Out successful"
        })
    }

    catch(error){
        res.status(500).json({
            error: `unable to log-out${error.message}`
        })
    }
};

exports.home = async (req,res)=>{
    try{
  res.status(200).json({
    message: `welcome ${req.session.user.fullName.split(" ")[0]} to the home page `
  })
    }
    catch(error){
        res.status(500).json({
            error: `${error.message}`
        })
    }
}

exports.socalAuth = passport.authenticate("google",{scope:["email","profile"]})

exports.callBack = passport.authenticate("google",{
    successRedirect:"auth/google/success",
    failureRedirect:"auth/google/failure"
})
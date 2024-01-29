

exports.isloggedIn = async(req,res,next)=>{
if (!req.session.user){
    return res.status(401).json({
        message:"Not authorized to perform this action"
    })
}
next();
}
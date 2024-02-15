import jwt from "jsonwebtoken";


function verifyToken(req,res,next){
    
    if(req.headers.authorization!==undefined){
        let token =  req.headers.authorization.split(" ")[1];
        jwt.verify(token,"nutrify",(err,data)=>{
            if(!err)
            {
                console.log(data)
                next();
            }
            else 
            {
                res.status(403).send({message:"Invalid Token"})
            }
        })
    }
    else 
    {
        res.send({message:"Please send a token"})
    }
    
    
}

export default verifyToken

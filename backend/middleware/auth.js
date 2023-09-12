import client from "../models/clientSchema.js"

const isAuthenticated = async(req,res)=>{
    try{
        if(req.client==undefined){
            res.status(400).json({
                success:false
            })
        }
        else{
            const emailid=req.client.email;
            const client = await client.find({email:emailid})

            if(client)next();
            else {
                res.status(400).json({
                    success:false
                })
            }
        }
    }catch(e){
        res.status(400).json({
            success:false
        })
    }
}

export default isAuthenticated;
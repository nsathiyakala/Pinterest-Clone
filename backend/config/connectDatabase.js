const mongoose= require("mongoose")

const ConnectDatabase=()=>{
    mongoose.connect(process.env.MONGO_URL).then((con)=>{
        console.log("mogoose connected to database "+ con.connection.host);
        
    })

}

module.exports=ConnectDatabase
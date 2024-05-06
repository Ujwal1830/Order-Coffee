import mongoose from "mongoose";


export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("DB connection Success😁👍");
        })
        connection.on('error', (err)=>{
            console.log("DB connection Failed!☹️🥲. Error:: "+err);
            process.exit();
        })
    } catch (error) {
        console.log("Connection Failed!");
        console.log(error);
    }
}
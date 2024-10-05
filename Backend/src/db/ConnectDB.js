import mongoose from "mongoose";



const connetDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log(`\nMongoDB Connected || DB Host : ${connectionInstance.connection.host}`)

    } catch (error) {
        console.error("Mongod Connection Error", error);
        process.exit(1);
    }
}

export default connetDB;
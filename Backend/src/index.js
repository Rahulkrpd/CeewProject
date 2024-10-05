import dotenv from "dotenv"
import { app } from "./app.js"
import connetDB from "./db/ConnectDB.js"


dotenv.config({
    path: "./.env"
})


const port = process.env.PORT || 4000

connetDB();
app.get("/", (req, res) => {
    res.send("Server is running")
})


app.listen(port, () => {
    console.log(`Server is running on port  ${port}`)
})

import express from "express"
import cors from "cors"
import themeRouter from "./routes/ThemeRoute.js";


const app = express();
app.use(express.json());
app.use(cors())



// Api end point
app.use("/api", themeRouter)






export { app }
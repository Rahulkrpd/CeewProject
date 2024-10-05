import express from "express"
import { addData, getData, getSubTheme, getTheme } from "../controllers/ThemeController.js";
const themeRouter = express.Router();

themeRouter.post("/add", addData);
themeRouter.get("/get", getData);
themeRouter.get("/getTheme", getTheme);
themeRouter.get("/getSubTheme", getSubTheme);



export default themeRouter;
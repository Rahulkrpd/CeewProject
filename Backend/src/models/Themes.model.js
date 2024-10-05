import mongoose from "mongoose";


const themeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Spatial", "Non Spatial"],
        require: true
    },
    themeName: {
        type: String, require: true
    },
    SubTheme: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTheme"
    }]

})

export const Theme = mongoose.model("Theme", themeSchema)

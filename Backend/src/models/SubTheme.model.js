import mongoose from "mongoose"

const subThemeScheme = new mongoose.Schema({
    subThemeName: {
        type: String, required: true,
    },
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DetailTheme"
    }]

    
})

export const SubTheme = mongoose.model("SubTheme",subThemeScheme);
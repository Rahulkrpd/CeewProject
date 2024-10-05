import mongoose from "mongoose"

const detailSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        required: true
    },
    Resolution: {
        type: String,
        required: true
    },
    granularity: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    spatialResolution: {
        type: String,

    }

})

export const DetailTheme = mongoose.model('DetailTheme', detailSchema)
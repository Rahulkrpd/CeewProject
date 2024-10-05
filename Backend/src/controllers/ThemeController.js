import { Theme } from "../models/Themes.model.js";
import { SubTheme } from "../models/SubTheme.model.js";
import { DetailTheme } from "../models/DetailTheme.models.js";



const addData = async (req, res) => {
    const { type, themeName, subThemeName, detailData } = req.body;

    try {
        console.log("Request Body:", req.body);

        // Check if the DetailTheme already exists based on its title
        let detailTheme = await DetailTheme.findOne({ title: detailData.title });
        if (!detailTheme) {
            // console.log("DetailTheme not found. Creating new DetailTheme.");
            detailTheme = await DetailTheme.create(detailData);
        } else {
            console.log("DetailTheme found:", detailTheme);
        }

        // Check if the SubTheme already exists based on its name
        let subTheme = await SubTheme.findOne({ subThemeName });
        if (subTheme) {
            if (!subTheme.details.includes(detailTheme._id)) {
                subTheme.details.push(detailTheme._id);
                await subTheme.save();
                // console.log(`Added DetailTheme to existing SubTheme: ${subThemeName}`);
            }
        } else {
            console.log("SubTheme not found. Creating new SubTheme.");
            subTheme = await SubTheme.create({
                subThemeName,
                details: [detailTheme._id],
            });
        }

        // Check if the Theme already exists based on its type and name
        let theme = await Theme.findOne({ type, themeName });
        if (theme) {
            if (!theme.SubTheme.includes(subTheme._id)) {
                theme.SubTheme.push(subTheme._id);
                await theme.save();
                // console.log(`Added SubTheme to existing Theme: ${themeName}`);
            }
        } else {
            console.log("Theme not found. Creating new Theme.");
            theme = await Theme.create({
                type,
                themeName,
                SubTheme: [subTheme._id],
            });
        }

        // console.log("Theme after creation or update:", theme);

        // Send back the final theme object
        res.status(200).json({ message: "Data inserted/updated successfully", theme });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};



const getData = async (req, res) => {

    const { themeName, subThemeName, detailTitle } = req.query;

    try {
        const themeQuery = themeName ? { themeName } : {};
        const subThemeQuery = subThemeName ? { subThemeName } : {};
        const detailQuery = detailTitle ? { title: new RegExp(detailTitle, "i") } : {}

        const themes = await Theme.find(themeQuery)
            .populate({
                path: "SubTheme",
                match: subThemeQuery,
                populate: {
                    path: "details",
                    match: detailQuery,
                },
            })
            .exec();

        res.status(200).json({ themes });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "An error occurred while fetching data" });

    }
}


const getDetail = async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: "Title query parameter is required" });
    }

    try {
        // Find details based on the provided title (case-insensitive match)
        const details = await DetailTheme.find({ title: new RegExp(title, "i") });
        res.status(200).json({ details });
    } catch (error) {
        console.error("Error fetching detail by title:", error);
        res.status(500).json({ error: "An error occurred while fetching details by title" });
    }
}


const getTheme = async (req, res) => {
    try {
        // Fetch all themes and exclude the `SubTheme` field
        const themes = await Theme.find({}, { SubTheme: 0 });
        res.status(200).json({ themes });
    } catch (error) {
        console.error("Error fetching themes:", error);
        res.status(500).json({ error: "An error occurred while fetching themes" });
    }
}


const getSubTheme = async (req, res) => {
    try {
        // Fetch all subthemes and exclude the `details` field
        const subThemes = await SubTheme.find({}, { details: 0 });
        res.status(200).json({ subThemes });
    } catch (error) {
        console.error("Error fetching subthemes:", error);
        res.status(500).json({ error: "An error occurred while fetching subthemes" });
    }
}





export { addData, getData, getDetail, getTheme, getSubTheme };
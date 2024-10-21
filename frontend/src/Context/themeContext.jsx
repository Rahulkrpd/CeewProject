import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";


export const StoreContext = createContext();


export const StoreProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedSubTheme, setSelectedSubTheme] = useState(null);
    const [subThemes, setSubThemes] = useState([]);
    const [details, setDetails] = useState([]);

    const [searchValue, setSearchValue] = useState("")

<<<<<<< HEAD


=======
>>>>>>> b4831c6cc97753ae108927bef68a90b7eebb6ed6
    // let url = "http://localhost:5000"
    let url = "https://ceewproject-backend.onrender.com"

    const initialData = {
        themes: [
            {
                _id: "67009f025a0461d0466e064e",
                type: "Non Spatial",
                themeName: "Climate Change",
                SubTheme: [
                    {
                        _id: "67009e5739bbf80c30488a07",
                        subThemeName: "Global Warming",
                        details: [
                            {
                                _id: "67009f025a0461d0466e0649",
                                title: "Impact of Global Warming on Sea Levels",
                                link: "https://example.com/global-warming-sea-levels",
                                Resolution: "Global",
                                granularity: "Yearly",
                                period: "2000-2021",
                                source: "Climate Research Center",
                                organization: "World Climate Organization",
                                description: "Details on how global warming is impacting sea levels.",
                                keywords: ["global warming", "sea levels", "climate change"],
                                spatialResolution: "Monthly",
                                __v: 0
                            }
                        ],
                        __v: 1
                    }
                ],
                __v: 0
            },

        ],
    };

    const getdata = async () => {
        try {
            const response = await axios.get(`${url}/api/get`);
            if (response) {
                setData(response.data);

            } else {
                setData(initialData);
            }
        } catch (err) {
            console.error("Failed to load data", err);
            setData(initialData);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        if (data && selectedTheme) {
            const theme = data.themes.find((theme) => theme._id === selectedTheme);
            setSubThemes(theme ? theme.SubTheme : []);
            setSelectedSubTheme(null);
            setDetails([]);
        }
    }, [selectedTheme, data]);


    useEffect(() => {
        if (selectedSubTheme) {
            const subTheme = subThemes.find((subTheme) => subTheme._id === selectedSubTheme);
            setDetails(subTheme ? subTheme.details : []);
        }
    }, [selectedSubTheme, subThemes]);


    return (
        <StoreContext.Provider
            value={{
                themes: data ? data.themes : [],
                loading,

                setSelectedTheme,
                setSelectedSubTheme,
                selectedTheme,
                subThemes,
                selectedSubTheme,
                details,
                searchValue,
                setSearchValue,
                url
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};


StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
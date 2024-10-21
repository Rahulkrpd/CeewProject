import { useContext, useState, useEffect } from 'react';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import FormModal from './FormModal';
import { StoreContext } from '../../Context/themeContext';
import axios from 'axios';

const Navbar = ({ onAddButtonClick }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const { setSearchValue, url, themes, searchValue } = useContext(StoreContext);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
    };

    const handleAddNew = async (data) => {
        try {
            const response = await fetch(`${url}/api/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setShowModal(false);
                onAddButtonClick();
            } else {
                throw new Error('Failed to add data');
            }
        } catch (error) {
            console.log("Error in adding data", error);
        }
    };


    const [subTheme, setSubTheme] = useState([])

    const getSubTheme = async () => {
        try {
            const response = await axios.get(`${url}/api/getSubTheme`)
            if (response && Array.isArray(response.data.subThemes)) {
                setSubTheme(response.data.subThemes)
            } else {
                console.error("Invalid data format received:", response.data.subThemes)
            }
        } catch (error) {
            console.error("Failed to fetch subtheme:", error)
        }
    }

    useEffect(() => {
        getSubTheme()


    }, [])


    console.log(searchValue)







    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo" onClick={() => navigate('/')}>Public Data Directory</div>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    className="navbar-search"
                />
                <div className="filterbtn">
                    {/* Type of data */}
                    <select name="type" id="type"
                        onChange={(e) => { setSearchValue(e.target.value) }}>
                        <option value="type">Type</option>
                        {Array.from(new Set(themes.map(theme => theme.type))).map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>

                    {/* Theme filter */}
                    <select name="theme" id="theme"
                        onChange={(e) => setSearchValue(e.target.value)}
                        aria-label='theme-filter'>
                        <option value="theme">Theme</option>
                        {Array.from(new Set(themes.map(theme => theme.themeName))).map((themeName, index) => (
                            <option key={index} value={themeName}>{themeName}</option>
                        ))}
                    </select>

                    {/* Subtheme filter */}
                    <select name="subtheme" id="subtheme">
                        <option value="subtheme">Subtheme</option>
                        {Array.isArray(subTheme) && subTheme.map((sub, index) => (
                            <option key={index} value={sub.subThemeName}>{sub.subThemeName}</option>
                        ))}
                    </select>

                    {/* Details filter */}

                </div>

                <div className="navBtn">
                    <button className="applyfilter"> Apply Filter</button>
                    <button className="applyfilter" id='addnew' onClick={() => setShowModal(true)}>
                        Add New
                    </button>
                </div>
            </nav>

            {showModal && (
                <FormModal onClose={() => setShowModal(false)} onSave={handleAddNew} />
            )}
        </>
    );
};

export default Navbar;

import { useContext, useState } from 'react';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import FormModal from './FormModal';
import { StoreContext } from '../../Context/themeContext';


const Navbar = ({ onAddButtonClick }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const { setSearchValue, url } = useContext(StoreContext)

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value)
    };








    const handleAddNew = async (data) => {
        try {
            const response = await fetch(`${url}api/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {

                setShowModal(false);
                onAddButtonClick(); // refresh or update your data here if needed
            } else {
                throw new Error('Failed to add data');
            }
        } catch (error) {
            console.log("Error in adding data", error)
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo" onClick={() => navigate('/')}>Theme Explorer</div>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    className="navbar-search"
                />
                <button className="navbar-add-button" onClick={() => setShowModal(true)}>
                    Add New
                </button>
            </nav>
            {showModal && (
                <FormModal onClose={() => setShowModal(false)} onSave={handleAddNew} />
            )}

        </>
    );
};

export default Navbar;

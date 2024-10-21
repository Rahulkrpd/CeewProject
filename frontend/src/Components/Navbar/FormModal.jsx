import { useState, useContext } from 'react';
import axios from 'axios';
import "./FormModal.css";
import { StoreContext } from '../../Context/themeContext';

const FormModal = ({ onClose, onSave }) => {
    const { url } = useContext(StoreContext)
    const [formData, setFormData] = useState({
        type: 'Non Spatial', // Default selection
        themeName: '',
        subThemeName: '',
        title: '',
        link: '',
        description: '',
        keywords: '',
        resolution: '',
        granularity: '',
        period: '',
        source: '',
        organization: '',
        spatialResolution: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        
        const requiredFields = ['themeName', 'subThemeName', 'title', 'link', 'description', 'keywords', 'resolution', 'source'];

        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Error: ${field} is required!`);
                return;
            }
        }

        
        const detailData = {
            title: formData.title,
            link: formData.link,
            Resolution: formData.resolution,
            granularity: formData.granularity || 'NA', 
            period: formData.period || 'NA', 
            source: formData.source,
            organization: formData.organization || 'null', 
            description: formData.description,
            keywords: formData.keywords.split(',').map(keyword => keyword.trim()),
            spatialResolution: formData.spatialResolution || 'NA', 
        };

        try {
            const response = await axios.post(`${url}/api/add`, {
                type: formData.type, 
                themeName: formData.themeName,
                subThemeName: formData.subThemeName,
                detailData
            });

            
            alert(response.data.message || 'Data saved successfully!');
            onSave(); 
            onClose(); 
        } catch (error) {
            alert('Error saving data: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div className="form-modal">
            <div className="form-container">
                <h2>Add New Data</h2>

                <label htmlFor="type">Data Type:</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="Non Spatial">Non Spatial</option>
                    <option value="Spatial">Spatial</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="text"
                    name="themeName"
                    placeholder="Theme Name"
                    value={formData.themeName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="subThemeName"
                    placeholder="SubTheme Name"
                    value={formData.subThemeName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Detail Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="link"
                    placeholder="Link"
                    value={formData.link}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="resolution"
                    placeholder="Resolution"
                    value={formData.resolution}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="granularity"
                    placeholder="Granularity (optional)"
                    value={formData.granularity}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="period"
                    placeholder="Period (optional)"
                    value={formData.period}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="source"
                    placeholder="Source"
                    value={formData.source}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="organization"
                    placeholder="Organization (optional)"
                    value={formData.organization}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="keywords"
                    placeholder="Keywords (comma separated)"
                    value={formData.keywords}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="spatialResolution"
                    placeholder="Spatial Resolution (optional)"
                    value={formData.spatialResolution}
                    onChange={handleChange}
                />
                <div className="form-buttons">
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default FormModal;

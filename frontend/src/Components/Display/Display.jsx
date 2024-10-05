import "./Display.css";
import { Link } from "react-router-dom";

const Display = ({ detail, onBack }) => {
    return (
        <div className="display-container">
            <h1>{detail.title}</h1>
            <hr />
            <p><strong>Description:</strong> {detail.description}</p>

           

            
            <p><strong>Source:</strong> {detail.source}</p>
            
            <p>
                <strong>Dataset:</strong> 
                <a href={detail.link} target="_blank" rel="noopener noreferrer" className="dataset-link">
                    {detail.link}
                </a>
            </p>

            <p><strong>Organization:</strong> {detail.organization}</p>
            <p><strong>Granularity:</strong> {detail.granularity}</p>
            <p><strong>Period:</strong> {detail.period}</p>
            <p><strong>Resolution:</strong> {detail.Resolution}</p>
            <p><strong>Spatial Resolution:</strong> {detail.spatialResolution}</p>
            <p><strong>Keywords:</strong> {detail.keywords?.join(', ')}</p>

            {/* Back Button */}
            <button onClick={onBack} className="back-button">
                Go Back
            </button>
        </div>
    );
};

export default Display;

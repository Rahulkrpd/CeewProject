import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../Components/Cards/Card";
import { StoreContext } from "../Context/themeContext";

const SubThemePage = () => {
  const { selectedTheme, subThemes, setSelectedSubTheme, loading, error, searchValue } = useContext(StoreContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading subthemes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedTheme) {
    return <div>Please select a theme to see subthemes...</div>;
  }

  const handleSubThemeClick = (subThemeId) => {
    setSelectedSubTheme(subThemeId); // Update the selected subtheme ID in context
    navigate('/details'); // Navigate to the details page
  };

  return (
    <div className="page-container">
      {subThemes.filter((item) => item.subThemeName.toLowerCase().includes(searchValue)).map((subTheme) => (
        <Card
          key={subTheme._id}
          title={subTheme.subThemeName}
          description={`Details: ${subTheme.details.length}`}
          onClick={() => handleSubThemeClick(subTheme._id)} // Handle click event
        />
      ))}


      <div className='back-button-container'>
        <button onClick={() => navigate('/')} className="back-button">Go Back</button>
      </div>

    </div>
  );
};

export default SubThemePage;

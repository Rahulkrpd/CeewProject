import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "../Components/Cards/Card";
import { StoreContext } from "../Context/themeContext";

const ThemePage = () => {
  const { themes, setSelectedTheme, loading, error, searchValue } = useContext(StoreContext);
  const navigate = useNavigate();


  if (loading) {
    return <div>Loading themes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId); 
    navigate('/subthemes'); 
  };

  return (
    <div className="page-container">
      {themes.filter((item) => item.themeName.toLowerCase().includes(searchValue)).map((theme) => (
        <Card
          key={theme._id}
          title={theme.themeName}
          description={`Type: ${theme.type}`}
          onClick={() => handleThemeClick(theme._id)} // Handle click event
        />
      ))}
    </div>
  );
};

export default ThemePage;

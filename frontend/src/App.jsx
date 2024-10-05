import { useState } from "react";
import ThemePage from "./pages/ThemePage";
import SubThemePage from "./pages/SubThemePage";
import DetailPage from "./pages/DetailPage";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { StoreProvider } from "./Context/themeContext";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    
  };

  return (
    <StoreProvider>
      <Navbar searchValue={searchValue} onSearchChange={handleSearch} />
      <Routes>
        <Route path="/" element={<ThemePage />} />
        <Route path="/subthemes" element={<SubThemePage />} />
        <Route path="/details" element={<DetailPage />} />
      </Routes>
    </StoreProvider>
  );
}

export default App;

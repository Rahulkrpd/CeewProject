import { useContext, useState } from 'react';
import Card from "../Components/Cards/Card";
import { StoreContext } from "../Context/themeContext";
import Display from '../Components/Display/Display';

const DetailPage = () => {
  const { selectedSubTheme, details, loading, searchValue } = useContext(StoreContext);
  const [selectedDetail, setSelectedDetail] = useState(null);



  if (!selectedSubTheme || loading) {
    return <div>Please select a subtheme to see details...</div>;
  }

  return (
    <div className="page-container">

      {selectedDetail ? (
        <Display
          detail={selectedDetail}
          onBack={() => setSelectedDetail(null)}
        />
      ) : (
        
        <div className="card-container">
          {details.filter((item) => item.title.toLowerCase().includes(searchValue)).map((detail) => (
            <Card
              key={detail._id}
              title={detail.title}
              description={`Description: ${detail.description}`}
              onClick={() => setSelectedDetail(detail)} 
            />
          ))}
        </div>
      )}


    </div>
  );
};

export default DetailPage;

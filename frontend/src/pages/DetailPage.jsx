import { useContext, useState } from 'react';
import Card from "../Components/Cards/Card";
import { StoreContext } from "../Context/themeContext";
import Display from '../Components/Display/Display';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const { selectedSubTheme, details, loading, searchValue } = useContext(StoreContext);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const navigate = useNavigate();


  if (!selectedSubTheme || loading) {
    return <div>Please select a subtheme to see details...</div>;
  }

  return (
    <div className="page-container">

      {selectedDetail ? (
        <Display
          detail={selectedDetail}

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

      <div className='back-button-container'>
        <button onClick={() => navigate('/subthemes')} className="back-button">Go Back</button>
      </div>


    </div>
  );
};

export default DetailPage;

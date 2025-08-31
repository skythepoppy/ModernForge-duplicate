import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from './HomeSectionCard';

const HomeSectionCarousel = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4 },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/cartoystoys'); // your backend API URL
        const data = await response.json();

        // Map your data to match expected structure and handle image paths
        const mappedData = data.map(item => ({
          imageSrc: `/assets/${item.image}`, // assuming images are served from public/assets
          title: item.title,
          description: item.description,
        }));

        setCardData(mappedData);
      } catch (error) {
        console.error('Error fetching toy data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const items = cardData.map((card, index) => (
    <HomeSectionCard
      key={index}
      imageSrc={card.imageSrc}
      title={card.title}
      description={card.description}
    />
  ));

  if (loading) {
    return <p>Loading toys...</p>;
  }

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <AliceCarousel
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
        responsive={responsive}
      />
    </div>
  );
};

export default HomeSectionCarousel;

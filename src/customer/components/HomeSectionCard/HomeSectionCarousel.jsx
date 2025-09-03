import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from './HomeSectionCard';

const HomeSectionCarousel = ({ category, status, limit = 5 }) => {
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
        // Construct URL with query params
        const url = new URL('http://localhost:5050/api/toys');
        if (category) url.searchParams.append('category', category);
        if (status) url.searchParams.append('status', status);

        console.log('Fetching toys from:', url.toString());

        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched toy data:', data);

        // Map the data and limit to first `limit` items
        const mappedData = data
          .map(item => ({
            imageSrc: item.imageUrl,
            brand: item.brand,
            title: item.title,
            price: item.price,
            discountedPrice: item.discountedPrice,
          }))
          .slice(0, limit); // <-- frontend limiting

        setCardData(mappedData);
      } catch (error) {
        console.error('Error fetching toy data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category, status, limit]);

  const items = cardData.map((card, index) => (
    <HomeSectionCard
      key={index}
      imageSrc={card.imageSrc}
      brand={card.brand}
      title={card.title}
      price={card.price}
      discountedPrice={card.discountedPrice}
    />
  ));

  if (loading) return <p>Loading toys...</p>;

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

import React, { useState, useEffect, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from './HomeSectionCard';

const HomeSectionCarousel = ({ category, status, limit = 5, autoPlay = false, showArrows }) => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null); // ref to control carousel

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4 },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL('https://collaborative-hidden-competitions-taste.trycloudflare.com/api/toys');
        if (category) url.searchParams.append('category', category);
        if (status) url.searchParams.append('status', status);

        const response = await fetch(url);
        const data = await response.json();

        const mappedData = data
          .map(item => ({
            id: item.id,
            imageSrc: item.imageUrl,
            brand: item.brand,
            title: item.item,
            price: item.price,
            discountedPrice: item.discountedPrice,
          }))
          .slice(0, limit);

        setCardData(mappedData);
      } catch (error) {
        console.error('Error fetching toy data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category, status, limit]);

  const items = cardData.map((card) => (
    <HomeSectionCard
      key={card.id}
      id={card.id}
      imageSrc={card.imageSrc}
      brand={card.brand}
      title={card.title}
      price={card.price}
      discountedPrice={card.discountedPrice}
    />
  ));

  if (loading) return <p>Loading toys...</p>;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-12 py-6 ">
      {/* Carousel */}
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        autoPlay={autoPlay}
        autoPlayInterval={2000}
        infinite={true}
        disableDotsControls={true}
        disableButtonsControls={true}
        responsive={responsive}
        autoHeight
      />

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => carouselRef.current.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 text-black-500 p-3 rounded-full shadow-lg hover:bg-orange-600 z-10"
          >
            ◀
          </button>

          <button
            onClick={() => carouselRef.current.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-black-500 p-3 rounded-full shadow-lg hover:bg-orange-600 z-10"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
};

export default HomeSectionCarousel;

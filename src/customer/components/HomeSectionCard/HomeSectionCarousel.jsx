import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from './HomeSectionCard';
import metalbike from './homesectionassets/metalbike.jpg';
import propplane from './homesectionassets/propplane.jpg';
import woodmonstertoy from './homesectionassets/woodmonstertoy.jpg';
import metalcar from './homesectionassets/metalcar.jpg';
import legoporsche from './homesectionassets/legoporsche.jpg';


const HomeSectionCarousel = () => {
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4 },
  };

  const cardData = [
    {
      imageSrc: metalbike,
      title: '"Build-It-Yourself" Metal Bike Kit',
      description: 'Metal Bike Kit (includes tools)',
    },
    {
      imageSrc: woodmonstertoy,
      title: 'Wooden Car Kit',
      description: 'Wooden Car Kit (includes tools)',
    },
    {
      imageSrc: propplane,
      title: 'Wooden Propeller Plane Kit',
      description: 'Wooden Prop Plane Kit (includes tools)',
    },
    {
      imageSrc: metalcar,
      title: '"Build-It-Yourself" Metal Car Kit',
      description: 'Metal Car Kit (includes tools)',
    },
    {
      imageSrc: legoporsche,
      title: 'Lego Porsche (White)',
      description: '1000 piece Lego Porsche',
    }
  ];

  const items = cardData.map((card, index) => (
    <HomeSectionCard
      key={index}
      imageSrc={card.imageSrc}
      title={card.title}
      description={card.description}
    />
  ));

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
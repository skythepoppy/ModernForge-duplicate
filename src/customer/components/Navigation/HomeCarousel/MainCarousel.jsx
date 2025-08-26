import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MainCarouselData from './MainCarouselData';

const MainCarousel = () => {
    const items = MainCarouselData.map((item) => (
        <img 
            key={item.id}
            className="cursor-pointer w-full h-[60vh] object-cover"
            role="presentation"
            src={item.imageUrl}
            alt={item.title} 
        />
    ));

    return (
        <div className="w-full mx-auto">
            <AliceCarousel
                animationType="fadeout"
                animationDuration={800}
                disableButtonsControls
                infinite
                items={items}
                mouseTracking
                autoPlay
                autoPlayInterval={3000}
            />
        </div>
    );
};

export default MainCarousel;

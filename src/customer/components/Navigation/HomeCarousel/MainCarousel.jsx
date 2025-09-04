import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MainCarouselData from './MainCarouselData';

const MainCarousel = () => {
    const items = MainCarouselData.map((item) => (
        <img 
            key={item.id}
            className="cursor-pointer w-full h-[60vh] rounded-2xl object-cover"
            role="presentation"
            src={item.imageUrl}
            alt={item.title} 
        />
    ));

    return (
        <div className="w-full max-w-[1200px] mx-auto p-5 overflow-hidden ">
            <AliceCarousel
                animationType="fadeout"
                animationDuration={800}
                disableDotsControls={true}
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

import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const AlertCarousel = ({ alerts }) => {
    const items = alerts.map((alert, index) => (
        <div
            key={index}
            className="px-2 py-0.5 h-12 text-sm sm:text-base font-bold text-black bg-orange-500 
      whitespace-nowrap flex justify-center items-center"
        >
            {alert}
        </div>
    ));

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            autoPlay
            autoPlayInterval={4000}
            infinite
            disableButtonsControls
            disableDotsControls
            animationDuration={1000}
        />
    );
};

export default AlertCarousel;

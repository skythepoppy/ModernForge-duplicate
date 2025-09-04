import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../../HomeSectionCard/HomeSectionCarousel'
import FAQSection from './FAQSection'
import modernforgeAffiliate from '../../HomeCarousel/homeassets/modernforgeAffiliate.png';
import modernforgeIG from '../../HomeCarousel/homeassets/modernforgeIG.png';



const HomePage = () => {
    return (
        <div>
            <MainCarousel />

            {/* Latest Releases */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Latest Releases</h1>
                <HomeSectionCarousel status="new_release" limit={5} />
            </div>

            {/* Automobiles */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Automobiles</h1>
                <HomeSectionCarousel category="automobile" limit={5} />
                <button
                    type="button"
                    className="-mt-2  text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop All Automobiles
                </button>
            </div>

            {/* Aircrafts */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Aircrafts</h1>
                <HomeSectionCarousel category="airplane" limit={5} />
                <button
                    type="button"
                    className="-mt-2 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop All Aircrafts
                </button>
            </div>

            {/* Watercrafts */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Watercrafts</h1>
                <HomeSectionCarousel category="ship" limit={5} />
                <button
                    type="button"
                    className="-mt-2 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop All Watercrafts
                </button>
            </div>

            {/* Programmables */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Programmables</h1>
                <HomeSectionCarousel category="programmable" limit={5} />
                <button
                    type="button"
                    className="-mt-2 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop All Programmables
                </button>
            </div>

            <div className="flex justify-center items-center space-x-6 mt-16 mb-12">
                <img
                    src={modernforgeIG}
                    alt="Instagram Graphic"
                    className="w-1/3 rounded-lg shadow-lg object-cover"
                />
                <img
                    src={modernforgeAffiliate}
                    alt="Affiliate Graphic"
                    className="w-1/3 rounded-lg shadow-lg object-cover"
                />
            </div>

            <FAQSection />
        </div>
    )
}

export default HomePage

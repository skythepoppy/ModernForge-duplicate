import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../../HomeSectionCard/HomeSectionCarousel'
import FAQSection from '../FAQPage/FAQSection'
import modernforgeAffiliate from '../../HomeCarousel/homeassets/modernforgeAffiliate.png';
import modernforgeIG from '../../HomeCarousel/homeassets/modernforgeIG.png';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <MainCarousel />

            {/* Latest Releases */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Latest Releases</h1>
                <HomeSectionCarousel status="new_release" limit={5} autoPlay={true} showArrows={false} />
            </div>

            {/* Automobiles */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Automobiles</h1>
                <HomeSectionCarousel category="automobile" limit={5} showArrows={true} />
                <button
                    type="button"
                    className="-mt-2  text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                    onClick={() => navigate("/autmobiles")}
                >
                    Shop All Automobiles
                </button>
            </div>

            {/* Aircrafts */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Aircrafts</h1>
                <HomeSectionCarousel category="airplane" limit={5} showArrows={true} />
                <button
                    type="button"
                    className="-mt-2 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                    onClick={() => navigate("/aircrafts")}
                >
                    Shop All Aircrafts
                </button>
            </div>

            {/* Watercrafts */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Watercrafts</h1>
                <HomeSectionCarousel category="ship" limit={5} showArrows={true} />
                <button
                    type="button"
                    className="-mt-2 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                    onClick={() => navigate("/watercrafts")}
                >
                    Shop All Watercrafts
                </button>
            </div>

            {/* Programmables */}
            <div className="text-center my-16 mb-12">
                <h1 className="text-3xl font-bold mb-4">Shop Programmables</h1>
                <HomeSectionCarousel category="programmable" limit={5} showArrows={true} />
                <button
                    type="button"
                    className="-mt-2 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                    onClick={() => navigate("/programmables")}
                >
                    Shop All Programmables
                </button>
            </div>

            {/* Homepage Graphics */}
            <div className="w-screen flex justify-center mt-16 mb-12">
                <div className="flex flex-row gap-6">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={modernforgeIG}
                            alt="Instagram Graphic"
                            className="w-96 rounded-lg shadow-lg object-cover"
                        />
                    </a>

                    <a
                        href="/affiliate"
                        target="_self"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={modernforgeAffiliate}
                            alt="Affiliate Graphic"
                            className="w-96 rounded-lg shadow-lg object-cover"
                        />
                    </a>
                </div>
            </div>

            <FAQSection />
        </div>
    )
}

export default HomePage

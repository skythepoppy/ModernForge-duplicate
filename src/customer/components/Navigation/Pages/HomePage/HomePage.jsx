import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../../HomeSectionCard/HomeSectionCarousel'

const HomePage = () => {
    return (
        <div>
            <MainCarousel />

            {/* Latest Releases */}
            <div className="text-center my-8 mb-12">
                <h2 className="text-2xl font-bold mb-4">Latest Releases</h2>
                <HomeSectionCarousel status="new_release" limit={5} />
            </div>

            {/* Automobiles */}
            <div className="text-center my-8 mb-12">
                <h2 className="text-2xl font-bold mb-4">Shop Automobiles</h2>
                <HomeSectionCarousel category="automobile" limit={5} />
                <button
                    type="button"
                    className="mt-4 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop Automobiles
                </button>
            </div>

            {/* Aircrafts */}
            <div className="text-center my-8 mb-12">
                <h2 className="text-2xl font-bold mb-4">Shop Aircrafts</h2>
                <HomeSectionCarousel category="airplane" limit={5} />
                <button
                    type="button"
                    className="mt-4 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop Aircrafts
                </button>
            </div>

            {/* Watercrafts */}
            <div className="text-center my-8 mb-12">
                <h2 className="text-2xl font-bold mb-4">Shop Watercrafts</h2>
                <HomeSectionCarousel category="ship" limit={5} />
                <button
                    type="button"
                    className="mt-4 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop Watercrafts
                </button>
            </div>

            {/* Programmables */}
            <div className="text-center my-8 mb-12">
                <h2 className="text-2xl font-bold mb-4">Shop Programmables</h2>
                <HomeSectionCarousel category="programmable" limit={5} />
                <button
                    type="button"
                    className="mt-4 text-black-500 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-bold rounded-lg text-sm px-6 py-2"
                >
                    Shop Programmables
                </button>
            </div>
        </div>
    )
}

export default HomePage

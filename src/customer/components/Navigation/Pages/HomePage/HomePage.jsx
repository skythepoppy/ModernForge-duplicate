import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../../HomeSectionCard/HomeSectionCarousel'

const HomePage = () => {
    return (
        <div>
            <MainCarousel />
            <div>
                <h2 className="text-2xl font-bold mt-6 ml-4 text-center">Latest Releases</h2>
                <HomeSectionCarousel status="new_release" limit={5} />

                <h2 className="text-2xl font-bold mt-6 ml-4 text-center">Shop Automobiles</h2>
                <HomeSectionCarousel category="automobile" limit={5} />

                <h2 className="text-2xl font-bold mt-6 ml-4 text-center">Shop Aircrafts</h2>
                <HomeSectionCarousel category="airplane" limit={5} />

                <h2 className="text-2xl font-bold mt-6 ml-4 text-center">Shop Watercrafts</h2>
                <HomeSectionCarousel category="ship" limit={5} />

                <h2 className="text-2xl font-bold mt-6 ml-4 text-center">Shop Programmables</h2>
                <HomeSectionCarousel category="programmable" limit={5} />
            </div>
        </div>
    )
}

export default HomePage
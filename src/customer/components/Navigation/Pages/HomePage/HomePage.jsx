import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../../HomeSectionCard/HomeSectionCarousel'

const HomePage = () => {
    return (
        <div>
            <MainCarousel />

            <div>
                <h1 className="text-black block rounded-md px-5 py-4 text-3xl font-bold">
                    Latest Releases
                </h1>
            </div>
            <div>
                <HomeSectionCarousel />
                <HomeSectionCarousel />
                <HomeSectionCarousel />
            </div>
        </div>
    )
}

export default HomePage
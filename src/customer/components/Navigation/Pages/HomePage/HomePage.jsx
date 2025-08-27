import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../../HomeSectionCard/HomeSectionCarousel'

const HomePage = () => {
    return (
        <div>
            <MainCarousel/>

            <div>
                <HomeSectionCarousel/>
            </div>
        </div>
    )
}

export default HomePage
import React, {useState} from 'react'
/* import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"; */
import { sliderItems } from '../../data'

import './slider.scss'

const Slider = () => {

    const [activeSlide, setActiveSlide] = useState(0)

    const handleClick = (way) => {
        way === 'left' ? 
        setActiveSlide(activeSlide > 0 ? activeSlide - 1 : 2)
        : setActiveSlide(activeSlide < 2 ? activeSlide + 1 : 0)
    }

  return (
    <div className='sliderContainer'>
        <div className="arrow left" onClick={() => handleClick('left')}>
            <i class="bi bi-caret-left-fill"></i>
        </div>
        <div className="wrapper" style={{transform: `translateX(-${activeSlide*100}vw)`}}>
            {
                sliderItems.map((item) => (
                    <div className="slide" key={item.id}>
                        <img src={item.img} alt={item.title} />
                    </div>
                ))
            }
        </div>
        <div className="arrow right" onClick={() => handleClick()}>
            <i class="bi bi-caret-right-fill"></i>
        </div>
    </div>
  )
}

export default Slider
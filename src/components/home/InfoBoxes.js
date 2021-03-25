import React from 'react'
import { Icon } from '../common'

import { Spirit } from '../../styles/spirit-styles'

const InfoBoxes = () => (
  <div className='infobox-wrapper' >
    <div className='infobox-1'>
      <Icon name={"user-group"} className={`infobox-icon w20 h-auto w52-ns stroke-w--1-5 mr3 mb2`} />
      <p className={`${Spirit.h4}`}>Join our international team of biological and computational scientists, exchange ideas and simulation code, and contribute with your expertise to the computational biology community.</p>
    </div>
    <div className='infobox-2'>
      <Icon name={"server"} className={`infobox-icon w20 h-auto w52-ns stroke-w--1-5 mr3 mb2`} />
      <p className={`${Spirit.h4}`}>Ultimately, BioDynaMo will be able to simulate large-scale biological systems on the cloud in a user-friendly manner.</p>
    </div>
    <div className='infobox-3'>
      <Icon name={"computer"} className={`infobox-icon w20 h-auto w52-ns stroke-w--1-5 mr3 mb2`} />
      <p className={`${Spirit.h4}`}>BioDynaMo can be used on standard laptops, desktop computers as well as high-performance computers to fully exploit different hardware for computational biology research.</p>
    </div>
  </div>
)

export default InfoBoxes

import React from 'react'

import { Spirit } from '../../styles/spirit-styles'

const InfoBoxes = () => (
  <div className={`${Spirit.page.xl} grid-12 gutter-row-20 gutter-36-ns mt10 mt8-ns miw-auto-ns pt8`}>
    <div className={'col-10 col-4-ns flex flex-column-ns'}>
      <h3 className={`${Spirit.h3}`}>Collaborative</h3>
      <p className={`${Spirit.p}`}>Join our international team of biological and computational scientists, exchange ideas and simulation code, and contribute with your expertise to the computational biology community.</p>
    </div>
    <div className={'col-10 col-4-ns flex flex-column-ns'}>
      <h3 className={`${Spirit.h3}`}>Distributed</h3>
      <p className={`${Spirit.p}`}>Ultimately, BioDynaMo will be able to simulate large-scale biological systems on the cloud in a user-friendly manner.</p>
    </div>
    <div className={'col-10 col-4-ns flex flex-column-ns'}>
      <h3 className={`${Spirit.h3}`}>Optimised</h3>
      <p className={`${Spirit.p}`}>BioDynaMo can be used on standard laptops, desktop computers as well as high-performance computers to fully exploit different hardware for computational biology research.</p>
    </div>
  </div>
)

export default InfoBoxes

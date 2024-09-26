import React, { useEffect, useState } from 'react';

import slides from './slides';

import './PartnerProgram.css';
import ga4Event from '../../utils/ga4.event';
import HelmetManager from '../../comp/HelmetManager';

const PartnerProgram = () => {

	const initPosition = 1;
	const [position, setPosition] = useState(initPosition);

	const { SlideComponent, settings } = slides
		.find(item => item.settings.position === position);

	useEffect(() => {
		ga4Event('all ways opening become a partner page', 'partner_page')
	}, [])
	
	return (
		<div className="partner-program">

			<HelmetManager
				title="Partner Program"
				description="Partner Program: Explore Opportunities to Grow with Us in the DeFi Web3 iGaming Landscape. White-label solutions available."
				keywords="start crypto business, white label crypto DeFi, Web3, iGaming, white-label Products, UpvsDown"
				canonical="/partner_program"
			/>

			{/* <div className="main-bg"></div> */}
			<SlideComponent
				settings={settings}
				next={() => setPosition(position + 1)}
				back={() => setPosition(position - 1)}
			/>
		</div>
	);

}

export default PartnerProgram;
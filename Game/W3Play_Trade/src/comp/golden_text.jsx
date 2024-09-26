import React from 'react'
import LinearGradient from './svg_linear_grad'
import { vw } from './../utils/document'

export default function GoldenText({children, do_border=true, do_shadow=true, weight=500, scale=1 ,...props}){

	return (
		<>
			<svg className="default-web-view" {...props}>
				<defs>
					<LinearGradient id="mygrad1" direction="to-top" colors={['#d5a84b', '#f6dc7c', '#faeb9b']}/>
					<LinearGradient id="mygrad2" direction="to-top" colors={[
						'#d99e38','#d99e38','#d99e38','#d99e38',
						'#d99e38','#fff585','#ebbc53','#fff28f','#f9e581','#edc964',
						'#e4b54f','#dfa942','#dda53e','#e1ac43','#eebf50','#fbd35e',
						'#f9d15d','#f4ca58','#eabd50','#dcab45','#c99437','#b47926',
						'#b47926','#b47926','#b47926'
					]}/>
					<LinearGradient id="mygrad3" direction="to-bottom-right" colors={[
						'#d99e38','#d99e38','#d99e38','#d99e38',
						'#d99e38','#fff585','#ebbc53','#fff28f','#f9e581','#edc964',
						'#e4b54f','#dfa942','#dda53e','#e1ac43','#eebf50','#fbd35e',
						'#f9d15d','#f4ca58','#eabd50','#dcab45','#c99437','#b47926',
						'#b47926','#b47926','#b47926'
					]}/>
					{do_shadow && <filter id="blur5" x="0" y="0">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
					</filter>}
				</defs>
				<g style={{transform: 'translate(-12%, 0)'}}>
					{do_shadow && <text 
						textAnchor="middle"
						fill="#00000088"
						filter="url(#blur5)"
						stroke="#00000088" 
						strokeWidth={vw(.3)*scale} 
						fontWeight={weight} 
						fontStyle="italic"
						fontSize={vw(6)*scale} 
						x="62%" y={vw(6.2)*scale}>
							{children}
						</text>}
					{do_border && <text 
						textAnchor="middle"
						stroke="url(#mygrad2)" 
						strokeWidth={vw(.3)*scale} 
						fontWeight={weight} 
						fontStyle="italic"
						fontSize={vw(6)*scale} 
						x="62%" y={vw(6)*scale}>
							{children}
						</text>}
					<text 
					textAnchor="middle"
					fill={do_border ? "url(#mygrad1)" : "url(#mygrad3)"}
					fontWeight={weight} 
					fontStyle="italic"
					fontSize={vw(6)*scale} 
					x="62%" y={vw(6)*scale}>
						{children}
					</text>
				</g>
			</svg>

			<p className="golden-title mobile-view"><span>{children}</span></p>

		</>
	);

}
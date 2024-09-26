import React from 'react'

export default function RateBubble({stroke, fill, width, height,  onClick, opacity=1, strokeOpacity=1}){
	return (
		<svg viewBox="0 0 104 43" onClick={onClick}
			width={width} height={height}>
			<g transform="translate(-56.324551,-95.06689)">
				<path transform="scale(0.26458333)"
				fill={fill} fillOpacity={opacity}
				stroke={stroke} strokeWidth={7} strokeOpacity={strokeOpacity}
				d="m 249.28516,362.14258 c -18.59858,0 -33.57032,14.97371 -33.57032,33.57226 v 52.14258 c 0,18.59857 14.97174,33.57031 33.57032,33.57031 h 128.96679 l 31.49024,35.97657 31.49219,-35.97657 H 570 c 18.59856,0 33.57227,-14.97174 33.57227,-33.57031 v -52.14258 c 0,-18.59855 -14.97371,-33.57226 -33.57227,-33.57226 z"/>
			</g>
		</svg>
	)
}
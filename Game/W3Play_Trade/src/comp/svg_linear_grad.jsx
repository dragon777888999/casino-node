import React from 'react'
import { to_precision } from '../utils/number';

const directions = {
	'to-top': 			{x1:0, x2:0, y1:100, y2:0},
	'to-bottom':		{x1:0, x2:0, y1:0, y2:100},
	'to-right':			{x1:0, x2:100, y1:0, y2:0},
	'to-left':			{x1:100, x2:0, y1:0, y2:0},
	'to-top-right':		{x1:0, x2:100, y1:100, y2:0},
	'to-top-left':		{x1:100, x2:0, y1:100, y2:0},
	'to-bottom-right':	{x1:0, x2:100, y1:0, y2:100},
	'to-bottom-left':	{x1:100, x2:0, y1:0, y2:100},
}

function distribute_percent_evenly(colors){
	var dict = {},
	unit_distance = 100/(colors.length-1),
	running_dist = 0;
	for(let color of colors){
		dict[to_precision(running_dist, 3)] = color;
		running_dist += unit_distance;
	}
	return dict;
}

/**
	* Easy SVG linear gradiant component
	* paremeters:
	* id : needed to reference the gradient outside
	* direction : can be from the following:
	* 	'to-top'
	*	'to-bottom'
	*	'to-right' (default)
	*	'to-left'
	*	'to-top-right'
	*	'to-top-left'
	*	'to-bottom-right'
	*	'to-bottom-left'
	*   or an object with the propeties x1, x2, y1 & y2
	* colors : can be an even distribution of colors
	*   by passing an Array of color strings,
	*   ex: ['#ff0000', '#550088', '#ffff00']
	*   or customized with explicit step points
	*   by passing an boject with stop percentages as keys and color strings as values
	*   ex: {0: '#0000ff', 25: '#77456f', 100: '#888888'} 
 */
export default function LinearGradient({id, direction, colors}){
	if (colors && Array.isArray(colors)) colors = distribute_percent_evenly(colors);
	if (direction && !(direction in directions)) direction = undefined;
	var {x1, x2, y1, y2} = (
		!!direction 
		? typeof direction != 'string' && 'x1' in direction
			? direction
			: directions[direction]
		: directions['to-right']
	);
	let i=0,
	stops = Object.keys(colors).map(Number);
	stops.sort((a, b) => a-b);
	return (
		<linearGradient id={id} x1={x1+'%'} y1={y1+'%'} x2={x2+'%'} y2={y2+'%'}>
			{stops.map(dist => (
				<stop key={i++} offset={dist+'%'} style={{stopColor: colors[dist], stopOpacity: 1}} />
			))}
		</linearGradient>
	)
}
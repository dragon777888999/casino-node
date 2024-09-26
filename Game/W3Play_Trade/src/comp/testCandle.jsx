import React, { useRef, useState, useEffect } from 'react'
import APP from './../app';

import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { AxisRight } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { Annotation, Label, LineSubject, CircleSubject } from '@visx/annotation';
import { Glyph } from '@visx/glyph';
import { BoxPlot } from '@visx/stats';

import { add_commas, to_precision } from './../utils/number'
import { change_factor } from './../utils/random'
import { vw, vh } from './../utils/document'
import { last, column_min, column_max } from "./../utils/array";
import useWindowSize from './../hooks/useWindowSize'
import useAppState from './../hooks/useAppState'
import StartFlag from './shape/start_flag';
import EndFlag from './shape/end_flag';
import RateBubble from './shape/rate_bubble';
import useDimension from '../hooks/useDimension';
// import CustomTooltip from './graph_tooltip'

const { min, max, abs, sqrt, pow, ceil, log10 } = Math;
const colors = { gold: '#f4d56f', gray: '#868686', green: '#81c802', red: '#e02e2b' };
const axisLabelStyle = { dx: '-0.25em', dy: '0.25em', fontSize: '.85em', fontFamily: "Inconsolata", textAnchor: 'end', fill: colors.gray };
const axisLabelStylePortrait = { dx: '-0.25em', dy: '0.25em', fontSize: '1em', fontFamily: "Inconsolata", textAnchor: 'end', fill: '#868686b3' };
const tooltipLabelStyle = { dy: '-.1em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle', letterSpacing: '-.03em' };

// block of helper constatns/functions 
// to make padding usage flexible but final value uniform
const defaultPadding = { top: 0, left: 0, right: 0, bottom: 0 };
function resolvePaddingArray(input) {
    if (input.length < 2) return { top: input[0], left: input[0], right: input[0], bottom: input[0] };
    if (input.length === 2) return { top: input[0], left: input[1], right: input[1], bottom: input[0] };
    if (input.length === 3) return { top: input[0], left: input[1], right: input[1], bottom: input[2] };
    return { top: input[0], left: input[3], right: input[1], bottom: input[2] };
}
function resolvePadding(input) {
    if (!input) return { ...defaultPadding };
    if (typeof input == 'number') return { top: input, left: input, right: input, bottom: input };
    if (Array.isArray(input)) return resolvePaddingArray(input);
    return Object.assign({}, defaultPadding, input);
}

// extends a domain array ([min, max]) multiplier factor
// examples :
// extendDomain([1, 3], [.25, .25]) => [.5, 3.5]
// extendDomain([50, 60], [0, .1]) => [50, 61]
// extendDomain([50, 60], [.1, 0]) => [50, 59]
function extendDomain([from, to], [back, forward]) {
    let delta = to - from;
    return [from - delta * back, to + delta * forward]
}

// const colors = {
//     gold: '#f4d56f',
//     gray: '#868686',
//     green: '#81c802',
//     red: '#e02e2b'
// }

// const axisLabelStyle = {
//     dx: '-0.25em',
//     dy: '0.25em',
//     fontSize: '.85em',
//     fontFamily: "Inconsolata",
//     textAnchor: 'end',
//     fill: colors.gray,
// };
const currRateLabelStyle = {
    fontFamily: "Inconsolata",
    textAnchor: 'end',
    letterSpacing: '-.05em'
};
const entryRateLabelStyle = {
    fontFamily: "Barlow Semi Condensed",
    textAnchor: 'middle',
};
const entryRateTitleLabelStyle = {
    dy: '.35em',
    fontFamily: "Barlow Semi Condensed",
    textAnchor: 'middle',
    letterSpacing: '-.03em',
    opacity: .5
};
// const tooltipLabelStyle = {
//     dy: '-.1em',
//     fontFamily: "Barlow Semi Condensed",
//     textAnchor: 'middle',
//     letterSpacing: '-.03em'
// };

function distance(p1, p2, xSc, ySc) {
    return sqrt(
        pow((p1[0] - p2[0]) * 100 / xSc, 2)
        + pow((p1[1] - p2[1]) * 100 / ySc, 2)
    )
}
function findClosest(point, data, xSc, ySc) {
    let matchPoint = data[0],
        bestDist = distance(point, matchPoint, xSc, ySc);
    for (let i = 1; i < data.length; i++) {
        let dist = distance(point, data[i], xSc, ySc);
        if (dist < bestDist) {
            bestDist = dist;
            matchPoint = data[i];
        }
    }
    return matchPoint;
}
function domLen([start, end]) {
    return abs(end - start)
}

let num_candles = 120;
    // candle_len = 5000;

function make_graph_data_candles(init_time, init_rate) {
    let rate = init_rate,
        time = init_time,
        candle = { x: time - time % candle_len, open: rate, close: rate, high: rate, low: rate },
        data = [];

    while (data.length < num_candles) {
        time -= candle_len / 10;
        rate = to_precision(rate *= change_factor(.00003), 5);
        if (candle.x > time) {
            data.push(candle);
            candle = { x: candle.x - candle_len, open: rate, close: rate, high: rate, low: rate }
        }
        else {
            candle.open = rate;
            candle.high = max(candle.high, rate);
            candle.low = min(candle.low, rate);
        }
    };

    data.reverse();
    return data;
}

// var static_data = make_graph_data_candles(Date.now(), 42730.4210)

export default function AssetHistoryGraphCandles({ marketHeight, padding }) {

    let width, height, graphWrapperHeight;
    const isMobilePortrait = useDimension();

    // mobile graph
    if (isMobilePortrait) {
        // const graphBottomOverflow = vh(3);
        const graphBottomOverflow = vh(-5);
        width = max(1, vw(100));
        height = max(1, marketHeight + graphBottomOverflow);
    }

    // web graph
    else {
        if (!APP.state.get('chat_open')) width = max(1, vw(56.2));
        else width = max(1, vw(60.4));
        graphWrapperHeight = max(1, vh(100) - vw(21.6));
        height = max(1, vh(100) - vw(25.6));
    }

    const { width: ww, height: wh } = useWindowSize(),
        // data = useAppState('asset_history', []),
        // data = static_data,
        data = useAppState('candles_asset_history'),
        // {start: tradeStart, end: tradeEnd} = useAppState('tradeTimes', {}),

        nextRoundTimestamp = useAppState('nextRoundTimestamp'),
        tradeStart = nextRoundTimestamp.start / 1000,
        tradeEnd = nextRoundTimestamp.end / 1000,

        { downtime, duration } = useAppState('active_table', {}),
        displayLen = (downtime + duration) * 1600,
        entryRate = useAppState('entryRate', null),
        tradePlace = useAppState('tradePlace', null),
        tail_digits = useAppState('asset.tail_digits', 2),
        containerRef = useRef(null),
        xScaleRef = useRef(null),
        yScaleRef = useRef(null),
        dataRef = useRef(data);

    // color_line_y = entryRate || (data.length ? last(data).close : 0);

    if (!data?.length) {
        return (
            <div className="history_graph">
                <div className="loader_wrap">
                    <img src="/media/images/loaders/loader.gif" />
                </div>
            </div>
        )
    }

    dataRef.current = data;

    var candle_len = data[1].x - data[0].x,
        { x: lastRateTime, close: lastRate } = last(data),
        padding = resolvePadding(padding),
        xDomain = [lastRateTime - displayLen, lastRateTime],
        visibleData = data.filter(({ x }) => (x - xDomain[0] > -1000)),
        yDomain = [column_min(data, 'low'), column_max(data, 'high')];

    // apply padding to domain
    xDomain = extendDomain(xDomain, [padding.left, padding.right]);
    yDomain = extendDomain(yDomain, [padding.bottom, padding.top]);

    var xLength = xDomain[1] - xDomain[0],
        candle_width = (candle_len / xLength) * width * 0.7;

    const xScale = xScaleRef.current = scaleLinear({
        domain: xDomain,
        range: [0, width]
    }),
        yScale = yScaleRef.current = scaleLinear({
            domain: yDomain,
            range: [height, 0]
        });

    // relative text size compared to 8 total digits + dot
    const rate_text_scale = (1 + tail_digits + max(1, ceil(log10(lastRate)))) / 9;
    const color_line_y = max(0, min(height, yScale(entryRate || lastRate))) || 0;
    const green_opac = entryRate ? (lastRate > entryRate ? 1 : .6) : 1;
    const red_opac = entryRate ? (lastRate < entryRate ? 1 : .6) : 1;
    const width_wo_curr_rate = isMobilePortrait ? width : width /** (1 - (.19) * (rate_text_scale))*/;

    const currentRateBackgroundProps = isMobilePortrait ? { stroke: '#f4d56f', rx: vw(1), ry: vw(1), height: '3.1em', width: vw(25) }
        : { stroke: '#f4d56f', rx: vw(.32), ry: vw(.32), height: '1.9em', width: vw(10) };

    return (
        <div className="history_graph" ref={containerRef}>
            <svg width={width} height={height}>

                {isMobilePortrait ?

                    // {/* GREEN & RED BOXES SETTINGS (MOBILE) */ }
                    < defs >
                        <linearGradient id="graph_green_grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "rgba(157, 200, 0, 0)", stopOpacity: 0.9 }} />
                            <stop offset="16%" style={{ stopColor: "rgba(157, 200, 0, 0.25)", stopOpacity: 0.9 }} />
                            <stop offset="100%" style={{ stopColor: "#9dc800", stopOpacity: 0.9 }} />
                        </linearGradient>
                        <linearGradient id="graph_red_grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#ff0300", stopOpacity: 0.9 }} />
                            <stop offset="84%" style={{ stopColor: "rgba(255, 3, 0, 0.25)", stopOpacity: 0.9 }} />
                            <stop offset="100%" style={{ stopColor: "rgba(237, 4, 1, 0)", stopOpacity: 0.9 }} />
                        </linearGradient>
                    </defs>

                    :

                    // GREEN & RED BOXES SETTINGS (WEB)
                    <defs>
                        <linearGradient id="graph_green_grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#3d430f", stopOpacity: .9 }} />
                            <stop offset="20%" style={{ stopColor: "#505e0c", stopOpacity: 9 }} />
                            <stop offset="100%" style={{ stopColor: "#8baf03", stopOpacity: .9 }} />
                        </linearGradient>
                        <linearGradient id="graph_red_grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#e81108", stopOpacity: .9 }} />
                            <stop offset="80%" style={{ stopColor: "#a0180e", stopOpacity: .9 }} />
                            <stop offset="100%" style={{ stopColor: "#83110b", stopOpacity: .9 }} />
                        </linearGradient>
                    </defs>
                }

                <Group>

                    {/* GREEN / RED RECTANGLES */}
                    <rect x={0} y={0} width={width_wo_curr_rate} height={color_line_y} fill="url(#graph_green_grad)" opacity={green_opac} />
                    <rect x={0} y={color_line_y} width={width_wo_curr_rate} height={(isMobilePortrait ? height : graphWrapperHeight) - color_line_y} fill="url(#graph_red_grad)" opacity={red_opac} />

                    <GridRows
                        scale={yScale}
                        width={width * (1 - (.09 * rate_text_scale))}
                        stroke={isMobilePortrait ? '#7c7c7c' : "#fff"}
                        opacity={.44}
                        numTicks={5}
                        left={width * -.01}
                        strokeOpacity={.5}
                    />

                    <AxisRight
                        scale={yScale}
                        left={width * (isMobilePortrait ? .97 : .99)}
                        numTicks={5}
                        stroke={colors.gray}
                        tickStroke={colors.gray}
                        hideAxisLine={true}
                        hideTicks={true}
                        tickFormat={a => add_commas(a, tail_digits)}
                        tickLabelProps={() => isMobilePortrait ? axisLabelStylePortrait : axisLabelStyle}
                    />

                    {/* trade start line */}
                    <Annotation
                        x={xScale(tradeStart)}
                        y={yScale(yDomain[0])}>
                        <LineSubject
                            orientation={'vertical'}
                            strokeDasharray="1,3"
                            stroke={colors.gold}
                            opacity={isMobilePortrait ? 1 : .5}
                            strokeWidth={vw(isMobilePortrait ? .18 : .1)}
                            min={vw(isMobilePortrait ? 6 : 2.2)} max={height}
                        />
                    </Annotation>

                    {entryRate &&
                        (<Annotation
                            x={xScale(lastRate)}
                            y={yScale(entryRate)}>
                            <LineSubject
                                orientation={'horizontal'}
                                stroke={'#fff'}
                                opacity={isMobilePortrait ? 1 : .5}
                                strokeWidth={vw(isMobilePortrait ? .18 : .1)}
                                min={vw(isMobilePortrait ? 6 : 2.1)}
                                max={width_wo_curr_rate - (isMobilePortrait ? vw(19) : 0)}
                            />
                        </Annotation>)}

                    {/* trade start flag */}
                    <Glyph
                        left={xScale(tradeStart) - vw(isMobilePortrait ? 1.3 : .6)}
                        top={yScale(yDomain[1]) + vw(isMobilePortrait ? .85 : .2)}>
                        <StartFlag
                            color={colors.gold}
                            width={vw(isMobilePortrait ? 4 : 1.8)}
                            height={vw(isMobilePortrait ? 3.9 : 1.7)}
                            opacity={.8}
                        />
                    </Glyph>

                    {/* expiry flag */}
                    <Glyph
                        left={xScale(tradeEnd) - vw(isMobilePortrait ? 1.3 : .6)}
                        top={yScale(yDomain[1]) + vw(isMobilePortrait ? .85 : .2)}>
                        <EndFlag
                            color={colors.gold}
                            width={vw(isMobilePortrait ? 4 : 1.8)}
                            height={vw(isMobilePortrait ? 3.9 : 1.7)}
                            opacity={.8}
                        />
                    </Glyph>

                    {/* expiry line */}
                    <Annotation
                        x={xScale(tradeEnd)}
                        y={yScale(yDomain[0])}>
                        <LineSubject
                            orientation={'vertical'}
                            strokeDasharray="1,3"
                            stroke={colors.gold}
                            opacity={isMobilePortrait ? 1 : .5}
                            strokeWidth={vw(isMobilePortrait ? .18 : .1)}
                            min={vw(isMobilePortrait ? 6 : 2.2)} max={height}
                        />
                    </Annotation>

                    {/* History (DATA) candles */}
                    {data.map((candle, i) => (
                        <BoxPlot key={i}
                            min={candle.low}
                            max={candle.high}
                            left={xScale(candle.x)}
                            firstQuartile={min(candle.open, candle.close)}
                            thirdQuartile={max(candle.open, candle.close)}
                            median={candle.open}
                            boxWidth={candle_width}
                            fill={candle.open < candle.close ? '#77ff00' : '#ff3355'}
                            fillOpacity={0.5}
                            stroke={candle.open < candle.close ? '#77ff00' : '#ff3355'}
                            strokeWidth={1}
                            valueScale={yScale} />
                    ))}

                    {/* current rate line & dot => gold line*/}
                    <Annotation
                        x={xScale(lastRateTime)}
                        y={yScale(lastRate)}
                        dx={vw(1.9)}
                        dy={-vw(1.5)}>
                        <LineSubject
                            orientation={'horizontal'}
                            stroke={colors.gold}
                            min={0}
                            max={width_wo_curr_rate - (isMobilePortrait ? vw(19) : 0)}
                        />
                        {/* <CircleSubject
                            radius={vw(isMobilePortrait ? .6 : .25)}
                            fill={colors.gold}
                            strokeWidth={0}
                        /> */}
                    </Annotation>

                    {/* current rate text */}
                    <Annotation
                        x={xScale(xDomain[1])}
                        y={yScale(lastRate)}
                        dx={-vw(isMobilePortrait ? 25.45 : 10.1)}
                        dy={-vw(isMobilePortrait ? 4 : 1.2)}>
                        <Label
                            width={vw(isMobilePortrait ? 25.1 : 10.1)}
                            fontColor={{ none: colors.gold, up: colors.green, down: colors.red, tie: colors.gray }[tradePlace]}
                            // Background
                            backgroundFill={'#151513'}
                            backgroundPadding={vw(.03)}
                            backgroundProps={currentRateBackgroundProps}

                            // Anchors
                            horizontalAnchor="left"
                            verticalAnchor='top'
                            // Title
                            title={add_commas(lastRate, tail_digits)}
                            titleFontSize={isMobilePortrait ? "2em" : "1.5em"}
                            titleFontWeight={isMobilePortrait ? 400 : 500}
                            titleProps={{ dy: isMobilePortrait ? '-1.73em' : '-.75em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle' }}

                        />
                    </Annotation>

                    <Annotation
                        x={xScale(xDomain[1])}
                        y={yScale(lastRate)}
                        dx={-vw(isMobilePortrait ? 12.7 : 5.1)}
                        dy={-vw(isMobilePortrait ? 6 : 2.4)}>
                        <Label
                            width={vw(isMobilePortrait ? 18 : 9.5)}
                            fontColor={'#000000'}
                            // Background
                            backgroundFill={'#F4D56F'}
                            backgroundPadding={vw(.02)}
                            backgroundProps={{ stroke: '#f4d56f', rx: vw(isMobilePortrait ? .5 : .35), ry: vw(isMobilePortrait ? .5 : .3), height: isMobilePortrait ? '1.2em' : '1.1em', width: vw(isMobilePortrait ? 18 : 9.5) }}
                            // Anchors
                            horizontalAnchor='middle'
                            verticalAnchor='top'
                            // Title
                            title={APP.term('graph_live_rate')}
                            titleFontSize={isMobilePortrait ? '1.1em' : '.7em'}
                            titleFontWeight={600}
                            titleProps={{ dy: isMobilePortrait ? '-.2em' : '.25em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle', letterSpacing: '-.03em', opacity: 1 }}
                        />
                    </Annotation>

                    {/* Starting rate / Entry rate (trade entry rate line + entry point circle) */}
                    {entryRate == null ? null
                        : <>

                            <Annotation
                                x={xScale(tradeStart)}
                                y={yScale(entryRate)}>
                                <LineSubject
                                    orientation={'horizontal'}
                                    stroke="#ffffff"
                                    min={0}
                                    max={width * (1 - (2.19 * rate_text_scale))}
                                // max={width}
                                />
                                <CircleSubject
                                    radius={vw(.15)}
                                    fill="#ffffff"
                                    strokeWidth={0}
                                />
                            </Annotation>

                            {/* STARTING RATE */}
                            <Annotation
                                x={0} y={yScale(entryRate)}
                                dx={vw(isMobilePortrait ? 13 : 5)}
                                dy={-vw(isMobilePortrait ? 3.7 : 1)}>
                                <Label
                                    width={vw(isMobilePortrait ? 25.1 : 10.1)}
                                    fontColor={'#f4d56f'}
                                    // Background
                                    backgroundFill={'#151513'}
                                    backgroundPadding={vw(.03)}
                                    backgroundProps={currentRateBackgroundProps}
                                    // Anchors
                                    horizontalAnchor='middle'
                                    verticalAnchor='top'
                                    // Subtitle
                                    title={add_commas(entryRate, tail_digits)}
                                    titleFontSize={isMobilePortrait ? "2em" : "1.5em"}
                                    titleFontWeight={isMobilePortrait ? 400 : 500}
                                    titleProps={{ dy: isMobilePortrait ? '-1.73em' : '-.75em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle' }}
                                // subtitleDy={-vw(2.2)}
                                />
                            </Annotation>

                            <Annotation
                                x={0}
                                y={yScale(entryRate)}
                                dx={vw(isMobilePortrait ? 12.7 : 5)}
                                dy={-vw(isMobilePortrait ? 5.9 : 2.2)}>
                                <Label
                                    width={vw(isMobilePortrait ? 18 : 9.5)}
                                    fontColor={'#000000'}
                                    // Background
                                    backgroundFill={'#F4D56F'}
                                    backgroundPadding={vw(.03)}
                                    backgroundProps={{ stroke: '#f4d56f', rx: vw(isMobilePortrait ? .5 : .35), ry: vw(isMobilePortrait ? .5 : .3), height: isMobilePortrait ? '1.2em' : '1.1em', width: vw(isMobilePortrait ? 18 : 9.5) }}
                                    // Anchors
                                    horizontalAnchor='middle'
                                    verticalAnchor='top'
                                    // Title
                                    title={APP.term('entry_rate')}
                                    titleFontSize={isMobilePortrait ? '1.1em' : '.7em'}
                                    titleFontWeight={600}
                                    titleProps={{ dy: isMobilePortrait ? '-0.25em' : '.25em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle', letterSpacing: '-.03em', opacity: 1 }}
                                />
                            </Annotation>


                            {/* STARTING RATE (WEB)
							{!isMobilePortrait && <Annotation
								x={0}
								y={yScale(entryRate)}
								dx={vw(4)}
								dy={-vw(1.5)}>
								<Label
									width={vw(7.8)}
									// fontColor={"#181818"}
									fontColor={"#F4D56F"}
									// Background
									// backgroundFill={"#ffffff"}
									backgroundFill={"#000000"}
									backgroundPadding={vw(.05)}
									// backgroundProps={{rx: vw(.5), ry: vw(.5)}}
									backgroundProps={{ stroke: '#f4d56f', rx: vw(.5), ry: vw(.5) }}
									// Anchors
									horizontalAnchor='middle'
									verticalAnchor='top'

									// Title
									title={APP.term('entry_rate')}
									titleFontSize={'.6em'}
									titleFontWeight={500}
									// titleProps={{dy: '.35em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle', letterSpacing: '-.03em', opacity: .5}}
									titleProps={{ dy: '.35em', fontFamily: "Barlow Semi Condensed", textAnchor: 'middle', letterSpacing: '-.03em' }}

									// Subtitle
									subtitle={add_commas(entryRate, tail_digits)}
									subtitleFontSize={'1.2em'}
									subtitleFontWeight={400}
									subtitleProps={{ fontFamily: "Barlow Semi Condensed", textAnchor: 'middle' }}
									subtitleDy={-vw(.4)}
								/>
							</Annotation>} */}

                        </>}
                </Group>
            </svg>
            {/* <CustomTooltip xScale={xScale} yScale={yScale}/> */}
        </div>

    )
}
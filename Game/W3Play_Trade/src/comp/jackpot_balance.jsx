import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedNumber from 'react-animated-number';
import useAppState from '../hooks/useAppState';
import state from '../state';
import APP from '../app';
import jackopt_balance_color from '../utils/skin_2/jackopt_balance_color';
import _num from '../utils/numberFormat';
import Symbol from './shape/playblock_symbol';

function perct(perc, colors) {
	if (perc === 100) return { color: colors[0] };
	else if (perc > 0 && perc <= 10) return { color: colors[1] }
	else if (perc > 10 && perc <= 20) return { color: colors[1] }
	else if (perc > 20 && perc <= 30) return { color: colors[0] };
	else if (perc > 30 && perc <= 40) return { color: colors[1] };
	else if (perc > 40 && perc <= 50) return { color: colors[0] };
	else if (perc > 50 && perc <= 60) return { color: colors[1] };
	else if (perc > 60 && perc <= 70) return { color: colors[0] };
	else if (perc > 70 && perc <= 80) return { color: colors[1] };
	else if (perc > 80 && perc <= 90) return { color: colors[0] };
	else if (perc > 90 && perc < 100) return { color: colors[0] };
}

function calculateUnits(number, unit) {
    const numberLength = String(number).length;
    const unitLength = String(unit).length;

    return numberLength >= unitLength ? numberLength - unitLength : -1;
}

const AnimatdPrize = React.memo(({ _amt = 0, colors, isLargeAmount }) => {

	const [amt, setAmt] = useState(0)

	useEffect(() => {
		if (amt == Number(_amt)) return;

		let timeout = setTimeout(() => {
			setAmt(Number(_amt))
		}, 1000);

		return () => clearTimeout(timeout)
	}, [_amt])

	// memoize the AnimatedNumber component
	const animatedNumberComponent = useMemo(() => {
		return(
			_amt &&
			<AnimatedNumber component="text" value={Number(amt || 0)}
				style={{
					transition: '.8s ease-out',
					transitionProperty:
						'background-color, color, opacity'
				}}
				frameStyle={perc => (
					perct(perc, colors)
				)}
				duration={5000}
				// formatValue={(value) => value.toFixed(state.jackpot_balance_digits)}
				// formatValue={(value) => _num.addCommas(value.toFixed(2))} // Showing 2 decimal points for jackpot balance
				formatValue={(value) => {
					if (isLargeAmount) {
						return _num.addCommas(Math.floor(value));
					} else {
						return _num.addCommas(Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2));
					}
					}}
				// Showing 2 decimal points for jackpot balance if amount is less than 1M
				// else showing only integer part of the amount
			/>
		);
		}, [amt,isLargeAmount]);

	return animatedNumberComponent;
});


const JackpotBalance = ({ showChange = false, style }) => {
	//console.log('jackpot balance update')
	const [isLargeAmount, setIsLargeAmount] = useState(0);
	const million = 1000000;

	const jackpot_balance = useAppState('jackpot_balance'),
		[lastChange, setLastChange] = useState(false),
		skin_idx = useAppState('skin_idx'),
		colors = jackopt_balance_color(skin_idx),
		[amt, setAmt] = useState(parseFloat(0.0).toFixed(2));
		
	useEffect(() => {
		// if (jackpot_balance) return;
		setLastChange(true);
		let timeout = setTimeout(() => {
			setLastChange(false);
			let amtValue = parseFloat(jackpot_balance?.amt);
			// amtValue = 11111111111999999.9988889; // for testing (Max 17 digits for css)
			// amtValue = 1111111999999.9988889; // for testing 
			// amtValue = 999999.9988889; // for testing

			amtValue = Math.floor(amtValue * 100) / 100;
			let calc = calculateUnits(Math.floor(amtValue), million);
			
			setIsLargeAmount(a=>calc);
			
			setAmt(calc >= 0 ? Math.floor(amtValue).toString() : (amtValue % 1 === 0 ? amtValue.toString() : amtValue.toFixed(2)));
		}, 1000);

		return () => clearTimeout(timeout);

	}, [jackpot_balance?.amt])

	return (
		<>
			<Link to="/weekly_jackpot" id="jackpot_balance" className="jackpot">
				<div className="top-black">
					<span>{APP.term('jackpot_header')}</span>
					{/* <img src="/media/images/treasure.png" className={lastChange ? 'add_jackpot_anim' : ''} /> */}
					<div className={lastChange ? 'add_jackpot_anim  jackpot_image' : ' jackpot_image'} />
				</div>
				<div className="bottom-yellow">
					<div className="amount-wrap">
						{/* <div className="icon-matic"></div> */}
						{/* <div className="amount"> */}
						<div className={"amount"}>
							<span className={`isLargeAmount-${isLargeAmount === -1 ? 0 : isLargeAmount}`}>
								<Symbol />
								<AnimatdPrize _amt={amt} colors={colors} isLargeAmount={isLargeAmount >= 0}/>
							</span>
						</div>
						{/* <div className="amount"><span>{formatAmount(ether_val_jackpot_balance)}</span></div> */}
					</div>
				</div>
			</Link>
		</>);

};

export default React.memo(JackpotBalance, ({ prev }, { next }) => prev === next);
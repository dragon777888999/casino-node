import React, { useEffect, useRef, useState } from 'react';
import { EtherValueString } from '../utils/web3';
import AnimatedNumber from 'react-animated-number';
import useAppState from '../hooks/useAppState';
import state from '../state';
import APP from '../app';
import Symbol from './shape/playblock_symbol';
import num from '../utils/numberFormat';
import { useSelector } from 'react-redux';
import numberFormat from '../utils/numberFormat';

const getChangeClass = (change) => {
    if (change == 0) return 'changed';
    if (change < 0) return 'changed gold';
    return 'changed green';
};

export default function UserBalance({ showChange = false, style }) {
    var customer_balance = useAppState('customer.balance') || APP.customer.balance;

	//customer_balance = BigInt(customer_balance).toString();

	//console.log('in user balance component', customer_balance);

	// for testing large balance: 
	// customer_balance = BigInt(990000000000000000000000000).toString();

    customer_balance = customer_balance;
    let ether_val_customer_balance = EtherValueString({ wei: customer_balance });
    const currentPool = useSelector(state => state.mainRememberReducer.currentPool);

    const lastBalance = useRef(customer_balance); // Stores the initial balance before update
    const [lastChange, setLastChange] = useState(false);
    const parentClassStr = `amount-wrap${lastChange ? ` ${getChangeClass(lastChange)}` : ''}`;
    const [amt, setAmt] = useState(0);
    const [userWonAmount, setUserWonAmount] = useState(0); // State to store the amount user won
    const isDemo = currentPool?.uid?.includes('demo');
    const balanceTxt = isDemo ? 'balance_title_demo' : 'balance_title';

    useEffect(() => {
        setTimeout(() => {
            APP.customer.update_balance();
        }, 50);
    }, [currentPool?.uid])

    useEffect(() => {
        const new_balance = Number(ether_val_customer_balance);
        let timeout;

        if (showChange && lastBalance.current && lastBalance.current !== new_balance) {
            APP.customer.update_balance();
            const wonAmount = new_balance - lastBalance.current; // Calculate the amount won
            setUserWonAmount(wonAmount); // Update the state with the won amount
            setLastChange(Number(new_balance) - lastBalance.current);
            timeout = setTimeout(() => setLastChange(false), 5000);
        }

        lastBalance.current = new_balance;
        let validNum = Number(ether_val_customer_balance) > 0,
            parseNum = Number(ether_val_customer_balance);

        if (!(parseNum >= 0) && !(typeof parseNum === 'number')) return;
        setAmt(validNum ? Number(ether_val_customer_balance) : 0)

        if (timeout) return () => clearTimeout(timeout);
    }, [ether_val_customer_balance]);

    useEffect(() => {
        if (userWonAmount > 0) {
			// Store the amount won in APP.state
            APP.state.set('userAmountWon', userWonAmount.toFixed(2));
            console.log(`User won amount: ${userWonAmount.toFixed(2)}`); // Log the amount the user won
            setUserWonAmount(0); // Reset the state
        }
    }, [userWonAmount]);

    return (<>
        <div className="user-balance-wrap">
            <p className="balance-title">
                <span>{APP.term(balanceTxt)}</span>
            </p>
            <div className={parentClassStr}>
                <Symbol />
                <div className="amount">
                    <span>
                        {amt ?
                            <AnimatedNumber component="text" value={amt || 0}
                                style={{
                                    transition: '.8s ease-out',
                                    transitionProperty:
                                        'background-color, color, opacity'
                                }}
                                duration={1500}
                                formatValue={(value) => numberFormat.addCommas(value.toFixed(2))}
                            /> : '0.00'}
                    </span>
                </div>
            </div>
        </div>
    </>);

};
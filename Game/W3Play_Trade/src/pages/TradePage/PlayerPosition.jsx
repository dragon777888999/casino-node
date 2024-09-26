import React, { useState, useEffect, useContext } from 'react';
import Symbol from '../../comp/shape/playblock_symbol';
import { WalletContext } from '../../utils/game';
import { EtherValue } from '../../utils/web3';

// position bubbles inside the pool
function PlayerPosition({ id, amount, dir, avatarUrl, countryCode }) {

    // const { avatar, amount, own } = useAppState(`pool.${dir}.positions.${id}`, {});
    const [isNew, setNew] = useState(true);
    // const { account } = useContext(WalletContext);
    const account = APP.state.get('wallet_address');
    // const [flashAmount, setFlashAmount] = useState(false);
    let own = account ? id.toLowerCase() == account.toLowerCase() : false;

    let className = "player_position";
    let amountClass = "invest";
    if (own) className += " own";
    if (isNew) className += " new";
    let countryImage = '/media/images/flags/' + countryCode.toLowerCase() + '.svg';
    if (own) APP.state.set('user_investment', amount);

    // if (flashAmount) amountClass += " flash";

    // only play flip effect when a position is added, not when moved
    useEffect(() => {
        let timeout = setTimeout(() => setNew(false), 700);
        return () => clearTimeout(timeout);
    }, [])

    // play flash effect on amount when it changes
    // useEffect(() => {
    //     setFlashAmount(true)
    //     let timeout = setTimeout(() => setFlashAmount(false), 700);
    //     return () => clearTimeout(timeout);
    // }, [amount])
    // console.log('avatar url = ')
    // console.log(avatarUrl)

    const renderAvatarImg = () => {
        //Rotate avatar if the bet is on the down pool
        if (avatarUrl.toString().includes('moralis') && dir == 'down')
            return <img className="user_avatar" src={avatarUrl} style={{ transform: `scaleX(-1)` }} />
        else
            return <img className="user_avatar" src={avatarUrl} />
    }

    return (
        <div className={className}>
            {renderAvatarImg()}
            <div className="country"><img src={countryImage} /></div>
            <div className={amountClass}>
                <Symbol />
                {/* <i class="fa-solid fa-dollar-sign" style={{ color: (dir === "up" ? "#a1ff01" : "#ff0400") }}></i> */}
                <span><EtherValue wei={amount} /></span>
            </div>
        </div>
    );

};

export default PlayerPosition;
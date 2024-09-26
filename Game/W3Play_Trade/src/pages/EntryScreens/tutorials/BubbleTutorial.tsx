import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../../app';
import { set_entry_tutorial_index } from '../../../REDUX/actions/main.actions';

const BubblesTutorial = ({ entry_tutorial_idx, onClickNext }): JSX.Element => {

    const isDemo = APP.state.get('currentToken') === 'demo';
    const descTxt = isDemo ? 'bubbles_entry_blockchain_desc_demo' : 'bubbles_entry_blockchain_desc';
    const descTxt2 = isDemo ? 'bubbles_entry_blockchain_header_demo' : 'bubbles_entry_blockchain_header';

    const Web3 = ({ onClick, onClickNext }) => (
        <div className="entry_bubble_web3">
            <div className="content_img" />
            <p className="bubble_header">{APP.term('bubbles_entry_web3_header')}</p>
            <p className="desc">{APP.term('bubbles_entry_web3_desc')}</p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={onClickNext}>
                <p>{APP.term('bubbles_skip')}</p>
            </div>
            <div className="next" onClick={onClick}>
                <p>{APP.term('bubbles_next')}</p>
            </div>
        </div>
    );

    const Blockchain = ({ onClick, onClickNext }) => (
        <div className="entry_bubble_blockchain">
            <div className="content_img" />
            <p className="bubble_header">{APP.term(descTxt2)}</p>
            <p className="desc">{APP.term(descTxt)}</p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={onClickNext}>
                <p>{APP.term('bubbles_skip')}</p>
            </div>
            <div className="next" onClick={onClick}>
                <p>{APP.term('bubbles_next')}</p>
            </div>
        </div>
    );

    const Secure = ({ onClick, onClickNext }) => (
        <div className="entry_bubble_secure">
            <div className="content_img" />
            <p className="bubble_header">{APP.term('bubbles_entry_secure_header')}</p>
            <p className="desc">{APP.term('bubbles_entry_secure_desc')}</p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={onClickNext}>
                <p>{APP.term('bubbles_skip')}</p>
            </div>
            <div className="next" onClick={onClick}>
                <p>{APP.term('bubbles_next')}</p>
            </div>
        </div>
    );

    const Decentralized = ({ onClick, onClickNext }) => (
        <div className="entry_bubble_decentralized">
            <div className="content_img" />
            <p className="bubble_header">{APP.term('bubbles_entry_decentralized_header')}</p>
            <p className="desc">{APP.term('bubbles_entry_decentralized_desc')}</p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={onClickNext}>
                <p>{APP.term('bubbles_skip')}</p>
            </div>
            <div className="next" onClick={onClick}>
                <p>{APP.term('bubbles_next')}</p>
            </div>
        </div>
    );

    const Winnings = ({ onClick }) => (
        <div className="entry_bubble_winnings">
            <div className="content_img" />
            <p className="bubble_header">{APP.term('bubbles_entry_winnings_header')}</p>
            <p className="desc">{APP.term('bubbles_entry_winnings_desc')}</p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="close" onClick={onClick}>
                <p>{APP.term('bubbles_close')}</p>
            </div>
        </div>
    );

    const steps = [
        Web3, Blockchain, Secure, Decentralized, Winnings
    ],
        [stepId, setStepId] = useState<number>(0),
        dispatch = useDispatch(),
        Step = steps[stepId];

    useEffect(() => {
        setStepId(entry_tutorial_idx ? entry_tutorial_idx - 1 : 0)
    }, [entry_tutorial_idx])

    function nextStep(entry_tutorial_idx: number) {
        dispatch(set_entry_tutorial_index(entry_tutorial_idx + 1))
        setStepId(entry_tutorial_idx)
    }

    return (
        <div className="entry-tutorial">
            <Step onClick={() => nextStep(entry_tutorial_idx)} onClickNext={onClickNext} />
        </div>
    )
}

export default React.memo(BubblesTutorial);
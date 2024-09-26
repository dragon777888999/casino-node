import React, { useState } from 'react';
import APP from './../../../app';
import { add_commas } from './../../../utils/number';
import { copyTextToClipboard } from './../../../utils/clipboard';
import { useDispatch } from 'react-redux';
import Symbol from '../../../comp/shape/playblock_symbol';
import truncNum from '../../../utils/truncNum';
import detectTelegramBrowser from '../../../utils/detectTelegramBrowser';
import state from '../../../state';

const pad_num = (num) => {
    return num < 10 ? '0' + num : num.toString();
}

const format_date = (date) => {
    date = new Date(date);
    return `${pad_num(date.getDate())}.${pad_num(date.getMonth() + 1)}.${date.getYear().toString().slice(1)}`;
}

const generateTelegramLink = (botName, referralCode, brandHost, displayText) => {
    const baseUrl = `https://t.me/share/url?url=https://t.me/${botName}?start=${referralCode}_${brandHost}&text=${displayText}`;
    return baseUrl;
};

function TierRow({ tier, percent, today_users, past_users, today_profit, past_profit }) {

    const value_daily_earnings = add_commas(today_profit, 2);
    const value_total_earnings = add_commas(past_profit, 2);

    return (
        <div className='tier-row-content'>
            <div className="friends-tier-type"><span>0{tier} ({percent}%)</span></div>
            <div className="earn-today">
                <div className="people"><span>{today_users}</span></div>
                <div className="amount"><span><Symbol />{value_daily_earnings}</span></div>
            </div>
            <div className="earnings-total">
                <div className="people"><span>{past_users}</span></div>
                <div className="amount"><span><Symbol />{value_total_earnings}</span></div>
            </div>
        </div>
    );
}

function Expansion({ id, tiers }) {
    return (
        <div className="expansion_row">
            <div className='tier-row-header'>
                <div className="friends-tier"><span>{APP.term('link_manager_friends_tier')}</span></div>
                <div className="earn-today"><span>{APP.term('link_manager_earn_today')}</span></div>
                <div className="earnings-total"><span>{APP.term('link_manager_earnings_total_paid')}</span></div>
            </div>
            {tiers?.map((itm, i) => (
                <TierRow key={i} tier={i + 1} percent={itm?.percentage}
                    today_users={itm?.friendsDaily} past_users={itm?.friendsTotal}
                    today_profit={itm?.dailyEarning} past_profit={itm?.totalEarnings} />
            ))}
        </div>
    );
}

export default function CampaignRowMobile({ id, createdOn, name, link, friends, totalEarnings, dailyEarning, ...props }) {

    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const value_date = format_date(createdOn);
    const value_total_today = add_commas(truncNum(dailyEarning), 2);
    const value_total_past = add_commas(truncNum(totalEarnings), 2);
    //TODO - need to add dynamic list of whitelabales that have bots and only show to them
    const isTelegramBrowser = false || detectTelegramBrowser(); // undo the ( false || ) when we will finish this telegram feature

    // Helper function to get the bot details by domain
    const getBotDetailsByDomain = (domain) => {
        return state.telegramBots.find((bot) => bot.domain === domain) || {};
    };

    const { botName, brandHost, displayText } = getBotDetailsByDomain(window.location.hostname);
    
    const referralCode = link.split('ref=')[1];

    const handleShareToTelegram = () => {
        const telegramLink = generateTelegramLink(botName, referralCode, brandHost, displayText);
        window.open(telegramLink, '_blank');
    };

    return (
        <div className="linkmanager_content_row">
            <div className="linkmanager_top_row">
                <div className="date">{value_date}<br />{name}</div>
                <div className="total_users">{friends}</div>
                <div className="today_total_profits"><Symbol />{value_total_today}</div>
                <div className="past_total_profits"><Symbol />{value_total_past}</div>
                <div className="action" onClick={expanded ? e => setExpanded(false) : e => setExpanded(true)}>
                    <div className={"expand" + (expanded ? ' expand_up' : '')}></div>
                </div>
            </div>

            {expanded && <Expansion id={id} {...props} />}

            <div className="link_bottom_row">
                <div className="text">{link}</div>
                <div className="copy-link-wrap" onClick={() => copyTextToClipboard(link, dispatch)}>
                    <div className="copy-link-button"><span>{APP.term('link_manager_copy_link')}</span></div>
                </div>
                {isTelegramBrowser && 
				<div className="share_to_telegram" onClick={handleShareToTelegram}
                    style={{
                        display: 'flex',
                        border: '0.1em solid #f4d56f',
                        borderRadius: '0.6em',
                        alignItems: 'center',
                        marginLeft: '1em',
                        textAlign: 'center',
						height: 'auto',
						minHeight: '3em',
						maxHeight: '3em',
						marginTop: '0.7em'
                    }}
                >
                    <span>Share to Telegram</span>
                </div>
                }
            </div>

        </div>
    );

}
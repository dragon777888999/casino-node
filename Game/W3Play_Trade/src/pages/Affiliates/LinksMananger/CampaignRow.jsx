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
};

const format_date = (date) => {
    date = new Date(date);
    return `${pad_num(date.getDate())}.${pad_num(date.getMonth() + 1)}.${date.getYear().toString().slice(1)}`;
};

const generateTelegramLink = (botName, referralCode, brandHost, displayText) => {
    const baseUrl = `https://t.me/share/url?url=https://t.me/${botName}?start=${referralCode}_${brandHost}&text=${displayText}`;
    return baseUrl;
};

function TierBox({ tier, percent, today_users, past_users, today_profit, past_profit }) {
    return (
        <div className='tier_block'>
            <div className="title">
                {APP.term(`affiliate_dashboard_tier${tier}_title`)} ({percent}%)
            </div>
            <div className="stats">
                <div className="stats_block_today">
                    <div className="people">{today_users}</div>
                    <div className="amount"><Symbol />{add_commas(truncNum(today_profit), 2)}</div>
                    <div className="text">{APP.term('affiliate_stat_today')}</div>
                </div>
                <div className="stat_block_past">
                    <div className="people">{past_users}</div>
                    <div className="amount"><Symbol />{add_commas(truncNum(past_profit), 2)}</div>
                    <div className="text">{APP.term('affiliate_stat_past')}</div>
                </div>
            </div>
        </div>
    );
}

function Expansion({ id, tiers }) {
    return (
        <div className="expansion_row">
            {tiers?.map((itm, i) => (
                <TierBox key={i} tier={i + 1} percent={itm?.percentage}
                    today_users={itm?.friendsDaily} past_users={itm?.friendsTotal}
                    today_profit={itm?.dailyEarning} past_profit={itm?.totalEarnings}
                />
            ))}
        </div>
    );
}

export default function CampaignRow({ id, createdOn, name, link, friends, totalEarnings, dailyEarning, ...props }) {

    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
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
                <div className="date">
                    {format_date(createdOn)}
                </div>
                <div className="name">
                    {name}
                </div>
                <div className="link">
                    <div className="text">{link}</div>
                    <div className="copy_icon" onClick={() => copyTextToClipboard(link, dispatch)}></div>
                </div>
                {isTelegramBrowser && 
				<div className="share_to_telegram" onClick={handleShareToTelegram}
                    style={{
                        display: 'flex',
                        border: '0.1em solid #f4d56f',
                        borderRadius: '0.6em',
                        alignItems: 'center',
                        textAlign: 'center',
						height: 'auto',
						minHeight: '3em',
						maxHeight: '3em',
                    }}
                >
                    <span
                        style={{
                            fontSize: '.8em',
                        }}
                    >Share to Telegram</span>
                </div>
                }
                <div className="total_users">
                    {friends}
                </div>
                <div className="today_total_profits">
                    <Symbol />{add_commas(truncNum(dailyEarning), 2)}
                </div>
                <div className="past_total_profits">
                    <Symbol />{add_commas(truncNum(totalEarnings), 2)}
                </div>
                <div className="action" onClick={expanded ? e => setExpanded(false) : e => setExpanded(true)}>
                    <div className={"expand" + (expanded ? ' expand_up' : '')}></div>
                </div>
            </div>
            {expanded && <Expansion id={id} {...props} />}
        </div>
    );
}

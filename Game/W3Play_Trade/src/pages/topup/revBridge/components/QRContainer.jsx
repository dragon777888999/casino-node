// import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';

function QRContainer({ qrValue, address, network }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copyToClipboard(address) // Call the copyToClipboard function with the address
            .then((success) => {
                if (success) {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 1500);
                }
            });
    };

    return (
        <div className="qr-container">
            {/* <QRCode value={qrValue} size={180} level={'H'} bgColor={'#fff'} fgColor={'#000'} /> */}
            <div className="info-container">
                <InfoRow label="Network" value={network} />
                <InfoRow label="Address" value={address} copied={copied} onCopy={handleCopy} />
            </div>
        </div>
    );
}

function InfoRow({ label, value, copied, onCopy }) {
    return (
        <div className={`info-row-${label.toLowerCase()}`}>
            <div className="info-text">
                <div className="info-label">{label}</div>
                <div className="info-value">{value}</div>
            </div>
            {onCopy ?
                <div className={`icon ${copied ? 'copied' : ''}`} onClick={onCopy} data-copied={copied.toString()} />
                :
                <div className="icon" />
            }
        </div>
    );
}

export default React.memo(QRContainer);
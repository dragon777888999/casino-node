import axios from 'axios';
import QRCode from 'qrcode-svg';
import React, { useState, useRef, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { set_loader, set_pix_popup } from '../../../REDUX/actions/main.actions';
import { copyTextToClipboard } from '../../../utils/clipboard';
import './PixPopup.scss';

interface Errors {
  fullName?: string;
  documentNumber?: string;
  amount?: string;
  createUser?: string;
  network?: string;
}

const PixPopup: React.FC = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [paymentString, setPaymentString] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [isQrScaled, setIsQrScaled] = useState(false);

  const sec = useSelector((state: RootStateOrAny) => state.mainRememberReducer.user_sec)?.value;
  const minAmount = 25;

  const fullNameRef = useRef<HTMLInputElement>(null);
  const documentNumberRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const cutWallet = (wallet: string) => {
    return wallet.slice(0, 11) + '...' + wallet.slice(wallet.length - 10);
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!documentNumber.trim()) {
      newErrors.documentNumber = 'Document number is required.';
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0.';
    } else if (amountValue < minAmount) {
      newErrors.amount = `Minimum amount is ${minAmount} BRL.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      dispatch(set_loader(true));

      let createUserResponse;
      try {
        createUserResponse = await axios.post('https://bb.playblock.io/createUserAccount', {
          documentNumber,
          name: fullName,
          sec,
        });
      } catch (error) {
        console.error('Error creating user:', error);
        setErrors({ createUser: 'Error creating user account. Please try again.' });
        return;
      }

      if (createUserResponse?.data?.message === 'Success' && parseFloat(amount) >= minAmount) {
        const generateQrResponse = await axios.get(
          `https://bb.playblock.io/generateDepositQR/${amount}`
        );
        setQrCode(generateQrResponse.data.data.qrCode);
        setPaymentString(generateQrResponse.data.data.paymentString);
        dispatch(set_pix_popup('qr'));
      } else {
        setErrors({ createUser: 'Error creating user account. Please try again.' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ network: 'An error occurred. Please try again.' });
    } finally {
      dispatch(set_loader(false));
    }
  };

  const closePopup = () => {
    dispatch(set_pix_popup(false));
  };

  const generateQRCodeSVG = (value: string) => {
    const qr = new QRCode({
      content: value,
      padding: 2,
      width: 128,
      height: 128,
      color: '#000000',
      background: '#ffffff',
      ecl: 'M',
      join: true,
      container: 'svg-viewbox',
    });

    return qr.svg();
  };

  const toggleScale = () => {
    setIsQrScaled(!isQrScaled);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validate(); // Re-validate the form when the errors state changes
    }
  }, [fullName, documentNumber, amount]);

  return (
    <div className="pix-popup-wrapper" onClick={closePopup}>
      <div className="pix-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closePopup}>✕</button>
        {qrCode ? (
          <div className="pix-qr-view">
            <div className="pix-logo" />
            <div className="popup-title">Your payment QR code</div>
            <p className="qr-info-text">Please send your funds to this QR address</p>
            <div
              className={`qr-code ${isQrScaled ? 'scaled' : ''}`}
              onClick={toggleScale}
              dangerouslySetInnerHTML={{ __html: generateQRCodeSVG(qrCode) }}
            />
            <div className="payment-string">
              <p className="payment-string-text">{cutWallet(paymentString)}</p>
              <div className="copy-btn" onClick={() => copyTextToClipboard(paymentString, dispatch, 'Copied')}>
                <img src='/media/images/pix/copy_icon_black.png' alt="Copy" className="copy-icon" />
                <p className="copy-text">Copy</p>
              </div>
            </div>
            <p className="qr-info-text">We will update you when funds will be exchanged by email</p>
          </div>
        ) : (
          <div className="pix-form-view">
            <div className="pix-logo" />
            <div className="popup-title">Top up with PIX</div>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="popup-input"
              ref={fullNameRef}
            />
            <input
              type="text"
              placeholder="Your document number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="popup-input"
              ref={documentNumberRef}
            />
            <div className="amount-input-wrapper">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="popup-input"
                ref={amountRef}
                style={{
                  marginBottom: Object.keys(errors).length > 0 ? '0' : '',
                }}  
              />
              <span className="currency">BRL</span>
            </div>
            {Object.keys(errors).length > 0 && (
              <div
                className="error-text"
                style={{
                  fontSize: `${0.8 - Math.min(0.1 * (Object.keys(errors).length - 1), 0.5)}em`,
                }}
              >
                <ul>
                  {errors.fullName && <li>{errors.fullName}</li>}
                  {errors.documentNumber && <li>{errors.documentNumber}</li>}
                  {errors.amount && <li>{errors.amount}</li>}
                  {errors.createUser && <li>{errors.createUser}</li>}
                  {errors.network && <li>{errors.network}</li>}
                </ul>
              </div>
            )}

            <button onClick={handleSubmit} className="popup-button">
              <span>Continue</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixPopup;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import CryptoJS from 'crypto-js';
import { set_loader, set_efi_pay_popup, set_iframe_popup } from '../../../REDUX/actions/main.actions';
import './EfiPayPopup.scss';
import APP from '../../../app';
import Iframe from '../../p2p/Iframe';
import countriesData from '../../../utils/countries-list.json'; // Importing the JSON file

interface Errors {
  amount?: string;
  name?: string;
  email?: string;
  mobile?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  primaryAddress?: string;
}

const EfiPayPopup: React.FC = () => {
  const dispatch = useDispatch();
  const walletAddress = APP.state.get('wallet_address');
  const userEmail = APP.state.get('user_email') || '';
  const iframe_src = useSelector((state: RootStateOrAny) => state.mainReducer.iframe_src);

  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: userEmail,
    mobile: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    primaryAddress: '',
    secondaryAddress: ''
  });

  const [errors, setErrors] = useState<Errors>({});
  const [countries, setCountries] = useState<{ code2: string; name: string }[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<{ code2: string; name: string }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");

  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set countries data from the imported JSON
    setCountries(countriesData);
    setFilteredCountries(countriesData); // Initially, all countries are shown
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Errors = {};
  
    const requiredFields: (keyof typeof formData)[] = [
      'amount', 'name', 'email', 'mobile', 'city', 'state', 'country', 'zipcode', 'primaryAddress', 'secondaryAddress'
    ];
  
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });
  
    const amountValue = parseFloat(formData.amount);
    if (isNaN(amountValue) || amountValue <= 1) {
      newErrors.amount = 'Please enter a valid amount greater than 1.';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }, []);

  const generateSignature = (url: string, body: any, privateKey: string, saltKey: string): string => {
    const stringifiedObj: { [key: string]: string } = {};
    for (const key in body) {
      if (Object.hasOwnProperty.call(body, key)) {
        stringifiedObj[key] = String(body[key]);
      }
    }
    const plainContent = `${url}${body ? JSON.stringify(stringifiedObj) : "{}"}${saltKey}`;
    return CryptoJS.HmacSHA256(plainContent, privateKey).toString(CryptoJS.enc.Hex);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setFilteredCountries(countries); // Reset to show all countries when opening
      setSearchString(""); // Reset the search string
    }
  };

  const handleCountrySelect = (code2: string) => {
    const selectedCountryName = countries.find(country => country.code2 === code2)?.name || "";
    setSelectedCountry(code2);
    setFormData(prevFormData => ({
      ...prevFormData,
      country: code2
    }));
    setIsDropdownOpen(false);
    setSearchString(selectedCountryName); // Update the search string with the selected country name
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.toLowerCase();

    if (key.length === 1 && /^[a-z]$/i.test(key)) {
      const updatedSearchString = searchString + key;
      setSearchString(updatedSearchString);

      const filtered = countries.filter(country =>
        country.name.toLowerCase().startsWith(updatedSearchString)
      );
      setFilteredCountries(filtered);

      if (filtered.length > 0) {
        setSelectedCountry(filtered[0].code2);
        setFormData(prevFormData => ({
          ...prevFormData,
          country: filtered[0].code2
        }));
      }
    } else if (key === "backspace") {
      // Handle backspace to remove the last character from searchString
      const updatedSearchString = searchString.slice(0, -1);
      setSearchString(updatedSearchString);

      const filtered = countries.filter(country =>
        country.name.toLowerCase().startsWith(updatedSearchString)
      );
      setFilteredCountries(filtered);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    dispatch(set_loader(true));
  
    try {
      let url = '/api/user/create_transaction';
      const privateKey = "1|Y5MXXEKk4m2UwMZyJzrtQTasyQJaeyEoQzD6TVJt";
      const saltKey = "8232de4adc96d010";
  
      const orderId = `Order-${Math.floor(Date.now() / 1000)}`;
      const requestBody = {
        order_id: orderId,
        receiver_wallet_address: walletAddress,
        token: formData.amount,
        callback_url: "https://playnance.com",
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipcode: formData.zipcode,
        primary_address: formData.primaryAddress,
        secondary_address: formData.secondaryAddress
      };
  
      const resultObject: { [key: string]: string } = {};
      Object.keys(requestBody).forEach((param) => {
        resultObject[param] = requestBody[param];
      });
  
      url = "/" + url.split('/').pop(); // Matching the URL path logic
  
      const signature = generateSignature(url, resultObject, privateKey, saltKey);
  
      const response = await fetch('https://cms-efiwidget.rare-able.com/api/user/create_transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': privateKey,
          'X-Api-Signature': signature
        },
        body: JSON.stringify(requestBody)
      });
  
      const result = await response.json();
  
      if (result.success) {
        dispatch(set_iframe_popup({ src: result.data.redirect_url, type: 'Efipay' }));
        dispatch(set_efi_pay_popup(false));
      } else {
        setErrors({ amount: 'Transaction failed. Please try again.' });
        console.error('Transaction failed', result);
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ amount: 'An error occurred. Please try again.' });
    } finally {
      dispatch(set_loader(false));
    }
  }, [formData, validate, walletAddress, dispatch]);

  const closePopup = useCallback(() => {
    dispatch(set_efi_pay_popup(false));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      validate(); // Re-validate the form when the errors state changes
    }
  }, [formData, errors, validate]);

  return (
    <>
      {iframe_src?.type === 'Efipay' ? (
        <Iframe onClose={closePopup} />
      ) : (
        <div className="efi-pay-popup-wrapper" onClick={closePopup}>
          <div className="efi-pay-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>✕</button>
            <div className="efi-pay-logo"></div>
            <div className="popup-title">Top up with Efi Pay</div>
            <form onSubmit={handleSubmit}>
              <div className="amount-input-wrapper">
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  className="popup-input"
                  ref={amountRef}
                  required
                />
                <span className="currency">INR</span>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Phone"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
                <div 
                  className="custom-dropdown" 
                  onClick={handleDropdownToggle} 
                  onKeyDown={handleKeyDown} 
                  tabIndex={0}
                >
                  <div className={`select-selected ${isDropdownOpen ? 'open' : ''}`}>
                    <span>
                      {searchString || (selectedCountry ? countries.find(country => country.code2 === selectedCountry)?.name : "Country")}
                    </span>
                    <span className="arrow"/>
                  </div>
                  {isDropdownOpen && (
                    <ul className="select-items">
                      {filteredCountries.map((country) => (
                        <li key={country.code2} onClick={() => handleCountrySelect(country.code2)}>
                          {country.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="state"// State field
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
                <input
                  type="text"
                  name="city"// City field
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
                <input
                  type="text"
                  name="zipcode"// Zip Code field
                  placeholder="Zip Code"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="primaryAddress"
                  placeholder="Primary Address"
                  value={formData.primaryAddress}
                  onChange={handleChange}
                  className="popup-input"
                  required
                />
                <input
                  type="text"
                  name="secondaryAddress"
                  placeholder="Secondary Address"
                  value={formData.secondaryAddress}
                  onChange={handleChange}
                  className="popup-input"
                />
              </div>
              {Object.keys(errors).length > 0 && (
                <div className="error-text">
                  <ul>
                    {Object.entries(errors).map(([key, message]) => (
                      <li key={key}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button type="submit" className="popup-button">
                <span>Continue</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EfiPayPopup;

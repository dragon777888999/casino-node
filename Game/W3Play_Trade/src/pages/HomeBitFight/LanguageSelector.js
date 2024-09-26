import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_app_lang } from "../../REDUX/actions/main.actions";
import state from "../../state";
import APP from "../../app";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.mainRememberReducer.app_lang);
  const [langSelector, setLangSelect] = useState(false);

  const updateLang = (itm) => {
    dispatch(set_app_lang({ ...itm, changed_by_user: true }));
    APP.state.set("customer.flag", itm?.src);
    APP.state.set("customer.lang", { code: itm?.code, lang: itm?.lang });
    APP.state.set("lang_open", false);
    window.location.reload();
    setLangSelect(false);
  };

  return (
    <div className="lang-selector-wrap">
      <div
        className="lang-selector-button"
        onClick={() => setLangSelect(!langSelector)}
      >
        <img
          className="active-lang-flag"
          src={`/media/images/flags/${lang?.src || "usa"}.svg`}
          alt={`Flag of ${lang?.lang || "USA"}`}
          title={`${lang?.lang || "USA"}`}
        />
        <div className="home-arrow-down"></div>
      </div>

      {langSelector && (
        <div className="langs-wrap">
          <img
            src="/media/images/entry_screens/entryLangBg.png"
            className="langs-background"
            alt="Background"
          />
          <div className="langs-list">
            {state.langCfg.map((itm, i) => (
              <div
                key={i}
                className="lang-button"
                onClick={() => updateLang(itm)}
              >
                <img
                  src={`/media/images/flags/${itm?.src}.svg`}
                  className="lang-flag"
                  alt={`Flag of ${itm?.lang}`}
                />
                <p className="lang-title">
                  <span>{itm?.lang}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

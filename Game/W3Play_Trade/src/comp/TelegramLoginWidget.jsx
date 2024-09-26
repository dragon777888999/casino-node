import React, { useEffect, useCallback } from 'react';

const TelegramLoginWidget = ({ botName, callbackUrl }) => {
  const updateWidgetAttributes = useCallback((script) => {
    const screenWidth = window.innerWidth;
    const widgetSize = screenWidth <= 767 ? "medium" : "large";

    script.setAttribute("data-size", widgetSize);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";

    // Set static attributes
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "10");
    script.setAttribute("data-auth-url", callbackUrl);
    script.setAttribute("data-request-access", "write");

    // Update dynamic attributes based on initial screen size and theme
    updateWidgetAttributes(script);

    document.getElementById("telegram-login-container").appendChild(script);

    // Update on resize and theme change
    const handleResizeOrThemeChange = () => updateWidgetAttributes(script);
    window.addEventListener('resize', handleResizeOrThemeChange);

    return () => {
      window.removeEventListener('resize', handleResizeOrThemeChange);
    };
  }, [botName, callbackUrl, updateWidgetAttributes]);

  return (
    <div className="telegram-widget-wrapper">
      <div id="telegram-login-container" className="custom-telegram-widget"></div>
    </div>
  );
};

export default TelegramLoginWidget;

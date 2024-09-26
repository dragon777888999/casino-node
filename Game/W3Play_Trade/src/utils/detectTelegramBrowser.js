// 1. actions for iOS Telegram browser
// 2. actions for Android Telegram browser
// 3. actions for Telegram bot browser
export default () => {
    if (navigator.userAgent.includes('iPhone') && window.TelegramWebviewProxy
        || navigator.userAgent.includes('Android') && window.TelegramWebviewProxy
        || /telegrambot|telegram|tg:\/\/|tgbot/i.test(navigator.userAgent)) {
        return true;
    }
    else false;
}
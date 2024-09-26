// send message across outer domain
// currently is set for app.botradar.io domain
export default function sendSessionStorage() {
    const sessionData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        sessionData[key] = sessionStorage.getItem(key);
    }
    console.log(sessionData, 'sessionData')

    const targets = ["https://app.botradar.io", "http://localhost:3000"];

    targets.forEach(target => {
        window.parent.postMessage(
            { action: "sendSessionStorage", sessionData: JSON.stringify(sessionData) },
            target
        );
    });
};
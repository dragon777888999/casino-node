// make a DOM element from a string
// 1. create a new DOM parser
// 2. parse the HTML string into a document
// 3. extract the iframe element
export default function parseIframeStringWithDOM(iframeString) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(iframeString, 'text/html');
        const iframeElement = doc.querySelector('iframe');

        if (iframeElement) {
            return {
                src: iframeElement.getAttribute('src') || '',
                sandbox: iframeElement.hasAttribute('sandbox')
            };
        } else {
            return { src: '', sandbox: false };
        }
    } catch (error) {
        console.error('Error parsing iframe string:', error);
        return { src: '', sandbox: false };
    }
};
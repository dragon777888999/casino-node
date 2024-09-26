// function to remove the debridge-widget script
export default function removeDebridgeWidgetScript() {
    const scriptElements = document.body.querySelectorAll('script[data-script-type="debridge-widget"]');
    
    scriptElements.forEach((scriptElement) => {
        document.body.removeChild(scriptElement);
    });

    const deswapDiv = document.getElementById('deswap');
    //remove the inner content
    if (deswapDiv) {
        deswapDiv.innerHTML = '';
    }
}
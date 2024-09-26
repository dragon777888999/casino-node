import { browserName } from 'react-device-detect';

function JSON_safe_parse (json) {
    // This function cannot be optimised, it's best to
    // keep it small!
    var parsed

    try {
        parsed = JSON.parse(json)
    } catch (e) {
        // Oh well, but whatever...
    }
    return parsed // Could be undefined!
}

const ws_methods = ['onopen', 'onmessage', 'onerror', 'onclose'];

export default class Streamer{
    constructor(name, url, cfg){
        this.name = name
        this.url = url;
        this.cfg = cfg||{};
        this.WS = null
        this.lastMessage = null;
        this.closed = false;
        this.debug = this.cfg.debug;
        this.isInit = this.cfg.isInit;
        this.onUpdate = this.cfg.onUpdate;
        this.nonJSON = this.cfg.nonJSON;
        for(let method of ws_methods) this[method] = this[method].bind(this);
    }

    start(){
        if(this.WS) this.WS.close(1000);

        //If the user using Metamask mobile browser we should use proxy streamer
        //Proxy streamer is the same streamer but with proxied DNS settings in Cloudflare
        //Use it only from platforms that cannot connect to websockets
        const metamaskBrowser = navigator.userAgent.includes("MetaMaskMobile");
        const coinbaseBrowser = (browserName.toLowerCase() === 'webkit');
	    const coinbaseAndroid = browserName.toLowerCase() === 'chrome webview';
        const imToken= browserName.toLowerCase() === 'android browser';
	    const specialBrowser = metamaskBrowser || coinbaseBrowser || coinbaseAndroid || imToken;
        if (/*navigator.userAgent.includes("MetaMaskMobile")*/ specialBrowser){
            let urlSplitted = this.url.split('.');
            urlSplitted[0] = urlSplitted[0] + '-proxy'; 
            this.url = urlSplitted.join('.');
        }

        this.WS = new WebSocket(this.url);
        for(let method of ws_methods) this.WS[method] = this[method];
    }

    stop(){
        if(this.WS) {
			this.WS.close(1000);
			delete this.WS;
		};
        this.closed = true;
    }

    onopen(e){
        if(this.debug) console.log(this.name, 'onopen', JSON.stringify(e));
    }
    onmessage(e){
        // if(this.name == 'leaderboard') return;
        if(e.type === 'message'){
            let data;
            if(this.nonJSON) data = e.data;

            else{
                data = JSON_safe_parse(e.data);
                if(data === undefined) {
                    console.log('ERROR: failed to parse '+this.name+' streamer update as json:');
                    return;
                }
            }

            this.lastMessage = data;

            if(this.debug) console.log(this.name, 'onmessage');

            // for monitoring update rates
            // rec_call(this.name)

            if(this.onUpdate) this.onUpdate(data);
            
            // init streamers are meant for a single message
            if(this.isInit) this.stop();
        }
    }
    onerror(e){
        if(this.debug) console.log(this.name, 'onerror', JSON.stringify(e));
    }
    onclose(e){
        if(this.debug) console.log(this.name, 'onclose', JSON.stringify(e));

        var _that = this;
        setTimeout(() => {
            if(_that.closed) return;
            if(_that.debug) console.log(_that.name, 'restarting...');
            _that.start();
        }, 500)
    }
}




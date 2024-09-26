import { browserName } from "react-device-detect";

/**
 * StreamerSingleton is a singleton class that manages WebSocket connections for different streamers.
 * It ensures only one active WebSocket instance per unique combination of name and URL.
 */
const StreamerSingleton = (function () {
  let instances = {}; // Stores WebSocket instances keyed by a unique name and URL combination.
  const debug = false; // Set to true for additional debugging output.

  /**
   * Safely parses JSON strings, returning undefined if parsing fails.
   * @param {string} json - The JSON string to parse.
   * @returns {Object|undefined} - The parsed object or undefined if parsing fails.
   */
  function JSON_safe_parse(json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Initializes a new WebSocket instance and binds event handlers.
   * @param {string} name - The name of the WebSocket instance.
   * @param {string} url - The URL for the WebSocket connection.
   * @param {Object} cfg - Configuration object for the WebSocket.
   * @returns {WebSocket} - The initialized WebSocket instance.
   */
  function init(name, url, cfg) {
    let WS = new WebSocket(url);

    WS.name = name;
    WS.cfg = cfg || {};
    WS.lastMessage = "";

    // Bind WebSocket events to their respective handlers
    WS.onopen = function (e) {
      onopen.call(WS, e);
    };
    WS.onmessage = function (e) {
      onmessage.call(WS, e);
    };
    WS.onerror = function (e) {
      onerror.call(WS, e);
    };
    WS.onclose = function (e) {
      onclose.call(WS, e);
    };

    return WS;
  }

  /**
   * Modifies the URL for certain special browsers that require a proxy.
   * @param {string} url - The original URL.
   * @returns {string} - The potentially modified URL for special browsers.
   */
  function isSpecialBrowser(url) {
    const metamaskBrowser = navigator.userAgent.includes("MetaMaskMobile");
    const coinbaseBrowser = browserName.toLowerCase() === "webkit";
    const coinbaseAndroid = browserName.toLowerCase() === "chrome webview";
    const imToken = browserName.toLowerCase() === "android browser";
    const specialBrowser =
      metamaskBrowser || coinbaseBrowser || coinbaseAndroid || imToken;

    if (specialBrowser) {
      let urlSplitted = url.split(".");
      urlSplitted[0] = urlSplitted[0] + "-proxy";
      return urlSplitted.join(".");
    }

    return url;
  }

  /**
   * Handles the WebSocket onopen event.
   * @param {Event} e - The event object.
   */
  function onopen(e) {
    const instance = instances[getUniqueKey(this.name, this.url)];
    if (instance && instance.debug)
      console.log(this.name, "onopen", JSON.stringify(e));
  }

  /**
   * Handles the WebSocket onmessage event.
   * @param {MessageEvent} e - The event object containing the message data.
   */
  function onmessage(e) {
    const instance = instances[getUniqueKey(this.name, this.url)];
    if (e.type === "message" && instance) {
      let data = instance.cfg.nonJSON ? e.data : JSON_safe_parse(e.data);
      if (data === undefined) {
        if (instance.debug)
          console.log(
            "ERROR: failed to parse " + this.name + " streamer update as JSON"
          );
        return;
      }

      instance.lastMessage = data;
      if (instance.debug) console.log(instance.name, "onmessage called");

      if (instance.cfg.onUpdate) {
        instance.cfg.onUpdate(data);
      }
    }
  }

  /**
   * Handles the WebSocket onerror event.
   * @param {Event} e - The event object containing error information.
   */
  function onerror(e) {
    const instance = instances[getUniqueKey(this.name, this.url)];
    if (instance && instance.debug)
      console.log(
        "StreamerSingleton::onerror",
        instance.name,
        "onerror",
        JSON.stringify(e)
      );
  }

  /**
   * Handles the WebSocket onclose event and attempts to restart the connection if not manually closed.
   * @param {CloseEvent} e - The event object containing close information.
   */
  function onclose(e) {
    const instance = instances[getUniqueKey(this.name, this.url)];
    if (instance && instance.debug)
      console.log(
        "StreamerSingleton::onclose",
        instance.name,
        "onclose",
        JSON.stringify(e)
      );

    // // Alert when the streamer is closing
    // alert(`Streamer ${this.name} is closing.`);
    if (instance && !instance.closed) {
      setTimeout(() => {
        if (instance.debug) console.log(instance.name, "restarting...");
        instances[getUniqueKey(instance.name, instance.url)] = init(
          instance.name,
          instance.url,
          instance.cfg
        );
      }, 500);
    }
  }

  /**
   * Generates a unique key for each WebSocket instance based on name and URL.
   * @param {string} name - The name of the WebSocket instance.
   * @param {string} url - The URL of the WebSocket connection.
   * @returns {string} - The unique key representing the WebSocket instance.
   */
  function getUniqueKey(name, url) {
    return `${name}_${url}`;
  }

  return {
    /**
     * Returns an existing WebSocket instance if it exists, or creates a new one if it doesn't.
     * @param {string} name - The name of the WebSocket instance.
     * @param {string} url - The URL for the WebSocket connection.
     * @param {Object} cfg - Configuration object for the WebSocket.
     * @returns {WebSocket} - The WebSocket instance.
     */
    getInstance(name, url, cfg) {
      url = isSpecialBrowser(url);
      const key = getUniqueKey(name, url);

      if (!instances[key] || instances[key].readyState === WebSocket.CLOSED) {
        instances[key] = init(name, url, cfg);
        instances[key].closed = false;
      }

      return instances[key];
    },

    /**
     * Closes an existing WebSocket instance and removes it from the instances list.
     * @param {string} name - The name of the WebSocket instance.
     * @param {string} url - The URL for the WebSocket connection.
     */
    closeInstance(name, url) {
      const key = getUniqueKey(name, url);
      const instance = instances[key];

      if (instance) {
        instance.onclose = null; // Remove the onclose handler to prevent auto-reconnect
        instance.closed = true;
        instance.close();
        delete instances[key];
        console.log("Closed streamer for:", key);

        // // Alert when the streamer is explicitly closed
        // alert(`Streamer ${name} is closed and instance removed.`);

        // Force closing on MetaMask
        if (navigator.userAgent.includes("MetaMaskMobile")) {
          try {
            instance.terminate(); // Forcefully terminate WebSocket
          } catch (e) {
            console.log("Forced termination failed, nullifying instance", e);
            instance = null;
          }
        }
      }
    },

    /**
     * Closes all existing WebSocket instances, useful when resetting the entire state.
     */
    closeAllInstances() {
      Object.keys(instances).forEach((key) => {
        // alert(`Closing streamer for: ${key}`);
        const instance = instances[key];
        if (instance) {
          instance.onclose = null;
          instance.closed = true;
          instance.close();
          delete instances[key];
          // alert(`All streamers closed and instances removed.`);
        }
      });
    },
  };
})();

export default StreamerSingleton;

// LOGIC FOR AUTO FULL SCREEN
export function setFullScreen() {
    let docEl = document?.documentElement,
        fullscreenReq = (docEl?.requestFullscreen
            || docEl?.webkitRequestFullScreen
            || docEl?.mozRequestFullScreen
            || docEl?.msRequestFullscreen);
    fullscreenReq && fullscreenReq?.call(docEl);
    // document.body.requestFullscreen();
}
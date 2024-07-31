import config from '../config';

function Body() {
    const gameCodes = ["aviator", "mines", "goal", "dice", "plinko", "keno", "hilo", "hotline", "mini-roulette"];
    const onGameClick = (vendorCode,gameCode) => {
        fetch(`${config.backendUrl}/backend/authorizeapi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    method: "GetLaunchUrl",
                    vendorCode: vendorCode,
                    gameCode: gameCode,
                    currencyCode: ''
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status == 0)
                    window.open(data.launchUrl);
                else
                    window.alert(data.status);
            })
            .catch(error => {

            });
    };
    return (
        <div>
            <section className="banner"></section>
            <section className="games">
                <div className="bannerDown">
                    <div className="bannerDownLeftLine"></div>
                    <p className="bannerDownText">PLAY BIG WIN BIG</p>
                    <div className="bannerDownRightLine"></div>
                </div>
                <div className="game-grid">
                    {gameCodes.map((gameCode, index) => (
                        <div key={gameCode} className="game">
                            <img src={`/enTheme2/images/${gameCode}.png`} onClick={() => onGameClick('Spribe_Mini',gameCode)} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
export default Body;
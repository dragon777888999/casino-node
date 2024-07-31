import {
    WalletConnectionStatus,
    useWalletManager,
} from "@marsprotocol/wallet-connector"
import { backendUrl } from "../anchor/setup";
import { accessToken, userInfo, setSiteInfo } from '../anchor/global';
import { useState } from "react";

export default function Body() {
    const [gameUrl, setGameUrl] = useState("");
    const { connect, status, connectedWallet, disconnect } = useWalletManager()
    const listGames = ["aviator", "mines", "goal", "dice", "plinko", "keno", "hilo", "hotline", "mini-roulette"];
    const onClickGame = async (vendorCode: string, gameCode: string) => {
        try {
            const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': accessToken
                },
                body: JSON.stringify({ method: "GetLaunchUrl", vendorCode, gameCode, userCode: connectedWallet?.account.address, currencyCode:userInfo.selectedCoinType }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.status == 0) {
                setGameUrl(result.launchUrl);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <section className="container content">
            {gameUrl != "" ? (<section>
                <div className="center-wrapper">
                    <button className="back-btn" onClick={() => { setGameUrl("") }}>Back</button>
                </div>
                <div className="iframe-container">
                    <iframe src={gameUrl}
                        allowFullScreen
                        frameBorder="0">
                    </iframe>
                </div>
            </section>
            ) : (
                <>
                    <section className="banner">
                        <img id="banner1" src="/images/banner1.png" alt="Banner" />
                        <img id="banner2" src="/images/banner1.png" alt="Banner" />
                    </section>
                    <section className="games">
                        <h2>Play Games</h2>
                        <div className="game-grid">
                            {listGames.map((gameCode, index) => (
                                <div className="gameCode" key={index}>
                                    <img src={`/images/${gameCode}.png`} onClick={() => onClickGame('Spribe_Mini', gameCode)} />
                                </div>
                            ))}
                        </div>
                        {/* <script>
                        function launchGame(vendorCode,gameCode) {
                            $.ajax({
                                url: '/backend/authorizeapi',
                                method: 'post',
                                data: {
                                    request: JSON.stringify({
                                        method: "GetLaunchUrl",
                                        vendorCode: vendorCode,
                                        gameCode: gameCode,
                                        currencyCode: '@ViewBag.Coin'
                                    })
                                },
                                success: function (data) {
                                    if (data.status == 0) {
                                        window.open(data.launchUrl);
                                    } else {
                                        window.alert('error');
                                    }
                                }
                            })
                        }
                    </script> */}
                    </section>
                </>
            )}

            {/* <script>
            document.getElementById("withdrawAddress").value = `@ViewBag.UserCode`;
            getDepositAddress();
            function getDepositAddress() {
                $.ajax({
                    url: '/backend/authorizeapi',
                    method: 'post',
                    data: {
                        request: JSON.stringify({
                            method: "GetDepositAddress",
                            chain: '@ViewBag.Chain',
                            coinType: '@ViewBag.Coin'
                        })
                    },
                    success: function (data) {
                        if (data.status == 0) {
                            document.getElementById("depositAddress").value = data.depositAddress;
                        } else {
                            window.alert('error');
                        }
                    }
                })
            }
            function withdrawCoin() {
                var amount = document.getElementById("amount").value;
                $.ajax({
                    url: '/backend/authorizeapi',
                    method: 'post',
                    data: {
                        request: JSON.stringify({
                            method: "WithdrawCoin",
                            chain: '@ViewBag.Chain',
                            coinType: '@ViewBag.Coin',
                            amount:amount
                        })
                    },
                    success: function (data) {
                        if (data.status == 0) {
                            document.getElementById("depositAddress").value = data.depositAddress;
                        } else {
                            window.alert('error');
                        }
                    }
                })
            }
    
            function copyAddress() {
                // Get the text field
                var copyText = document.getElementById("depositAddress");
    
                // Select the text field
                copyText.select();
                copyText.setSelectionRange(0, 99999); // For mobile devices
    
                // Copy the text inside the text field
                navigator.clipboard.writeText(copyText.value);
    
                // Alert the copied text
                alert("Copied the text: " + copyText.value);
            }
    
            function hideWithdrawButton() {
                document.getElementById("withdraw").style.display = "none";
                document.getElementById("deposit").style.display = "block";
                document.getElementById("confirmWithdraw").style.display = "block";
                document.getElementById("withdrawAmount").style.display = "block";
                document.getElementById("withdrawText").style.display = "block";
                document.getElementById("depositText").style.display = "none";
                document.getElementById("depositText").style.display = "none";
                document.getElementById("withdrawAddressContainer").style.display = "flex";
                document.getElementById("depositAddressContainer").style.display = "none";
    
            }
    
            function hideDepositButton() {
                document.getElementById("withdraw").style.display = "block";
                document.getElementById("deposit").style.display = "none";
                document.getElementById("confirmWithdraw").style.display = "none";
                document.getElementById("withdrawAmount").style.display = "none";
                document.getElementById("withdrawText").style.display = "none";
                document.getElementById("depositText").style.display = "block";
                document.getElementById("withdrawAddressContainer").style.display = "none";
                document.getElementById("depositAddressContainer").style.display = "flex";
    
            }
    
            function hideModal() {
                document.getElementById('depositModal').style.display = 'none';
            }
    
            function hideConfirmModal() {
                document.getElementById('confirmModal').style.display = 'none';
            }
    
            function showConfirmModal() {
                document.getElementById('confirmModal').style.display = 'block';
            }
        </script> */}
        </section>
    )
}
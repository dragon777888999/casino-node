import ConnectWallet from './component/ConnectWallet';

function Header() {
    return (
        <header>
            <div className="logo">
                <img src="/enTheme1/images/logo.png" alt="Oraicasino.io" />
            </div>

            {/* Extention Selection Modal Start*/}
            <div id="extensionSelectModal" className="modal">
                <div style={{position: 'relative'}}>
                    <div className="modal-leap">
                        <img src="public/images/leap3.png" alt="leap" />
                    </div>
                    <div className="modal-content">
                        <label for="walletExtensions">Choose an extension</label>
                        <div></div>
                        <button id="keplrSelectBtn" onclick="selectKeplrExtension()">Keplr</button>
                        <button id="leapSelectBtn" onclick="selectLeapExtension()">Leap</button>
                        {/* <div className="modal-buttons">
                            <div></div>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button id="extensionSelectBtn" className="confirm-btn" onclick="selectExtension()">Yes</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* Extension Selection Modal End */}

            {/* Button Section Start */}
            {/* <div style={{display: 'flex', alignItems: 'center'}}>
                @{
            if (ViewBag.IsLogin == 1)
                {
                        <div className="balance">
                            <img src="~/@ViewBag.ThemeCode/image/ethereum.png" alt="Profile Picture">
                            <span>@ViewBag.UserBalance @ViewBag.Coin</span>
                            <button className="deposit-btn" id="openModalBtn">Wallet</button>
                            <button className="deposit-btn" onclick="disconnectWallet()">Disconnet</button>
                        </div>
                        <div className="profile">
                            <img src="~/@ViewBag.ThemeCode/image/avatar.png" alt="Profile Picture">
                        </div>
                        <script>
                            function disconnectWallet() {
                                $.ajax({
                                    url: '/Account/Logout',
                                    method: 'get',
                                    success: function (res) {
                                        window.location.reload();
                                    }
                                });
                            }
                        </script>
                }
                else
                {
                        <div>
                            <button className="deposit-btn" id="connectWalletBtn" onclick="connectWallet()">Connect</button>
                        </div>
                        <script>
                            const getSolanaProvider = () => {
                                if ('phantom' in window) {
                                    const provider = window.phantom?.solana;

                                    if (provider?.isPhantom) {
                                        return provider;
                                    }
                                }
                                window.open('https://phantom.app/', '_blank');
                            };
                            const getLeapProvider = () => {
                                if ('leap' in window) {
                                    const provider = window.leap.getKey('Oraichain');
                                    return provider;
                                }
                                window.open('https://www.leapwallet.io/download', '_blank');
                            };
                            async function selectKeplrExtension() {
                                const userCode = await getKeplrAccount();
                                PostConnectWallet2Backend(userCode);
                            }
                            async function selectLeapExtension() {
                                const userCode = await getLeapAccount();
                                PostConnectWallet2Backend(userCode);
                            }
                            async function getKeplrAccount() {
                                try {
                                    const chainId = "@ViewBag.Chain";
                                    const offlineSigner = window.getOfflineSigner(chainId);
                                    const accounts = await offlineSigner.getAccounts();
                                    return accounts[0].address;
                                } catch (err) {
                                    console.error("Failed to get account", err);
                                }
                                return null;
                            }
                            async function getLeapAccount() {
                                try {
                                    const chainId = "@ViewBag.Chain";
                                    var key = await window.leap.getKey(chainId);
                                    return key.bech32Address;
                                } catch (err) {
                                    console.error("Failed to get account", err);
                                }
                                return null;
                            }
                            async function connectWallet() {
                                var existKeplr = 'keplr' in window;
                                var existLeap = 'leap' in window;

                                if (!existKeplr && !existLeap) {
                                    window.open('https://keplr.app/download', '_blank');
                                    return;
                                }
                                if (existKeplr && existLeap) {
                                    if (!existKeplr)
                                        document.getElementById('keplrSelectBtn').style.display = 'none';
                                    if (!existLeap)
                                        document.getElementById('leapSelectBtn').style.display = 'none';
                                    document.getElementById('extensionSelectModal').style.display = 'block';
                                    return;
                                }
                                if (existKeplr && !existLeap) {
                                    await selectKeplrExtension();
                                    return;
                                }
                                if (!existKeplr && existLeap) {
                                    await selectLeapExtension();
                                    return;
                                }
                            }
                            function PostConnectWallet2Backend(userCode) {
                                if (userCode == null) {
                                    location.reload(); 
                                    return;
                                }

                                $.ajax({
                                    url: '/Account/ConnectWallet',
                                    type: 'POST',
                                    data: {
                                        agentCode: agentCode,
                                        userCode: userCode,
                                        nickName: "adsert"
                                    },
                                    success: function (jData) {
                                        location.reload();
                                    },
                                    error: function (xhr, textStatus, errorThrown) {
                                    }
                                });
                            }

                        </script>
                }
        }
            </div> */}
            <ConnectWallet />
            {/* Button Section End */}

        </header>

    );
}

export default Header;
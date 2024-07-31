export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    {/* <p>JOIN OUR <br /> COMMUNITY</p> */}
                    <a id="logo1" href="https://www.oraicasino.io">
                        <img src="/images/logo.png" alt="" style={{ width: `180px`, marginTop: `10px` }} />
                    </a>
                </div>
                <div className="footer-right">
                    <a href="https://discord.gg/DbChgH8d">
                        <img src="/images/discord.png" alt="Discord" />
                    </a>
                    <a href="https://twitter.com/oraicasino">
                        <img src="/images/twitter.png" alt="Twitter" />
                    </a>
                </div>
            </div>
            <a id="logo2" href="">
                <img src="/images/logo.png" alt="" style={{ width: `120px`, marginTop: `10px` }} />
            </a>
            <p className="footer-bottom">© 2024 oraicasino. All rights reserved.</p>
        </footer>);
}

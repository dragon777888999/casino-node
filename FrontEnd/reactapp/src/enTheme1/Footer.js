function Footer() {
    return (<footer>
        <div className="footer-container">
            <div className="footer-left">
                <p>JOIN OUR <br /> COMMUNITY</p>
                <a id="logo1" href="">
                    <img src="/enTheme1/images/logo.png" alt="" style={{ width: `180px`, marginTop: `10px;` }} />
                </a>
            </div>
            <div className="footer-right">
                <a href="">
                    <img src="/enTheme1/images/discord.png" alt="Discord" />
                </a>
                <a href="">
                    <img src="/enTheme1/images/twitter.png" alt="Twitter" />
                </a>

            </div>
        </div>
        <a id="logo2" href="">
            <img src="/enTheme1/images/logo.png" alt="" style={{ width: `120px`, marginTop: `10px` }} />
        </a>
        <p className="footer-bottom">© 2024 oraicasino. All rights reserved.</p>
    </footer>);
}

export default Footer;
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left_c">
          <p>JOIN OUR COMMUNITY</p>
        </div>
        <div className="footer-center">
          <a href="https://discord.com/invite/wKYXVM89jd">
            <img
              src="/csTheme/images/discord.png"
              alt="Discord"
              style={{ padding: "30px" }}
            />
          </a>

          <a href="https://x.com/CraftyStake">
            <img
              src="/csTheme/images/twitter.png"
              alt="Twitter"
              style={{ padding: "30px" }}
            />
          </a>
        </div>
        <p className="footer-right">{`© 2024 CraftyStake. All rights reserved.`}</p>
      </div>
    </footer>
  );
};
export default Footer;

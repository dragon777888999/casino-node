const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <p>JOIN OUR COMMUNITY</p>
        </div>
        <div className="footer-center">
          <a href="">
            <img src="/roTheme/images/discord.png" alt="Discord" />
          </a>
          <a href="">
            <img src="/roTheme/images/fg.png" alt="Twitter" />
          </a>
          <a href="">
            <img src="/roTheme/images/twitter.png" alt="Twitter" />
          </a>
        </div>
        <p className="footer-right">{`© 2024 . All rights reserved.`}</p>
      </div>
    </footer>
  );
};
export default Footer;
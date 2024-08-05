import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import LogoImage from "../assets/image/Logo.png";
import twitterImg from "../assets/image/twitter.svg";
import githubImg from "../assets/image/github.svg";
import discordImg from "../assets/image/discord.svg";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import UserInfo from "../../../components/UserInfo";

const Header = () => {
  const wallet = useWallet();
  return (
    <header className="container">
      <div
        className="logo"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src="/roTheme/images/logo.png" alt="ROOGSINO" />
      </div>
      <div className="roo_button">
        {wallet.connected ? (
          <UserInfo />
        ) : (
          <WalletMultiButton className="balance" />
        )}
      </div>
    </header>
  );
};
export default Header;

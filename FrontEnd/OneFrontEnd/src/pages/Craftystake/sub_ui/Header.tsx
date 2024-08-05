import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import "../style_c.css";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import UserInfo from "../components/UserInfo";

const Header = () => {
  const wallet = useWallet();
  return (
    <header className="container">
      <img
        src="/csTheme/images/logo.png"
        alt="LOGO"
        style={{ height: "50px" }}
      />
      <div className="cs_button">
        {wallet.connected ? (
          <UserInfo />
        ) : (
          <WalletMultiButton className="balance" />
        )}
      </div>

      <img src="/csTheme/images/avatar.png" alt="Profile Picture" />
    </header>
  );
};
export default Header;

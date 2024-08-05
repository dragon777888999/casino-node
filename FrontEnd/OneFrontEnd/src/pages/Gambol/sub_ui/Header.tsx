import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { useWallet } from "@solana/wallet-adapter-react";
import UserInfo from "../../../components/UserInfo";

const Header = () => {
  const wallet = useWallet();
  return (
    <header className="header_gambol">
      <img
        src="/gamTheme/images/logo.png"
        alt="GAMBOL LOGO"
        style={{ height: "100px", width: "100px" }}
      />
      <img src="/gamTheme/images/title.png" alt="GAMBOL" className="title" />
      <div className="gam_button">
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

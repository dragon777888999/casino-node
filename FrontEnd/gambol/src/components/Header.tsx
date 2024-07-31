import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import LogoImage from "../assets/image/Logo.png";
import twitterImg from "../assets/image/twitter.svg";
import githubImg from "../assets/image/github.svg";
import discordImg from "../assets/image/discord.svg";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import UserInfo from "./UserInfo"

const Header = () => {
    const wallet = useWallet();
    return (
        <header>
            <img src="/enTheme2/images/logo.png" alt="GAMBOL LOGO" style={{ height: '100px', width: '100px' }} />
            <img src="/enTheme2/images/title.png" alt="GAMBOL" className="title" />
            {
                wallet.connected ?
                    <UserInfo /> :

                    <WalletMultiButton className="balance" />

            }
        </header>
    );
};
export default Header;

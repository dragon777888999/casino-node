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
            <div className="logo" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/enTheme2/images/logo.png" alt="ROOGSINO" />
            </div>
            {
                wallet.connected ?
                    <UserInfo /> :

                    <WalletMultiButton className="balance" />

            }

        </header>
    );
};
export default Header;

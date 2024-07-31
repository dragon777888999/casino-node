
import UserInfo from './component/UserInfo';
import ConnectWallet from './component/ConnectWallet';

function Header() {
    const currentState={isLoginIn:0};
    return (
        <header>
            <div className="logo" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/enTheme2/images/logo.png" alt="ROOGSINO" />
            </div>
            {
                currentState.isLogin == 1?<UserInfo/>:<ConnectWallet />
            }
        
        </header>
    );
}

export default Header;
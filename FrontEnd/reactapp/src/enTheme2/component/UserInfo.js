function UserInfo() {
    return (
        <div className="subHeader">
        <div className="position: relative">
            <div className="balance">
                <span>JACK DINO</span>
                <div className="deposit-btn" id="openModalBtn">6.60 ETH</div>
                <button
                    style={{background: 'none',border: 'none',width: '30px',textAlign: 'center'}}
                    id="arrowBtn"
                    onclick="showMenu()"
                >
                    <img
                        src="/enTheme2/images/arrowDown.png"
                        alt=""
                        style={{width: '13px', marginLeft: '7px'}}
                    />
                </button>
            </div>
            <div
                id="menu"
                style={{position: 'absolute',display: 'none',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', width: '220px', background: 'linear-gradient(180deg, #140805 0%, #633275 100%)'}}
                onmouseleave="this.style.display = 'none';"
            >
                <button
                    style={{display: 'flex',justifyCntent: 'space-between',padding: '8px 14px',background: 'rgba(255, 229, 172, 0.09)',alignItems: 'center', gap: '5px',width: '100%',border: 'none'}}
                    onclick="showModal()"
                >
                    <p
                        style={{color: '#fff',textAlign: 'center', fontFamily: 'Oswald',fontSize: '16px',fontStyle: 'normal',fontWeight: 600}}
                    >
                        MANAGE BALANCE
                    </p>
                    <img src="/enTheme2/images/arrowRight.png" />
                </button>
                <button
                    style={{display: 'flex', justifyContent: 'center',padding: '2px 14px',background: 'none',alignItems: 'center',gap: '5px',width: '100%',border: 'none'}}
                >
                    <p
                        style={{color: '#b2b2b2',textAlign: 'center',fontFamily: 'Oswald',fontSize: '16px',fontStyle: 'normal',fontWeight: '600'}}
                    >
                        DISCOUNNECT
                    </p>
                </button>
            </div>
        </div>
        <div className="profile">
            <img src="/enTheme2/images/avatar.png" alt="Profile Picture" />
        </div>
    </div>
        );
  }
  
  export default UserInfo;
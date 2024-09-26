import React, { useContext } from 'react';
import { DataContext } from '../utils/state';
import ThemeToggle from './ThemeToggle';

const titles = {
    0: "Swap out",
    1: "Swap out",
    2: "Swap out",
    // 2: "Recipient",
    // 3: "Success",
};

function Header({ index, onBackClick, decrementStatus }) {
    const { theme, toggleTheme } = useContext(DataContext);
    const title = titles[index] || titles[0];
    const preventPrevious = [0, 2]

    const handleBackClick = () => {
        onBackClick();
        if (index >= 1) {
            decrementStatus();
        }
    };

    return (
        <div className={`header ${theme}`}>
            {preventPrevious.includes(index)
                ? <div />
                : <div className='back' onClick={handleBackClick} />
            }
            <ThemeToggle theme={theme} toggleTheme={toggleTheme}></ThemeToggle>
            <div className='header_title'>
                {title}
            </div>
            <div className='logo' />
        </div>
    );
}

export default Header;
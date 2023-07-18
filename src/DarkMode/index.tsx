import React, { useEffect, useState } from 'react';
import './index.css';

const Index = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const body = document.querySelector('body');
        if (darkMode) {
            body?.classList.add('dark');
        } else {
            body?.classList.remove('dark');
        }
    }, [darkMode]);
    
    return (
        <button className='theme' onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default Index;
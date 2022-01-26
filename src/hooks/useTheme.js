import { useState } from 'react';

import themes from '../assets/styles/theme';

const useTheme = (initialTheme) => {
    const [theme, setTheme] = useState(initialTheme);

    const applyTheme = (newTheme) => {
        window.localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleTheme = () => applyTheme(theme === 'light' ? 'dark' : 'light');

    return { theme: themes[theme], toggleTheme, isDark: theme === 'dark' };
};

export default useTheme;

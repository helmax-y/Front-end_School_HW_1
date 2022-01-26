import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Feed from '../../pages/Feed';
import Profile from '../../pages/Profile';
import GlobalStyle from '../../assets/styles';
import ThemeSwitch from '../ThemeSwitch';
import useTheme from '../../hooks/useTheme';

const App = function () {
    const { theme, toggleTheme, isDark } = useTheme(window.localStorage.getItem('theme'));

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ThemeSwitch
                onClick={toggleTheme}
                sx={{ m: 1 }}
                checked={isDark}
            />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/:userId" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
};

export default App;

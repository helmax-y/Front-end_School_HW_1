import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles';
import Feed from './components/Feed';
import Profile from './components/Profile';

const App = function () {
    return (
        <>
            <GlobalStyle />
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/:userId" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </HashRouter>
        </>
    );
};

export default App;

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Feed from '../../pages/Feed';
import Profile from '../../pages/Profile';
import GlobalStyle from '../../assets/styles';

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

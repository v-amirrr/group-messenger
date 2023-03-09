import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import backgroundSRC from './assets/images/bg.webp';
import Messenger from './components/Messenger';
import WarningPage from './components/WarningPage';
import Login from './components/Login';
import { useGetMessages } from './hooks/useGetMessages';
import { useWarningPage } from './hooks/useWarningPage';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const App = () => {

    const location = useLocation();

    const { getMessages } = useGetMessages();
    const { showWelcomePages } = useWarningPage();

    useEffect(() => {
        getMessages();
        showWelcomePages();
    }, []);

    return (
        <>
            <Background><img src={backgroundSRC} /></Background>

            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Messenger />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
    }
`;

export default App;
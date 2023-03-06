import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Messenger from './components/Messenger';
import Modals from './components/Modals';
import backgroundSRC from './assets/images/bg.webp';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const App = () => {

    const location = useLocation();

    return (
        <>
            <Modals />
            <Background><img src={backgroundSRC} /></Background>

            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Messenger />} />
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
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Messenger from './components/Messenger';
import WarningPage from './components/WarningPage';
import LoginModes from './components/login/LoginModes';
import LoginWithName from './components/login/LoginWithName';
import Settings from './components/settings/Settings';
import MessengerBackground from './components/MessengerBackground';
import { useGetMessages } from './hooks/useGetMessages';
import { useWarningPage } from './hooks/useWarningPage';
import { AnimatePresence } from 'framer-motion';
import { useChangeTheme } from './hooks/useChangeTheme';

const App = () => {

    const location = useLocation();

    const { getMessages } = useGetMessages();
    const { showWelcomePages } = useWarningPage();
    const { setDefaultTheme } = useChangeTheme();

    useEffect(() => {
        setDefaultTheme();
        getMessages();
        showWelcomePages();
    }, []);

    return (
        <>
            <MessengerBackground />

            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Messenger />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/login" element={<LoginModes />} />
                    <Route path='/login/login-with-name' element={<LoginWithName />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
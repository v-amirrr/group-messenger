import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Messenger from './components/Messenger';
import WarningPage from './components/WarningPage';
import EnterModes from './components/Authentication/EnterModes';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Settings from './components/settings/Settings';
import Guidance from './components/Guidance';
import MessengerBackground from './components/MessengerBackground';
import Popup from './components/popups/Popup';
import { useGetMessages } from './hooks/useGetMessages';
import { useWarningPage } from './hooks/useWarningPage';
import { useChangeTheme } from './hooks/useChangeTheme';
import { useNotification } from './hooks/useNotification';
import { useSelect } from './hooks/useSelect';
import { AnimatePresence } from 'framer-motion';

const App = () => {

    const location = useLocation();

    const { getMessages, loadingOn } = useGetMessages();
    const { showWelcomePages } = useWarningPage();
    const { setDefaultTheme } = useChangeTheme();
    const { setDefaultNotification, clearNotifications } = useNotification();
    const { clearSelectedMessages } = useSelect();

    useEffect(() => {
        setDefaultTheme();
        setDefaultNotification();
        loadingOn();
        getMessages();
        showWelcomePages();
    }, []);

    useEffect(() => {
        clearSelectedMessages();
        clearNotifications();
    }, [location.pathname])

    return (
        <>
            <MessengerBackground />

            <Popup />

            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Messenger />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/enter" element={<EnterModes />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/guidance' element={<Guidance />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Messenger from './components/Messenger';
import WarningPage from './components/WarningPage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/settings/SettingsPage';
import GuidancePage from './components/GuidancePage';
import MessengerBackground from './components/MessengerBackground';
import Popup from './components/popups/Popup';
import Notification from './components/Notification';
import { useGetMessages } from './hooks/useGetMessages';
import { useWarningPage } from './hooks/useWarningPage';
import { useChangeTheme } from './hooks/useChangeTheme';
import { useNotification } from './hooks/useNotification';
import { useSelect } from './hooks/useSelect';
import { AnimatePresence } from 'framer-motion';

const App = () => {

    const location = useLocation();

    const { getMessages, loadingOn, getUsers } = useGetMessages();
    const { showWelcomePages } = useWarningPage();
    const { setDefaultTheme } = useChangeTheme();
    const { setDefaultNotification, clearNotifications } = useNotification();
    const { clearSelectedMessages } = useSelect();

    useEffect(() => {
        setDefaultTheme();
        setDefaultNotification();
        loadingOn();
        getMessages();
        getUsers();
        showWelcomePages();
    }, []);

    useEffect(() => {
        clearSelectedMessages();
        clearNotifications();
    }, [location.pathname])

    return (
        <>
            <Notification />
            <MessengerBackground />
            <Popup />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<Messenger />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/guidance' element={<GuidancePage />} />
                    <Route path='*' element={<Messenger />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
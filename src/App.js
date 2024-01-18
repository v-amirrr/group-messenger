import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MessengerPage from './components/pages/MessengerPage';
import WarningPage from './components/pages/WarningPage';
import LoginPage from './components/pages/LoginPage';
import SettingsPage from './components/settings/SettingsPage';
import GuidancePage from './components/pages/GuidancePage';
import Background from './components/Background';
import Popup from './components/popups/Popup';
import Notification from './components/Notification';
import { useFirestore } from './hooks/useFirestore';
import { useWarningPage } from './hooks/useWarningPage';
import { useChangeTheme } from './hooks/useChangeTheme';
import { useNotification } from './hooks/useNotification';
import { useSelect } from './hooks/useSelect';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const location = useLocation();
    const { getMessages, getUsers } = useFirestore();
    const { showWarningPages } = useWarningPage();
    const { setDefaultTheme } = useChangeTheme();
    const { setDefaultNotification, clearNotifications } = useNotification();
    const { clearSelectedMessages } = useSelect();

    useEffect(() => {
        setDefaultTheme();
        setDefaultNotification();
        getMessages();
        getUsers();
        showWarningPages();
    }, []);

    useEffect(() => {
        clearSelectedMessages();
        clearNotifications();
    }, [location.pathname])

    return (
        <>
            <Notification />
            <Background />
            <Popup />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<MessengerPage />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/guidance' element={<GuidancePage />} />
                    <Route path='*' element={<MessengerPage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
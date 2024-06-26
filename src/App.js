import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MessengerPage from './components/pages/MessengerPage';
import WarningPage from './components/pages/WarningPage';
import LoginPage from './components/pages/LoginPage';
import SettingsPage from './components/settings/SettingsPage';
import GuidancePage from './components/pages/GuidancePage';
import TrashPage from './components/pages/TrashPage';
import Background from './components/Background';
import Modal from './components/modals/Modal';
import Notification from './components/Notification';
import { useRedirection } from './hooks/useRedirection';
import { useFirestore } from './hooks/useFirestore';
import { useNotification } from './hooks/useNotification';
import { useSelect } from './hooks/useSelect';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const location = useLocation();
    const { getMessages, getUsers } = useFirestore();
    const { setDefaultNotification } = useNotification();
    const { clearSelectedMessages } = useSelect();
    const { autoRedirection } = useRedirection();

    useEffect(() => {
        setDefaultNotification();
        getUsers();
        getMessages();
    }, []);

    useEffect(() => {
        autoRedirection(location.pathname);
        clearSelectedMessages();
    }, [location.pathname]);

    return (
        <>
            <Notification />
            <Background />
            <Modal />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<MessengerPage />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/guidance' element={<GuidancePage />} />
                    <Route path='/trash' element={<TrashPage />} />
                    <Route path='*' element={<MessengerPage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
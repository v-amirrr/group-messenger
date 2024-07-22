import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MessengerPage from './pages/messenger/MessengerPage';
import AuthPage from './pages/auth/AuthPage';
import WarningPage from './pages/warning/WarningPage';
import SettingsPage from './pages/settings/SettingsPage';
import GuidancePage from './pages/guidance/GuidancePage';
import TrashPage from './pages/trash/TrashPage';
import Background from './components/Background';
import Modal from './components/Modal';
import Notification from './components/Notification';
import Loader from './components/Loader';
import { useRedirection } from './hooks/useRedirection';
import { useFirestore } from './hooks/useFirestore';
import { useSelect } from './hooks/useSelect';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const location = useLocation();
    const { getMessages, getUsers } = useFirestore();
    const { clearSelectedMessages } = useSelect();
    const { autoRedirection } = useRedirection();

    useEffect(() => {
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
            <Loader />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<MessengerPage />} />
                    <Route path="/warning" element={<WarningPage />} />
                    <Route path="/auth" element={<AuthPage />} />
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
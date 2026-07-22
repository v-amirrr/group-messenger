import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MessengerPage from './pages/messenger/MessengerPage';
import AuthPage from './pages/auth/AuthPage';
import SettingsPage from './pages/settings/SettingsPage';
import TrashPage from './pages/trash/TrashPage';
import Modal from './components/Modal';
import Toast from './components/Toast';
import Loader from './components/Loader';
import { useRedirection } from './hooks/useRedirection';
import { useFirestore } from './hooks/useFirestore';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const location = useLocation();
    const { getMessages, getUsers } = useFirestore();
    useRedirection();

    useEffect(() => {
        getUsers();
        getMessages();
    }, []);

    return (
        <>
            <Toast />
            <Modal />
            <Loader />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.key}>
                    <Route index element={<MessengerPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/trash' element={<TrashPage />} />
                    <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
            </AnimatePresence>
        </>
    );
};

export default App;
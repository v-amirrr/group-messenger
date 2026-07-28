import React from 'react'
import { useSelector } from 'react-redux';
import MenuButton from './MenuButton';
import ScrollButton from './ScrollButton';
import { AnimatePresence } from 'framer-motion';

const MessengerButtons = () => {
    const { editReply } = useSelector(store => store.appStore);
    return (
        <AnimatePresence>
            {
                !editReply?.show &&
                <>
                    <MenuButton key='MenuButton' />
                    <ScrollButton key='ScrollButton' />
                </>
            }
        </AnimatePresence>
    );
};

export default MessengerButtons;
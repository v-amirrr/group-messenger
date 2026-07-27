import React from 'react'
import { useSelector } from 'react-redux';
import MenuButton from './MenuButton';
import ScrollButton from './ScrollButton';
import { AnimatePresence } from 'framer-motion';

export const MessengerButtons = ({ scrollButtonClickHandler, arrow }) => {
    const { editReply } = useSelector(store => store.appStore);
    return (
        <AnimatePresence>
            {
                !editReply?.show &&
                <>
                    <MenuButton key='MenuButton' />
                    <ScrollButton key='ScrollButton' click={scrollButtonClickHandler} arrow={arrow} />
                </>
            }
        </AnimatePresence>
    );
};

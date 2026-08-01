import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import MenuButton from './MenuButton';
import ScrollButton from './ScrollButton';
import { AnimatePresence } from 'framer-motion';

const MessengerButtons = memo(() => {
    const editReplyBarShow = useSelector(store => store.appStore.editReply.show);
    return (
        <AnimatePresence>
            {
                !editReplyBarShow &&
                <>
                    <MenuButton key='MenuButton' />
                    <ScrollButton key='ScrollButton' />
                </>
            }
        </AnimatePresence>
    );
});

export default MessengerButtons;
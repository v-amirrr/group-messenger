import React, { memo } from 'react'
import EditReplyBar from './EditReplyBar';
import SelectBar from './SelectBar';
import ChatInput from './input/InputBar';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

const MessengerBars = memo(() => {
    const editReplyBarShow = useSelector(store => store.appStore.editReply.show);
    const selectBarShow = useSelector(store => store.selectStore.selectedMessages.length);
    return (
        <AnimatePresence>
            {
                editReplyBarShow ?
                <EditReplyBar key='edit-reply' /> :
                selectBarShow ?
                <SelectBar key='select' /> :
                <ChatInput key='input' />
            }
        </AnimatePresence>
    );
});

export default MessengerBars;
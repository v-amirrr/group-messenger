import React from 'react'
import { AnimatePresence } from 'framer-motion';
import EditReplyBar from './EditReplyBar';
import SelectBar from './SelectBar';
import ChatInput from './input/ChatInput';
import { useSelector } from 'react-redux';

export const MessengerBars = () => {
    const { editReply } = useSelector(store => store.appStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    return (
        <AnimatePresence>
            {
                editReply?.show ?
                <EditReplyBar key='edit-reply' /> :
                selectedMessages.length ?
                <SelectBar key='select' /> :
                <ChatInput key='input' />
            }
        </AnimatePresence>
    );
};
import React, { memo, useRef } from 'react'
import Message from './message/Message';
import { useSelector } from 'react-redux';
import { isPersian } from '../../functions/isPersian';
import { chatMessagesVariants, messagesVariants } from '../../config/variants';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '../../hooks/useScroll';

const ChatMessages = () => {
    const chatRef = useRef();
    const chatEndRef = useRef();
    const { editReply } = useSelector(store => store.appStore);
    const { messages } = useSelector(store => store.firestoreStore);
    const { user } = useSelector(store => store.userStore);
    const { onChatScrollHandler } = useScroll(chatRef, chatEndRef);
    return (
        <motion.div className='messages' layout variants={messagesVariants} ref={chatRef} onScroll={onChatScrollHandler}>
            <AnimatePresence>
                {
                    editReply?.show ?
                    editReply?.messages?.map((messageData) => (
                        <Message
                            key={messageData.id}
                            type='EDIT_REPLY'
                            messageData={messageData}
                            isLocalMessage={user?.uid == messageData.uid}
                        />
                    )) :
                    messages?.map((messageData) => (
                        <Message
                            key={messageData.id}
                            type='CHAT'
                            messageData={messageData}
                            isLocalMessage={user?.uid == messageData.uid}
                        />
                    ))
                }
            </AnimatePresence>
            <div ref={chatEndRef} />
        </motion.div>
    );
};

export default memo(ChatMessages);
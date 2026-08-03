import React, { memo, useMemo, useRef } from 'react'
import Message from './message/Message';
import { useSelector } from 'react-redux';
import { isPersian } from '../../functions/isPersian';
import { chatMessagesVariants } from '../../config/variants';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '../../hooks/useScroll';

const ChatMessages = () => {
    const chatRef = useRef();
    const chatEndRef = useRef();
    const { editReply } = useSelector(store => store.appStore);
    const { messages } = useSelector(store => store.firestoreStore);
    const { user } = useSelector(store => store.userStore);
    const { onChatScrollHandler } = useScroll(chatRef, chatEndRef);

    const visibleMessages = useMemo(() => {
        if (!editReply?.show) return messages;
        const index = messages.findIndex(message => message.id === editReply.editingMessageId);
        return messages.slice(0, index);
    }, [messages, editReply.show]);

    return (
        <motion.div className='messages' layout variants={chatMessagesVariants} ref={chatRef} onScroll={onChatScrollHandler}>
            <AnimatePresence>
                {
                    visibleMessages?.map((messageData) => (
                        <Message
                            key={messageData.id}
                            type={editReply.show ? 'EDIT_REPLY' : 'CHAT'}
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
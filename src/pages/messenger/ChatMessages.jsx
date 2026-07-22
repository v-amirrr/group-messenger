import React, { memo } from 'react'
import Message from './message/Message';
import { useSelector } from 'react-redux';
import { isPersian } from '../../functions/isPersian';
import { chatMessagesVariants, messagesVariants } from '../../config/varitans';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '../../hooks/useScroll';

const ChatMessages = ({ chatRef, chatEndRef }) => {
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
                            messageData={{
                                ...messageData,
                                isLocalMessage: user?.uid == messageData.uid,
                                isTextPersian : isPersian(messageData.plainText),
                                textLetters: messageData.plainText.length > 20 ? 20 : messageData.plainText.length,
                            }}
                        />
                    )) :
                    messages?.map((messageData) => (
                        <Message
                            key={messageData.id}
                            type='CHAT'
                            messageData={{
                                ...messageData,
                                isLocalMessage: user?.uid == messageData.uid,
                                isTextPersian : isPersian(messageData.plainText),
                                textLetters: messageData.plainText.length > 20 ? 20 : messageData.plainText.length,
                            }}
                        />
                    ))
                }
            </AnimatePresence>
            <div ref={chatEndRef} />
        </motion.div>
    );
};

export default memo(ChatMessages);
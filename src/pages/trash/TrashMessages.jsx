import React from 'react';
import Message from '../messenger/message/Message';
import { isPersian } from '../../functions/isPersian';
import { motion, AnimatePresence } from 'framer-motion';

export const TrashMessages = ({ messages }) => {
    return (
        <motion.div className='deleted-messages' layout key='trash-messages'>
            <AnimatePresence>
                {
                    messages?.map((messageData) => (
                        <Message
                            key={messageData?.id}
                            type="TRASH"
                            messageData={{
                                ...messageData,
                                isLocalMessage: true,
                                isTextPersian : isPersian(messageData?.plainText),
                                textLetters: messageData?.plainText?.length > 20 ? 20 : messageData?.plainText?.length,
                            }}
                        />
                    ))
                }
            </AnimatePresence>
        </motion.div>
    );
};

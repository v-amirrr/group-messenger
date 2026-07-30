import React from 'react';
import Message from '../messenger/message/Message';
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
                            messageData={messageData}
                            isLocalMessage={true}
                        />
                    ))
                }
            </AnimatePresence>
        </motion.div>
    );
};

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRedirection } from '../hooks/useRedirection';
import FlipMove from 'react-flip-move';
import Message from './message/Message';
import MessengerInput from './MessengerInput';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MessengerMenu from './MessengerMenu';

const groupChatVariants = {
    hidden: { opacity: 0, scaleX: 0.5 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4, when: "beforeChildren" } },
    exit: { opacity: 0, scaleX: 0.5, transition: { duration: 0.4, when: "afterChildren" } }
};

const GroupChat = () => {

    const messagesContainerRef = useRef();
    const messagesEndRef = useRef();
    const { groupChatRedirection } = useRedirection();

    const { messages, loading } = useSelector(store => store.messagesStore);
    const { enterAsAGuest, user } = useSelector(store => store.userStore);

    useEffect(() => {
        groupChatRedirection();

        const goBottom = setTimeout(() => {
            if (!loading) {
                messagesEndRef?.current?.scrollIntoView({
                    behavior: "smooth", block: "center", inline: "end"
                });
            }
        }, 1200);

        return () => clearTimeout(goBottom);
    }, [messages]);

    return (
        <>
            <MessengerMenu />

            <GroupChatContainer ref={messagesContainerRef} initial='hidden' animate='visible' exit='exit' variants={groupChatVariants}>
                <FlipMove>
                    {messages?.map(message => (
                        <Message 
                            key={message.id} 
                            message={{
                                messageUid: message.uid,
                                localUid: user?.uid,
                                localUsername: user?.displayName,
                                messageUsername: message.username,
                                id: message.id,
                                message: message.message,
                                periorUsername: message.periorUsername, 
                                nextUsername: message.nextUsername,
                                time: message.time,
                                priorDifferentDate: message.priorDifferentDate,
                                nextDifferentDate: message.nextDifferentDate,
                                replyTo: message.replyTo,
                            }}
                        />
                    ))}
                </FlipMove>
                <div ref={messagesEndRef} />
            </GroupChatContainer>

            {enterAsAGuest ? "" : <MessengerInput />}
        </>
    );
};

const GroupChatContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
    position: relative;
    padding: 5rem 2rem 6rem 2rem;
    scroll-behavior: smooth;

    @media (max-width: 800px) {
        padding: 5rem 1.5rem 5rem 1.5rem;
    }

    @media (max-width: 500px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;
    }

    /* width */
    ::-webkit-scrollbar {
        width: .5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background: #ffffff04;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ffffff08;
        border-radius: 50px;
    }
`;

export default GroupChat;
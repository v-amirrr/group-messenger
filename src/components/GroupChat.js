import React, { useEffect, useRef } from 'react';
import Message from './Message';
import MessengerInput from './MessengerInput';
import FlipMove from 'react-flip-move';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const groupChatVariants = {
    hidden: { opacity: 0, scaleX: 0.5 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scaleX: 0.8, transition: { duration: 0.4, type: 'tween' } }
};

const GroupChat = ({ messages, loading }) => {

    const messagesContainerRef = useRef();
    const messagesEndRef = useRef();

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                messagesEndRef?.current?.scrollIntoView({
                    behavior: "smooth", block: "center", inline: "end"
                });
            }, 500);
        }
    }, [messages]);

    return (
        <>
            <GroupChatContainer ref={messagesContainerRef} initial='hidden' animate='visible' exit='exit' variants={groupChatVariants}>
                <FlipMove>
                    {messages?.map((message, index) => (
                        <Message 
                            key={message.id} 
                            message={{
                                username: message.username,
                                id: message.id,
                                message: message.message,
                                periorUsername: index != 0 ? messages[index-1].username : false, 
                                nextUsername: index != messages.length-1 ? messages[index+1].username : false,
                                time: message.time,
                            }}
                        />
                    ))}
                </FlipMove>
                <div ref={messagesEndRef} />
            </GroupChatContainer>

            <MessengerInput />
        </>
    );
};

const GroupChatContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
    position: relative;
    padding: 1rem 2rem 5rem 2rem;
    scroll-behavior: smooth;

    @media (max-width: 800px) {
        padding: 1rem 2rem 5rem 2rem;
    }

    @media (max-width: 500px) {
        width: 100vw;
        padding: 1rem 1rem 5rem 1rem;
    }

    /* width */
    ::-webkit-scrollbar {
        width: .2rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background: #ffffff08;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ffffff0c;
        border-radius: 50px;
    }
`;

export default GroupChat;
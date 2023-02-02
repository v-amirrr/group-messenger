import React, { useState, useEffect, useRef } from 'react';

import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useSelector } from 'react-redux';

import { useGetMessages } from '../hooks/useGetMessages';

import Message from './Message';
import Loader from './Loader';

import FlipMove from 'react-flip-move';

import { IoSend, IoLogoGithub } from 'react-icons/io5';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const messengerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.4, type: 'tween' } }
};

const Messenger = () => {

    const [input, setInput] = useState("");

    const { messages, loading, error } = useSelector(store => store.messagesStore);

    const firebaseRef = collection(db, 'messages');
    const username = localStorage.getItem("username");

    const inputRef = useRef();
    const messagesContainerRef = useRef();
    const messagesEndRef = useRef();

    const sendMessage = e => {
        e.preventDefault();

        addDoc(firebaseRef, {
            message: input,
            username: username,
            time: serverTimestamp(),
        })
        .catch((err) => {
            console.log(err);
        });

        setInput("");
    };

    const { getMessages } = useGetMessages();

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        if (!loading) {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
        }
    }, [messages]);

    return (
        <>
            <MessengerPage>
                <MessengerContainer initial='hidden' animate='visible' exit='exit' variants={messengerVariants}>
                    <MessengerTitle>
                        <h1>Group Messenger</h1>
                        <a href='https://github.com/v-amirrr' target="_blank" rel="noopener noreferror">
                            <i><IoLogoGithub /></i>
                        </a>
                    </MessengerTitle>

                        <AnimatePresence>
                        {loading ?
                            <Loader key="loader" /> :
                                error ?
                                    <motion.p 
                                    className='error-message' 
                                    key="error" 
                                    initial='hidden' animate='visible' exit='exit' variants={messengerVariants}
                                    >
                                    {error}
                                    </motion.p>
                                :
                                <MessagesContainer ref={messagesContainerRef} key="messages">
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
                                </MessagesContainer>}
                        </AnimatePresence>

                    <MessengerInput>
                        <form>
                            <input
                                className='messenger-input'
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Send a Message..."
                                autoFocus
                                ref={inputRef}
                                dir="auto"
                                disabled={!!error}
                            />
                            <motion.button whileTap={input && { scale: 0.5 }} type="submit" className='messenger-submit' disabled={!input} onClick={sendMessage}><IoSend /></motion.button>
                        </form>
                    </MessengerInput>
                </MessengerContainer>
            </MessengerPage>
        </>
    );
};

const MessengerPage = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #00000066;
`;

const MessengerContainer = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 55%;
    height: 95%;
    font-family: 'Outfit', sans-serif;

    .error-message {
        padding: 0 2rem;
        line-height: 1.5;
    }

    @media (max-width: 1400px) {
        width: 70%;
    }

    @media (max-width: 1100px) {
        width: 80%;
    }

    @media (max-width: 800px) {
        width: 90%;
    }
`;

const MessengerTitle = styled.div`
    background-color: #ffffff08;
    backdrop-filter: blur(20px) saturate(120%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 3rem;
    z-index: 2;
    position: absolute;
    top: 1rem;
    display: none;
    
    h1 {
        text-transform: uppercase;
        font-size: .9rem;
        font-weight: 900;
        color: #88888888;
        letter-spacing: 2px;
        word-spacing: 5px;
        white-space: nowrap;
        user-select: none;
    }

    a {
        position: absolute;
        right: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            font-size: 1.5rem;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }   
    }

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const MessagesContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
    position: relative;
    padding: 1rem 2rem 5rem 2rem;
    scroll-behavior: smooth;

    @media (max-width: 800px) {
        padding: 5rem 1rem;
    }

    @media (max-width: 500px) {
        width: 95vw;
        padding: 5rem .5rem;
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

const MessengerInput = styled.div`
    background-color: #ffffff08;
    backdrop-filter: blur(5px) saturate(120%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40%;
    height: 3rem;
    position: absolute;
    bottom: 1rem;

    &:disabled {
        cursor: not-allowed;
    }

    form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    
    .messenger-input {
        color: #fff;
        border: none;
        padding: .8rem;
        background-color: #00000000;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-weight: 200;
        font-size: 1rem;
        width: 100%;
        height: 90%;
        resize: none;

        /* width */
        ::-webkit-scrollbar {
            width: 0;
        }
    }

    .messenger-submit {
        font-size: 1.5rem;
        padding: .5rem .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #00000000;
        color: #ffffff88;
        cursor: pointer;
        transition: color .4s;

        &:disabled {
            cursor: not-allowed;
            color: #ffffff44;
        }

        &:not(:disabled) {
            &:hover {
                color: #ffffff;
            }
        }
    }
`;

export default Messenger;
import React, { useState, useEffect } from 'react';

import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../redux/messages/messagesAction';

import { IoSend } from 'react-icons/io5';

import styled from 'styled-components';

import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import FlipMove from 'react-flip-move';

const messengerTitleVariants = {
    hidden: { opacity: 0, y: -100, scaleX: 0 },
    visible: { opacity: 1, y: 0, scaleX: 1 , transition: { duration: 0.5, type: 'tween' } },
    exit: { opacity: 0, y: -100, scaleX: 0 }
};

const messengerInputVariants = {
    hidden: { opacity: 0, y: 100, scaleX: 0 },
    visible: { opacity: 1, y: 0, scaleX: 1 , transition: { duration: 0.5, type: 'tween' } },
    exit: { opacity: 0, y: 100, scaleX: 0 }
};

const Messenger = () => {

    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const messages = useSelector(state => state.messagesState);

    const ref = collection(db, 'messages');
    const username = localStorage.getItem("username");

    const sendMessage = e => {
        e.preventDefault();

        addDoc(ref, {
            message: input,
            username: username,
            time: serverTimestamp(),
        })
        .catch((err) => {
            console.log(err);
        });

        setInput("");
    };

    useEffect(() => {
        dispatch(getMessages());
    }, []);

    return (
        <>
            <MessengerPage>
                <MessengerContainer>
                    <MessengerTitle initial='hidden' animate='visible' exit='exit' variants={messengerTitleVariants}>
                        <h1>Group Messenger</h1>
                    </MessengerTitle>

                    <Messages>
                        <FlipMove>
                            {
                                messages?.messages?.map(item => (
                                    <Message key={item.id}>
                                        <p className='username'>{item.username}:</p>
                                        <p className='message'>{item.message}</p>
                                    </Message>
                                ))
                            }
                        </FlipMove>
                    </Messages>
                    
                    <MessengerInput initial='hidden' animate='visible' exit='exit' variants={messengerInputVariants}>
                        <form>
                            <input 
                                className='messenger-input' 
                                type="text" 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                placeholder="Write a Message..." 
                                autoFocus
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
    background-color: #000000aa;
`;

const MessengerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 50%;
    height: 95%;
    padding: 1rem 0;
    font-family: 'Outfit', sans-serif;

    @media (max-width: 700px) {
        width: 90%;
    }
`;

const MessengerTitle = styled(motion.div)`
    width: 100%;
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 900;
    letter-spacing: -2px;
    word-spacing: 5px;
    white-space: nowrap;
`;

const MessengerInput = styled(motion.div)`
    background-color: #ffffff10;
    border-radius: 12px;
    padding: .7rem 1rem;
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);
    border: solid 3px #ffffff09;
    display: flex;
    justify-content: center;
    align-items: center;
    
    form {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .messenger-input {
        color: #fff;
        border: none;
        padding: 1rem;
        background-color: #00000000;
        font-family: 'Outfit', sans-serif;
        font-weight: 200;
        font-size: 1rem;
    }

    .messenger-submit {
        font-size: 1.5rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #00000000;
        cursor: pointer;
        transition: background .4s;

        &:disabled {
            color: #ffffffbb;
        }

        &:not(:disabled) {
            &:hover {
                background-color: #ffffff11;
            }
        }
    }
`;

const Messages = styled(motion.div)`
    width: 100%;
    height: 60%;
    overflow: hidden scroll;
    padding: 1rem;

    /* width */
    ::-webkit-scrollbar {
        width: .2rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background: #ffffff11;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ffffff44;
        border-radius: 50px;
    }
`;

const Message = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    background-color: #ffffff11;
    margin: 1rem 0;
    padding: .8rem;
    border-radius: 12px;
    width: fit-content;
    max-width: 100%;

    .username {
        color: #ccc;
        font-size: .8rem;
        margin-right: .5rem;
    }

    .message {
        text-align: left;
        word-spacing: 2px;
    }
`;

export default Messenger;
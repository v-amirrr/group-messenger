import React, { useState, useEffect, useRef } from 'react';

import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../redux/messages/messagesAction';

import Message from './Message';

import { IoSend } from 'react-icons/io5';

import FlipMove from 'react-flip-move';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

    const messages = useSelector(state => state.messagesState.messages);

    const firebaseRef = collection(db, 'messages');
    const username = localStorage.getItem("username");

    const inputRef = useRef();

    const sendMessage = e => {
        e.preventDefault();
        inputRef.current.focus();

        addDoc(firebaseRef, {
            message: input,
            username: username,
            time: serverTimestamp(),
        })
        .catch((err) => {
            console.log(err);
        });

        setInput("");
        inputRef.current.focus();
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

                    <MessagesContainer>
                        <FlipMove>
                            {
                                messages?.map(message => (
                                    <Message key={message.id} {...message} />
                                ))
                            }
                        </FlipMove>
                    </MessagesContainer>
                    
                    <MessengerInput initial='hidden' animate='visible' exit='exit' variants={messengerInputVariants}>
                        <form>
                            <input 
                                className='messenger-input' 
                                type="text" 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                placeholder="Write a Message..." 
                                autoFocus
                                ref={inputRef}
                                dir="auto"
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

const MessengerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 50%;
    height: 95%;
    padding: .5rem 0;
    font-family: 'Outfit', sans-serif;

    @media (max-width: 1100px) {
        width: 70%;
    }

    @media (max-width: 900px) {
        width: 75%;
    }

    @media (max-width: 700px) {
        width: 80%;
    }

    @media (max-width: 500px) {
        width: 90%;
    }
`;

const MessengerTitle = styled(motion.div)`
    width: 100%;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 900;
    letter-spacing: -2px;
    word-spacing: 5px;
    white-space: nowrap;
`;

const MessengerInput = styled(motion.div)`
    background-color: #ffffff08;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    backdrop-filter: blur(50px) saturate(180%);
    -webkit-backdrop-filter: blur(50px) saturate(180%);

    form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .messenger-input {
        color: #fff;
        border: none;
        padding: .8rem;
        background-color: #00000000;
        font-family: 'Outfit', sans-serif;
        font-weight: 200;
        font-size: 1rem;
    }

    .messenger-submit {
        font-size: 1.5rem;
        width: 3rem;
        height: 3rem;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #00000000;
        cursor: pointer;
        transition: background .4s;

        &:disabled {
            color: #ffffff44;
        }

        &:not(:disabled) {
            &:hover {
                background-color: #ffffff11;
            }
        }
    }
`;

const MessagesContainer = styled.div`
    width: 100%;
    height: 70%;
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

export default Messenger;
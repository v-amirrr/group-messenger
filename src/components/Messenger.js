import React, { useState, useEffect, useRef } from 'react';

import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../redux/messages/messagesAction';

import { IoSend } from 'react-icons/io5';

import styled from 'styled-components';

import { motion } from 'framer-motion';
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

    const inputRef = useRef();

    const sendMessage = e => {
        e.preventDefault();
        inputRef.current.focus();

        addDoc(ref, {
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

    const isRTL = (text) => {           
        let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
            rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
            rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');
        return rtlDirCheck.test(text);
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
                                    <Message key={item.id} isUser={item.username == JSON.parse(username)} isPersian={isRTL(item.message)}>
                                        <p className='username' dir="auto">{item.username}</p>
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

const Messages = styled(motion.div)`
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

const Message = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: ${props => props.isUser ? "#ffffff10" : "#ffffff15"};
    margin: .4rem 0;
    margin-left: ${props => props.isUser && "auto"};
    padding: .5rem .8rem; 
    border-radius: 20px;
    width: fit-content;
    max-width: 80%;
    backdrop-filter: blur(50px) saturate(150%);
    -webkit-backdrop-filter: blur(50px) saturate(150%);
    font-weight: 200;
    word-break: break-all;

    .username {
        display: ${props => props.isUser ? "none" : ""};
        color: #aaa;
        font-size: .8rem;
        margin-right: .5rem;
        word-break: break-all;
    }

    .message {
        text-align: ${props => props.isPersian ? "right" : "left"};
        word-spacing: 1px;
        letter-spacing: -.5px;
        word-break: break-all;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    }
`;

export default Messenger;
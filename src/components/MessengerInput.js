import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useSendMessage from '../hooks/useSendMessage';
import { isRTL } from '../functions/isRlt';
import Loader from "./Loader";
import { IoSend, IoAlert } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const sendInputIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4, type: 'tween' } }
};

const MessengerInput = () => {

    const [inputText, setInputText] = useState("");
    const inputRef = useRef();

    const { error, localUsername, sendMessageSituation } = useSelector(store => store.messagesStore);
    const { sendMessage } = useSendMessage();

    const inputSubmitHandler = () => {
        sendMessage(inputText, localUsername);
        setInputText("");
    };

    const inputKeyHandler = e => {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            inputSubmitHandler();
        }
    };

    return (
        <>
            <MessengerInputContainer>
                <textarea
                    className='messenger-input'
                    placeholder="Send a Message..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => inputKeyHandler(e)}
                    disabled={!!error || !localUsername ? true: false}
                    isrlt={isRTL(inputText) ? 1 : 0}
                    ref={inputRef}
                    dir="auto"
                    autoFocus />

                <motion.button whileTap={inputText && { scale: 0.5 }} type="submit" className='messenger-submit' disabled={!inputText} onClick={inputSubmitHandler}>
                    <AnimatePresence exitBeforeEnter>
                        {sendMessageSituation == "pending" ?
                        <div key="pending" className='loader'><Loader usage={2} /></div> : 
                        sendMessageSituation == "error" ?
                        <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="error"><IoAlert /></motion.div> :
                        <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="send"><IoSend /></motion.div>}
                    </AnimatePresence>
                </motion.button>
            </MessengerInputContainer>
        </>
    );
};

const MessengerInputContainer = styled.div`
    background-color: #ffffff08;
    backdrop-filter: blur(5px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40%;
    height: 3rem;
    position: absolute;
    bottom: 1rem;
    overflow: hidden;

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
        font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
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
        width: 3.5rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #00000000;
        color: #ffffff88;
        cursor: pointer;
        transition: color .4s;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }

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

export default MessengerInput;
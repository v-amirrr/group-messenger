import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useSendMessage from '../hooks/useSendMessage';
import { isRTL } from '../functions/isRlt';
import Loader from "./Loader";
import useMessageOptions from '../hooks/useMessageOptions';
import { IoSend, IoAlert, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const sendInputIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } }
};

const replyVariants = {
    hidden: { opacity: 0, scaleX: 0, y: -10 },
    visible: { opacity: 1, scaleX: 1, y: 0, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.3 } }
};

const MessengerInput = () => {

    const [inputText, setInputText] = useState("");

    const inputRef = useRef();

    const { error, localUsername } = useSelector(store => store.messagesStore);
    const { error: sendMessageError, loading: sendMessageLoading, replyTo } = useSelector(store => store.sendMessageStore);

    const { sendMessage } = useSendMessage();
    const { clearReplyMessage } = useMessageOptions();

    const inputSubmitHandler = () => {
        sendMessage(inputText, localUsername);
        setInputText("");
        inputRef.current.focus();
    };

    const inputKeyHandler = e => {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            inputSubmitHandler();
        }
    };

    const focusHandler = e => {
        e.preventDefault();
        if (document.documentElement.offsetWidth > 500) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            <AnimatePresence>
                {replyTo.id ? 
                <ReplyTo className='reply-section' initial='hidden' animate='visible' exit='exit' variants={replyVariants} messageletters={replyTo?.username?.length + replyTo?.message?.length}>
                    <button onClick={clearReplyMessage}><IoClose /></button>
                    <div className='message'>
                        <p className='username'>{replyTo.username}</p>
                        <p className='text'>{replyTo.message}</p>
                    </div>
                </ReplyTo>
                : ""}
            </AnimatePresence>

            <MessengerInputContainer isreplyto={replyTo.id ? 1: 0}>
                <div className='input-section'>
                    <textarea
                        className='messenger-input'
                        placeholder="Send a Message..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => inputKeyHandler(e)}
                        onBlur={e => focusHandler(e)}
                        disabled={!!error || !localUsername ? true: false}
                        isrlt={isRTL(inputText) ? 1 : 0}
                        ref={inputRef}
                        dir="auto"
                        autoFocus />

                    <motion.button whileTap={inputText && { scale: 0.5 }} type="submit" className='messenger-submit' disabled={!inputText} onClick={inputSubmitHandler}>
                        <AnimatePresence exitBeforeEnter>
                            {sendMessageLoading ?
                            <div key="pending" className='loader'><Loader usage={2} /></div> : 
                            sendMessageError ?
                            <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="error"><IoAlert /></motion.div> :
                            <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="send"><IoSend /></motion.div>}
                        </AnimatePresence>
                    </motion.button>
                </div>
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
    flex-direction: column;
    min-width: 40%;
    position: absolute;
    bottom: ${props => props.isreplyto ? "0" : "1rem"};
    transition: bottom .3s;

    &:disabled {
        cursor: not-allowed;
    }
    
    .input-section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .messenger-input {
            color: #fff;
            border: none;
            padding: .8rem;
            background-color: #00000000;
            font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
            font-weight: 200;
            font-size: 1rem;
            width: 100%;
            height: 3rem;
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
    }
`;

const ReplyTo = styled(motion.div)`
    max-width: 25%;
    height: 2rem;
    padding: 0 .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0c0c0f;
    border-radius: 50px;
    position: absolute;
    bottom: 3.5rem;
    overflow: hidden;
    user-select: none;

    button {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        border-radius: 50%;
        cursor: pointer;
        transition: background .2s, padding .2s;
        
        &:hover {
            padding: .2rem;
            background-color: #f5f0f011;
        }
    }

    .message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 .2rem;
        font-weight: 100;
        overflow: hidden;

        .username {
            font-size: .6rem;
            margin-right: .2rem;
        }
    
        .text {
            font-size: .8rem;
            font-weight: 200;
            text-overflow: clip;
            white-space: nowrap;
            
            :after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 20%;
                height: ${props => props.messageletters > 50 ? "100%" : "0"};
                pointer-events: none;
                background-image: linear-gradient(to right, transparent, #000000);
            }
        }
    }

    @media (max-width: 1000px) {
        max-width: 30%;
    }

    @media (max-width: 600px) {
        max-width: 40%;
    }

    @media (max-width: 500px) {
        max-width: 50%;
    }
`;

export default MessengerInput;
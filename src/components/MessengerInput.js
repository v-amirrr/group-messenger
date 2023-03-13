import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSendMessage from '../hooks/useSendMessage';
import useMessageOptions from '../hooks/useMessageOptions';
import { isRTL } from '../functions/isRlt';
import Loader from "./Loader";
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";
import { IoSend, IoAlert, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const messengerInputVariants = {
    hidden: { opacity: 0, scaleX: 0, y: 10 },
    visible: { opacity: 1, scaleX: 1, y: 0, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.3 } }
};

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

const emojiPickerContainerVariatns = {
    hidden: { opacity: 0, scale: 0.5, y: -50, x: 50 },
    visible: { opacity: 1, scale: 1, y: 0, x: 0, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, scale: 0.5, y: -50, x: 50, transition: { duration: 0.2, type: 'tween' } }
};

const MessengerInput = () => {

    const { sendMessage } = useSendMessage();
    const { clearReplyMessage } = useMessageOptions();
    
    const inputRef = useRef();
    
    const [inputText, setInputText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const { error, localUsername } = useSelector(store => store.messagesStore);
    const { error: sendMessageError, loading: sendMessageLoading, replyTo } = useSelector(store => store.sendMessageStore);
    const { popupShow, popupName } = useSelector(store => store.popupStore);

    const inputSubmitHandler = () => {
        setShowEmojiPicker(false);
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

    const focusHandler = () => {
        if (document.documentElement.offsetWidth > 500 && !popupShow && !showEmojiPicker) {
            inputRef.current.focus();
        } else if (popupShow) {
            inputRef.current.blur();
        }
    };

    useEffect(() => {
        focusHandler();
    }, [popupShow, popupName]);

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

            <MessengerInputContainer isreplyto={replyTo.id ? 1: 0} isrlt={isRTL(inputText) ? 1 : 0} inputtext={inputText ? 1 : 0} initial='hidden' animate='visible' exit='exit' variants={messengerInputVariants}>
                <div className='input-section'>
                    <textarea
                        className='messenger-input'
                        placeholder="Send a Message..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => inputKeyHandler(e)}
                        onBlur={focusHandler}
                        disabled={!!error || !localUsername ? true: false}
                        ref={inputRef}
                        dir="auto"
                        autoFocus={document.documentElement.offsetWidth > 500 && !popupShow ? true : false}
                    />

                    <motion.button whileTap={{ scale: 0.5 }} type="submit" className='messenger-emoji-icon' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <GrEmoji />
                    </motion.button>

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

            <EmojiPickerContainer initial='hidden' animate='visible' exit='exit' variants={emojiPickerContainerVariatns} showemojipicker={showEmojiPicker ? 1 : 0} isreplyto={replyTo.id ? 1: 0}>
                <EmojiPicker theme="dark" autoFocusSearch={false} width="18rem" height="25rem" onEmojiClick={(e) => setInputText(`${inputText}${e.emoji}`)} />
            </EmojiPickerContainer>
        </>
    );
};

const MessengerInputContainer = styled(motion.section)`
    background-color: #ffffff08;
    backdrop-filter: blur(5px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 60%;
    position: absolute;
    bottom: ${props => props.isreplyto ? "0" : "1rem"};
    overflow: hidden;
    transition: bottom .3s;

    &:disabled {
        cursor: not-allowed;
    }

    .input-section {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: ${props => props.isrlt ? "0 0 0 1rem" : ""};
        transition: padding .2s;

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
            overflow: ${props => props.inputtext ? "hidden scroll" : ""};
    
            /* width */
            ::-webkit-scrollbar {
                width: .3rem;
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

        .messenger-emoji-icon {
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            color: #ffffff88;
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
    background: linear-gradient(39deg, rgba(0,59,94,1) 0%, rgba(0,26,42,1) 0%, rgba(0,27,43,1) 1%, rgba(0,0,0,1) 50%, rgba(0,22,27,1) 99%, rgba(0,27,33,1) 100%, rgba(0,69,83,1) 100%);
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
                width: 40%;
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

const EmojiPickerContainer = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.isreplyto ? "6rem" : "5rem"};
    width: 18rem;
    height: ${props => props.showemojipicker ? "25rem" : "0"};
    opacity: ${props => props.showemojipicker ? "1" : "0"};
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: height 1.5s cubic-bezier(.53,0,0,.98), bottom .5s;
`;

export default MessengerInput;
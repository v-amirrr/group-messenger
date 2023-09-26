import React, { useState, useRef, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useSendMessage } from '../hooks/useSendMessage';
import { useMessageOptions } from '../hooks/useMessageOptions';
import MessageLoader from './message/MessageLoader';
import Emoji from './Emoji';
import { isRTL } from '../functions/isRlt';
import { IoSend, IoAlert, IoClose } from 'react-icons/io5';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { messengerInputVariants, sendInputIconVariants, replyVariants } from '../config/varitans';

const MessengerInput = ({ scrollDown}) => {

    const { error, localUsername } = useSelector(store => store.messagesStore);
    const { error: sendMessageError, loading: sendMessageLoading, replyTo, restoredText } = useSelector(store => store.sendMessageStore);
    const { popupShow, popupName } = useSelector(store => store.popupStore);

    const { sendMessage } = useSendMessage();
    const { clearReplyMessage } = useMessageOptions();

    const inputRef = useRef();

    const [inputText, setInputText] = useState("");
    const [multiline, setMultiline] = useState(false);
    const [emojiPickerShow, setEmojiPickerShow] = useState(false);

    const inputSubmitHandler = () => {
        scrollDown();
        setEmojiPickerShow(false);
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
        if (document.documentElement.offsetWidth > 500 && !popupShow && !emojiPickerShow) {
            inputRef.current.focus();
        } else if (popupShow) {
            inputRef.current.blur();
        }
    };

    useEffect(() => {
        focusHandler();
    }, [popupShow, popupName]);

    useEffect(() => {
        if (restoredText) {
            setInputText(restoredText);
        }
    }, [sendMessageError]);

    useEffect(() => {
        if (multiline) {
            setMultiline(false);
        }
        inputText.split('').map(item => {
            if (item == '\n') {
                setMultiline(true);
            }
        });
    }, [inputText]);

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {replyTo.id ?
                <ReplyTo className='reply-section' initial='hidden' animate='visible' exit='exit' variants={replyVariants} messageletters={replyTo?.username?.length + replyTo?.message?.length}>
                    <div className='message'>
                        <i><BsReplyFill /></i>
                        <p className='text'>{replyTo.message}</p>
                    </div>
                    <button onClick={clearReplyMessage}><IoClose /></button>
                </ReplyTo>
                : ""}
            </AnimatePresence>

            <MessengerInputContainer multiline={multiline ? 1 : 0} isreplyto={replyTo.id ? 1: 0} isrlt={isRTL(inputText) ? 1 : 0} inputtext={inputText ? 1 : 0} initial='hidden' animate='visible' exit='exit' variants={messengerInputVariants}>
                    <textarea
                        className='messenger-input'
                        placeholder="Send a Message..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => inputKeyHandler(e)}
                        onBlur={focusHandler}
                        disabled={!!error ? true : false}
                        ref={inputRef}
                        dir="auto"
                        autoFocus={document.documentElement.offsetWidth > 500 && !popupShow ? true : false}
                    />

                    <Emoji replyToId={replyTo.id} inputText={inputText} setInputText={setInputText} show={emojiPickerShow} setShow={setEmojiPickerShow} />

                    <motion.button type="submit" className='messenger-submit' disabled={!inputText} onClick={inputSubmitHandler}>
                        <AnimatePresence exitBeforeEnter>
                            {
                                sendMessageLoading ?
                                <div key="pending" className='loader'><MessageLoader size={"1.5rem"} /></div> :
                                sendMessageError ?
                                <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="error"><IoAlert color='red' /></motion.div> :
                                <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="send"><IoSend /></motion.div>
                            }
                        </AnimatePresence>
                    </motion.button>
            </MessengerInputContainer>
        </>
    );
};

const MessengerInputContainer = styled(motion.section)`
    position: absolute;
    bottom: 1rem;
    width: 20rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .2rem;
    border: var(--border-first);
    border-radius: 50px;
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    box-shadow: var(--shadow-second);
    z-index: 5;

    &:disabled {
        cursor: not-allowed;
    }

    .input-section {
        width: 100%;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: ${props => props.isrlt ? "0 0 0 1rem" : ""};
        overflow: hidden;
        transition: padding .2s;
    }

    .messenger-input {
        width: 100%;
        max-height: 2.8rem;
        color: var(--text-color-third);
        border: none;
        border-radius: var(--radius-fifth);
        padding: .8rem;
        background-color: transparent;
        font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-weight: var(--text-boldness-first);
        font-size: 1rem;
        margin-right: .5rem;
        resize: none;
        overflow: ${props => props.inputtext ? "hidden scroll" : ""};

        ::-webkit-scrollbar {
            width: .1rem;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            border-radius: 50px;
            background: #ffffff00;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${props => props.multiline ? "var(--hr-first)" : "#ffffff00"};
            border-radius: 50px;
        }
    }

    .messenger-submit {
        all: unset;
        font-size: 1.5rem;
        width: 3.5rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        color: var(--text-color-first);
        cursor: pointer;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    @media (max-width: 500px) {
        width: 18rem;
        height: 3rem;
        margin-right: 4rem;
    }
`;

const ReplyTo = styled(motion.div)`
    position: absolute;
    bottom: 4.2rem;
    max-width: 25%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 .2rem;
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    border: var(--border-first);
    border-radius: 50px;
    overflow: hidden;
    box-shadow: var(--shadow-second);
    user-select: none;
    z-index: 2;


    button {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        color: #ff0000;
        border-radius: 50%;
        cursor: pointer;
        padding: .2rem;
        margin-left: .5rem;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--button-hover);
            }
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
        font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        color: var(--hr-second);
        font-weight: var(--text-boldness-first);

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            margin-right: .2rem;
        }

        .text {
            font-size: .7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
        margin-right: 4rem;
        bottom: 4.5rem;
    }
`;

export default memo(MessengerInput);
import React, { useState, useRef, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { useSendMessage } from '../hooks/useSendMessage';
import { useMessageOptions } from '../hooks/useMessageOptions';
import MessageLoader from './message/MessageLoader';
import Emoji from './Emoji';
import { isRTL } from '../functions/isRlt';
import { IoSend, IoAlert, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { messengerInputVariants, sendInputIconVariants, replyVariants } from '../config/varitans';

const MessengerInput = () => {

    const { sendMessage } = useSendMessage();
    const { clearReplyMessage } = useMessageOptions();

    const inputRef = useRef();

    const [inputText, setInputText] = useState("");
    const [emojiPickerShow, setEmojiPickerShow] = useState(false);

    const { error, localUsername } = useSelector(store => store.messagesStore);
    const { error: sendMessageError, loading: sendMessageLoading, replyTo, restoredText } = useSelector(store => store.sendMessageStore);
    const { popupShow, popupName } = useSelector(store => store.popupStore);

    const inputSubmitHandler = () => {
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

    return (
        <>
            <AnimatePresence exitBeforeEnter>
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
                        disabled={!!error ? true : false}
                        ref={inputRef}
                        dir="auto"
                        autoFocus={document.documentElement.offsetWidth > 500 && !popupShow ? true : false}
                    />

                    <Emoji replyToId={replyTo.id} inputText={inputText} setInputText={setInputText} show={emojiPickerShow} setShow={setEmojiPickerShow} />

                    <motion.button whileTap={inputText && { scale: 0.5 }} type="submit" className='messenger-submit' disabled={!inputText} onClick={inputSubmitHandler}>
                        <AnimatePresence exitBeforeEnter>
                            {sendMessageLoading ?
                            <div key="pending" className='loader'><MessageLoader size={"1.5rem"} /></div> :
                            sendMessageError ?
                            <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="error"><IoAlert color='red' /></motion.div> :
                            <motion.div initial='hidden' animate='visible' exit='exit' variants={sendInputIconVariants} key="send"><IoSend /></motion.div>}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </MessengerInputContainer>
        </>
    );
};

const MessengerInputContainer = styled(motion.section)`
    background-color: var(--messenger-input);
    backdrop-filter: var(--messenger-input-blur);
    -webkit-backdrop-filter: var(--messenger-input-blur);
    border-radius: var(--messenger-input-border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 60%;
    position: absolute;
    bottom: ${props => props.isreplyto ? ".001rem" : "1rem"};
    transition: bottom .4s;
    z-index: 5;

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
            background-color: transparent;
            font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
            font-weight: 200;
            font-size: 1rem;
            border-radius: 50px;
            width: 100%;
            height: 3rem;
            margin-right: .5rem;
            resize: none;
            overflow: ${props => props.inputtext ? "hidden scroll" : ""};

            &::placeholder {
                color: var(--messenger-input-placeholder);
            }

            ::-webkit-scrollbar {
                width: .3rem;
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
            color: var(--messenger-input-submit-enable);
            cursor: pointer;
            transition: color .4s;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            &:disabled {
                cursor: not-allowed;
                color: var(--messenger-input-submit-disable);
            }
        }
    }
`;

const ReplyTo = styled(motion.div)`
    max-width: 25%;
    height: 2rem;
    padding: 0 .2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--messenger-input-reply);
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);
    border-radius: 50px;
    position: absolute;
    bottom: 3.5rem;
    overflow: hidden;
    user-select: none;
    z-index: 2;

    button {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        border-radius: 50%;
        cursor: pointer;
        padding: .2rem;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #f5f0f011;
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

        .username {
            font-size: .6rem;
            margin-right: .2rem;
        }

        .text {
            font-size: .8rem;
            font-weight: 200;
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
    }
`;

export default memo(MessengerInput);
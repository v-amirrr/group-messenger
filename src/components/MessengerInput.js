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
import {
    messengerInputVariants,
    sendInputIconVariants,
    replyVariants,
} from '../config/varitans';

const MessengerInput = ({ scrollDown }) => {
    const { error, localUsername } = useSelector(
        (store) => store.messagesStore,
    );
    const {
        error: sendMessageError,
        loading: sendMessageLoading,
        replyTo,
        restoredText,
    } = useSelector((store) => store.sendMessageStore);
    const { popupShow, popupName } = useSelector((store) => store.popupStore);

    const { sendMessage } = useSendMessage();
    const { clearReplyMessage } = useMessageOptions();

    const inputRef = useRef();

    const [inputText, setInputText] = useState('');
    const [multiline, setMultiline] = useState(false);
    const [emojiPickerShow, setEmojiPickerShow] = useState(false);

    const inputSubmitHandler = () => {
        if (inputText != '' && !sendMessageLoading) {
            scrollDown();
            setEmojiPickerShow(false);
            sendMessage(inputText, localUsername);
            setInputText('');
            inputRef.current.focus();
        }
    };

    const inputKeyHandler = (e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            inputSubmitHandler();
        }
    };

    const focusHandler = () => {
        if (
            document.documentElement.offsetWidth > 500 &&
            !popupShow &&
            !emojiPickerShow
        ) {
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
        inputText.split('').map((item) => {
            if (item == '\n') {
                setMultiline(true);
            }
        });
    }, [inputText]);

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {replyTo.id ? (
                    <ReplyTo
                        className='reply-section'
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={replyVariants}
                        messageletters={
                            replyTo?.username?.length + replyTo?.message?.length
                        }
                    >
                        <div className='message'>
                            <i>
                                <BsReplyFill />
                            </i>
                            <p className='text'>{replyTo.message}</p>
                        </div>
                        <button onClick={clearReplyMessage}>
                            <IoClose />
                        </button>
                    </ReplyTo>
                ) : (
                    ''
                )}
            </AnimatePresence>

            <MessengerInputContainer
                multiline={multiline ? 1 : 0}
                isreplyto={replyTo.id ? 1 : 0}
                isrlt={isRTL(inputText) ? 1 : 0}
                inputtext={inputText ? 1 : 0}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={messengerInputVariants}
            >
                <textarea
                    className='messenger-input'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => inputKeyHandler(e)}
                    onBlur={focusHandler}
                    disabled={!!error ? true : false}
                    ref={inputRef}
                    dir='auto'
                    autoFocus={
                        document.documentElement.offsetWidth > 500 && !popupShow
                            ? true
                            : false
                    }
                />

                {/* <Emoji
                    replyToId={replyTo.id}
                    inputText={inputText}
                    setInputText={setInputText}
                    show={emojiPickerShow}
                    setShow={setEmojiPickerShow}
                /> */}

                <p className='placeholder'>Send a message...</p>

                <AnimatePresence exitBeforeEnter>
                    {inputText ? (
                        <motion.button
                            className='clear'
                            onClick={() => setInputText('')}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={sendInputIconVariants}
                        >
                            <IoClose />
                        </motion.button>
                    ) : (
                        ''
                    )}
                </AnimatePresence>

                <button
                    type='submit'
                    className='messenger-submit'
                    disabled={!inputText}
                    onClick={inputSubmitHandler}
                >
                    <AnimatePresence exitBeforeEnter>
                        {sendMessageLoading ? (
                            <div key='pending' className='loader'>
                                <MessageLoader size={'1.5rem'} />
                            </div>
                        ) : sendMessageError ? (
                            <motion.div
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={sendInputIconVariants}
                                key='error'
                            >
                                <IoAlert color='red' />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={sendInputIconVariants}
                                key='send'
                            >
                                <IoSend />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
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
    padding: 0.2rem;
    color: var(--normal-color);
    border: solid 1.5px #ffffff14;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    z-index: 2;
    overflow: hidden;

    .input-section {
        width: 100%;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: ${(props) => (props.isrlt ? '0 0 0 1rem' : '')};
        transition: padding 0.2s;
    }

    .messenger-input {
        width: 100%;
        max-height: 2.8rem;
        border: none;
        padding: 0.8rem;
        background-color: #ffffff00;
        font-family: ${(props) => (props.isrlt ? 'Vazirmatn' : 'Outfit')},
            'Vazirmatn', sans-serif;
        font-weight: 200;
        font-size: 1rem;
        margin-right: 0.5rem;
        resize: none;
        overflow: ${(props) => (props.inputtext ? 'hidden scroll' : '')};
        transition: height 0.5s cubic-bezier(0.53, 0, 0, 0.98);

        ::-webkit-scrollbar {
            width: 0.1rem;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            border-radius: 50px;
            background: #ffffff00;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${(props) =>
                props.multiline ? '#ffffff14' : '#ffffff00'};
            border-radius: 50px;
        }
    }

    .placeholder {
        color: #ffffff24;
        font-weight: 200;
        white-space: nowrap;
        font-size: 1rem;
        position: absolute;
        opacity: ${props => props.inputtext ? "0" : "1"};
        left: ${props => props.inputtext ? "-4rem" : "1rem"};
        letter-spacing: ${props => props.inputtext ? "5px" : "0"};
        transition: left .6s, opacity 0.4s, letter-spacing .6s;
    }

    .clear {
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff14;
        cursor: pointer;
    }

    .messenger-submit {
        all: unset;
        font-size: 1.5rem;
        min-width: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        color: #ffffff14;
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

    @media (max-width: 768px) {
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
    padding: 0 0.2rem;
    color: var(--normal-color);
    border: solid 1.5px #ffffff14;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    overflow: hidden;
    z-index: 2;

    button {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        color: var(--red-color);
        border-radius: 50%;
        cursor: pointer;
        padding: 0.1rem;
        margin-left: 0.5rem;
        transition: background 0.2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ffffff10;
            }
        }
    }

    .message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 0.2rem;
        overflow: hidden;
        font-family: ${(props) => (props.isrlt ? 'Vazirmatn' : 'Outfit')},
            'Vazirmatn', sans-serif;
        color: var(--pale-color);
        font-weight: 400;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            margin-right: 0.2rem;
        }

        .text {
            font-size: 0.7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    @media (max-width: 768px) {
        max-width: 50%;
        margin-right: 4rem;
        bottom: 4.5rem;
    }
`;

export default memo(MessengerInput);

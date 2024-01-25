import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSendMessage } from '../hooks/useSendMessage';
import { useMessageOptions } from '../hooks/useMessageOptions';
import EmojiPicker from './EmojiPicker';
import { isRTL } from '../functions/isRlt';
import { IoSend, IoClose } from 'react-icons/io5';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { InputVariants, sendInputIconVariants, replyVariants } from '../config/varitans';

const Input = () => {
    const { error: sendMessageError, replyTo, restoredText } = useSelector(store => store.sendMessageStore);
    const { popupShow, popupName } = useSelector(store => store.popupStore);
    const { sendMessage } = useSendMessage();
    const { clearReplyMessage, applyScrollMessageId } = useMessageOptions();
    const inputRef = useRef();
    const [inputText, setInputText] = useState(localStorage.getItem('input-text') ? localStorage.getItem('input-text') : '');
    const [multiline, setMultiline] = useState(false);

    const inputSubmitHandler = () => {
        if (inputText != '') {
            sendMessage(inputText);
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
            document.documentElement.offsetWidth > 500 && !popupShow
        ) {
            inputRef.current.focus();
        } else if (popupShow) {
            inputRef.current.blur();
        }
    };

    const closeHandler = (e) => {
        e.stopPropagation();
        clearReplyMessage();
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
        localStorage.setItem('input-text', inputText);
    }, [inputText]);

    useEffect(() => {
        inputText && inputRef?.current?.setSelectionRange(inputText.length, inputText.length);
    }, []);

    return (
        <>
            <AnimatePresence>
                {
                    replyTo.id ?
                    <ReplyTo
                        className='reply-section'
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={replyVariants}
                        messageletters={replyTo?.username?.length + replyTo?.message?.length}
                        onClick={() => applyScrollMessageId(replyTo.id, 'CLICK')}
                        onMouseEnter={() => applyScrollMessageId(replyTo.id, 'HOVER')}
                    >
                        <div className='message'>
                            <i><BsReplyFill /></i>
                            <p className='text'>{replyTo.message}</p>
                        </div>
                        <button onClick={(e) => closeHandler(e)}><IoClose /></button>
                    </ReplyTo>
                    : ''
                }
            </AnimatePresence>

            <InputContainer
                multiline={multiline ? 1 : 0}
                isreplyto={replyTo.id ? 1 : 0}
                isrlt={isRTL(inputText) ? 1 : 0}
                inputtext={inputText ? 1 : 0}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={InputVariants}
            >
                <textarea
                    className='messenger-input'
                    value={inputText}
                    dir='auto'
                    ref={inputRef}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => inputKeyHandler(e)}
                    onBlur={focusHandler}
                    autoFocus={document.documentElement.offsetWidth > 500 && !popupShow ? true : false}
                />

                <EmojiPicker setInputText={setInputText} />

                <p className='placeholder'>Send a message...</p>

                <AnimatePresence>
                    {
                        inputText ?
                        <motion.button
                            className='clear'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={sendInputIconVariants}
                            onClick={() => setInputText('')}
                        >
                            <IoClose />
                        </motion.button>
                        : ''
                    }
                </AnimatePresence>

                <button
                    type='submit'
                    className='messenger-submit'
                    disabled={!inputText}
                    onClick={inputSubmitHandler}
                >
                    <div>
                        <IoSend />
                    </div>
                </button>
            </InputContainer>
        </>
    );
};

const InputContainer = styled(motion.section)`
    position: absolute;
    bottom: 1rem;
    width: 20rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--normal-color);
    border: solid 2.5px #ffffff20;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    z-index: 2;
    box-sizing: content-box;

    .messenger-input {
        width: 15.5rem;
        height: 100%;
        border: none;
        padding: .6rem 1rem;
        background-color: #ffffff00;
        font-family: ${(props) => (props.isrlt ? 'Vazirmatn' : 'Outfit')}, 'Vazirmatn', sans-serif;
        font-weight: 200;
        font-size: 1rem;
        resize: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        vertical-align: middle;
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
            background: ${(props) => props.multiline ? '#ffffff20' : '#ffffff00'};
            border-radius: 50px;
        }
    }

    .placeholder {
        color: #ffffff20;
        font-weight: 200;
        white-space: nowrap;
        font-size: 1rem;
        position: absolute;
        opacity: ${props => props.inputtext ? "0" : "1"};
        left: ${props => props.inputtext ? "2rem" : "1rem"};
        letter-spacing: ${props => props.inputtext ? "2px" : "0"};
        transition: left .4s, opacity .4s, letter-spacing .6s;
    }

    .clear {
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff20;
        cursor: pointer;
        position: absolute;
        right: 4.2rem;
        height: 2.6rem;
    }

    .messenger-submit {
        all: unset;
        font-size: 1.5rem;
        width: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        color: #ffffff20;
        cursor: pointer;
        position: absolute;
        right: .2rem;
        height: 2.6rem;

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
        width: 15rem;
        margin-right: 4rem;
        bottom: .9rem;
    }
`;

const ReplyTo = styled(motion.div)`
    position: absolute;
    bottom: 4rem;
    max-width: 25%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.2rem;
    color: var(--normal-color);
    border: solid 2.5px #ffffff20;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    overflow: hidden;
    cursor: pointer;
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
                background-color: var(--normal-bg-hover);
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
        bottom: 4rem;
    }
`;

export default Input;

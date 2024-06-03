import React, { useState, useRef, useEffect } from 'react';
import InputBarReplyTo from './InputBarReplyTo';
import { useSelector } from 'react-redux';
import { useSend } from '../hooks/useSend';
import { useMessageOptions } from '../hooks/useMessageOptions';
import { isPersian } from '../functions/isPersian';
import { GrEmoji } from 'react-icons/gr';
import { IoSend, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarVariants, sendInputIconVariants } from '../config/varitans';
import InputBarEmojiPicker from './InputBarEmojiPicker';

const InputBar = () => {
    const inputRef = useRef();
    const { popupShow, popupName } = useSelector(store => store.popupStore);
    const { inputReply, selectedMessages } = useSelector(store => store.appStore);
    const { sendMessage } = useSend();
    const { clearReplyMessage, applyScrollMessageId } = useMessageOptions();
    const [multiline, setMultiline] = useState(false);
    const [inputText, setInputText] = useState(localStorage.getItem('input-text') ? localStorage.getItem('input-text') : '');
    const [inputBarEmojiPicker, setInputBarEmojiPicker] = useState(false);

    const inputKeyHandler = (e) => {
        if (e.keyCode == 13 && !e.shiftKey && !navigator.userAgentData.mobile) {
            e.preventDefault();
            sendMessage(inputText, setInputText);
        }
    };

    const blurHandler = () => {
        if (document.documentElement.offsetWidth > 500 && !popupShow && !inputBarEmojiPicker) {
            inputRef.current.focus();
        } else if (popupShow) {
            inputRef.current.blur();
        }
    };

    const clearInputReply = (e) => {
        e.stopPropagation();
        clearReplyMessage();
    };

    useEffect(() => {
        blurHandler();
    }, [popupShow, popupName, inputBarEmojiPicker]);

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
        if (selectedMessages.length) {
            setInputBarEmojiPicker(false);
        }
    }, [selectedMessages]);

    return (
        <>
            <InputBarReplyTo
                inputReply={selectedMessages.length ? null : inputReply}
                applyScrollMessageId={applyScrollMessageId}
                clearInputReply={clearInputReply}
                inputBarEmojiPicker={inputBarEmojiPicker}
            />

            <InputBarContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={inputBarVariants}
                multiline={multiline ? 1 : 0}
                isperian={isPersian(inputText) ? 1 : 0}
                inputtext={inputText ? 1 : 0}
                emoji={inputBarEmojiPicker ? 1 : 0}
            >
                <textarea
                    className='input'
                    value={inputText}
                    dir='auto'
                    ref={inputRef}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => inputKeyHandler(e)}
                    onBlur={blurHandler}
                    autoFocus={document.documentElement.offsetWidth > 500 && !popupShow ? true : false}
                />

                <p className='placeholder'>Send a message...</p>

                <AnimatePresence>
                    {
                        inputText ?
                        <>
                            <motion.button
                                className='clear-button'
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={sendInputIconVariants}
                                onClick={() => setInputText('')}
                            >
                                <IoClose />
                            </motion.button>
                            <motion.button
                                className='send-button'
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={sendInputIconVariants}
                                onClick={() => sendMessage(inputText, setInputText)}
                            >
                                <IoSend />
                            </motion.button>
                        </>
                        : ''
                    }
                </AnimatePresence>

                <button className='emoji-button' onClick={() => setInputBarEmojiPicker(!inputBarEmojiPicker)}>
                    <GrEmoji />
                </button>

                <InputBarEmojiPicker
                    setInputText={setInputText}
                    inputBarEmojiPicker={inputBarEmojiPicker}
                    setInputBarEmojiPicker={setInputBarEmojiPicker}
                />
            </InputBarContainer>
        </>
    );
};

const InputBarContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    bottom: 1rem;
    width: 18rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${props => props.emoji ? '12rem' : '0'};
    color: var(--normal-color);
    border: solid 2.5px #ffffff10;
    border-radius: ${props => props.emoji ? '25px' : '50px'};
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    z-index: 3;
    overflow: hidden;
    transition: ${props => props.emoji ?
        'padding .5s cubic-bezier(.53,0,0,.98)' :
        'padding .3s cubic-bezier(.53,0,0,.98), border-radius 2s .2s'
    };

    .input {
        position: absolute;
        left: 0;
        width: 13rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: .6rem 1rem;
        background-color: #ffffff00;
        font-family: ${props => props.ispersian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: 1rem;
        font-weight: 200;
        resize: none;
        vertical-align: middle;
        overflow: ${props => props.inputtext ? 'hidden scroll' : ''};

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
        z-index: -1;
        transition: left .4s, opacity .4s, letter-spacing .6s;
    }

    .clear-button {
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff10;
        cursor: pointer;
        position: absolute;
        right: 4.2rem;
        height: 2.6rem;
    }

    .send-button {
        position: absolute;
        right: .2rem;
        width: 2.5rem;
        height: 2.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 1.4rem;
        color: #ffffff10;
        cursor: pointer;

        &:disabled {
            cursor: not-allowed;
        }
    }

    .emoji-button {
        position: absolute;
        right: ${props => props.inputtext ? '2.2rem' : '.2rem'};
        width: 2.5rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 1.6rem;
        color: #ffffff10;
        cursor: pointer;
        transition: right .25s;
    }

    @media (max-width: 768px) {
        width: 15rem;
        bottom: .9rem;
        padding-bottom: ${props => props.emoji ? '8.5rem' : '0'};
        border-radius: ${props => props.emoji ? '20px' : '50px'};
    }
`;

export default InputBar;
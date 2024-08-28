import React, { useState, useRef, useEffect } from 'react';
import ChatInputReplyIndicator from './ChatInputReplyIndicator';
import ChatInputEmojiPicker from './ChatInputEmojiPicker';
import { useSelector } from 'react-redux';
import { useSend } from '../../../hooks/useSend';
import { isPersian } from '../../../functions/isPersian';
import { GrEmoji } from 'react-icons/gr';
import { IoSend, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { chatInputVariants, inputButtonVariants } from '../../../config/varitans';

const ChatInput = () => {
    const inputRef = useRef();
    const { inputReply, editReply } = useSelector(store => store.appStore);
    const { modalShow } = useSelector(store => store.modalStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { optionsAnimationStatus } = useSelector(store => store.optionsStore);
    const { sendMessage } = useSend();
    const [multiline, setMultiline] = useState(false);
    const [inputText, setInputText] = useState(localStorage.getItem('input-text') ? localStorage.getItem('input-text') : '');
    const [emojiPicker, setEmojiPicker] = useState(false);

    const inputKeyHandler = (e) => {
        if (e.keyCode == 13 && !e.shiftKey && !navigator.userAgentData.mobile) {
            e.preventDefault();
            sendMessage(inputText.trim(), setInputText);
        }
    };

    const blurHandler = () => {
        if (!navigator.userAgentData.mobile && !modalShow && !emojiPicker && !optionsAnimationStatus) {
            inputRef.current.focus();
        } else if (modalShow || optionsAnimationStatus) {
            inputRef.current.blur();
        }
    };

    const sendClickHandler = () => {
        sendMessage(inputText.trim(), setInputText);
        if (navigator.userAgentData.mobile) {
            inputRef.current.focus();
        }
    };

    const openEmojiPicker = () => {
        setEmojiPicker(!emojiPicker);
        if (navigator.userAgentData.mobile && document.activeElement === inputRef.current) {
            inputRef.current.focus();
        }
    };

    const clearInput = () => {
        setInputText('');
        if (navigator.userAgentData.mobile && document.activeElement === inputRef.current) {
            inputRef.current.focus();
        }
    };

    // unfocusing input in times of: opnening a modal, opening emoji picker and opening options
    useEffect(() => {
        blurHandler();
    }, [modalShow, emojiPicker, optionsAnimationStatus]);

    // storing input text in local storage, detecting whehter text has multiple lines
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

    // closing emoji picker when user is selecting
    useEffect(() => {
        if (selectedMessages.length) {
            setEmojiPicker(false);
        }
    }, [selectedMessages]);

    return (
        <>
            <ChatInputReplyIndicator inputReply={selectedMessages.length || editReply?.show ? null : inputReply} emojiPicker={emojiPicker} />

            <ChatInputContainer
                initial='hidden' animate='visible' exit='exit' variants={chatInputVariants}
                stylesData={{
                    multiline: multiline ? 1 : 0,
                    isPerian: isPersian(inputText) ? 1 : 0,
                    inputText: inputText ? 1 : 0,
                    emoji: emojiPicker ? 1 : 0,
                }}
            >
                <textarea
                    className='input'
                    dir='auto'
                    value={inputText}
                    ref={inputRef}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => inputKeyHandler(e)}
                    onBlur={blurHandler}
                    autoFocus={document.documentElement.offsetWidth > 500 && !modalShow ? true : false}
                />

                <p className='placeholder'>Send a message...</p>

                <AnimatePresence>
                    {
                        inputText ?
                        <>
                            <motion.button
                                initial='hidden' animate='visible' exit='exit' variants={inputButtonVariants}
                                className='clear-button'
                                onClick={clearInput}
                            >
                                <IoClose />
                            </motion.button>
                            <motion.button
                                initial='hidden' animate='visible' exit='exit' variants={inputButtonVariants}
                                className='send-button'
                                onClick={sendClickHandler}
                            >
                                <IoSend />
                            </motion.button>
                        </> : ''
                    }
                </AnimatePresence>

                <button className='emoji-button' onClick={openEmojiPicker}><GrEmoji /></button>

                <ChatInputEmojiPicker setInputText={setInputText} emojiPicker={emojiPicker} />
            </ChatInputContainer>
        </>
    );
};

const ChatInputContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    bottom: 1rem;
    width: 18rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${props => props.stylesData.emoji ? '10rem' : '0'};
    border: var(--border);
    border-radius: ${props => props.stylesData.emoji ? '25px' : '50px'};
    box-shadow: rgba(0, 0, 0, 1) 0px 4px 12px;
    backdrop-filter: var(--glass);
    z-index: 4;
    overflow: hidden;
    transition: ${props =>
        props.stylesData.emoji ?
        'padding .3s cubic-bezier(.53,0,0,.98)' :
        'padding .3s cubic-bezier(.53,0,0,.98), border-radius 2s .2s'
    };

    .input {
        position: absolute;
        left: 0;
        width: 12.7rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: .6rem 0 .6rem 1rem;
        background-color: #ffffff00;
        font-family: ${props => props.stylesData.isPersian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: 1rem;
        font-weight: 300;
        resize: none;
        vertical-align: middle;
        overflow: ${props => props.stylesData.inputText ? 'hidden scroll' : ''};

        ::-webkit-scrollbar {
            width: 0.1rem;
        }

        ::-webkit-scrollbar-track {
            border-radius: 50px;
            background-color: #ffffff00;
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${props => props.stylesData.multiline ? '#ffffff10' : '#ffffff00'};
            border-radius: 50px;
        }
    }

    .placeholder {
        color: var(--grey);
        font-weight: 300;
        white-space: nowrap;
        font-size: 1rem;
        position: absolute;
        opacity: ${props => props.stylesData.inputText ? "0" : "1"};
        left: ${props => props.stylesData.inputText ? "2rem" : "1rem"};
        letter-spacing: ${props => props.stylesData.inputText ? "1px" : "0"};
        z-index: -1;
        transition: left .3s, opacity .3s, letter-spacing .5s;
    }

    .clear-button {
        color: #ffffff10;
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        right: 3.65rem;
        height: 2.6rem;
    }

    .send-button {
        color: #ffffff10;
        position: absolute;
        right: 0;
        width: 2.5rem;
        height: 2.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 1.4rem;
        cursor: pointer;

        &:disabled {
            cursor: not-allowed;
        }
    }

    .emoji-button {
        position: absolute;
        right: ${props => props.stylesData.inputText ? '1.8rem' : '0'};
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
        width: 17rem;
        bottom: .9rem;
        padding-bottom: ${props => props.stylesData.emoji ? '10rem' : '0'};
        border-radius: ${props => props.stylesData.emoji ? '20px' : '50px'};
    }
`;

export default ChatInput;
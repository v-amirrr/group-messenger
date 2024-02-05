import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSendMessage } from '../hooks/useSendMessage';
import { isRTL } from '../functions/isRlt';
import { GrEmoji } from 'react-icons/gr';
import { IoSend, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarVariants, sendInputIconVariants } from '../config/varitans';

const InputBar = ({ inputText, setInputText, inputBarEmojiPicker, setInputBarEmojiPicker }) => {
    const { error: sendMessageError, replyTo, restoredText } = useSelector(store => store.sendMessageStore);
    const { popupShow, popupName } = useSelector(store => store.popupStore);
    const { sendMessage } = useSendMessage();
    const inputRef = useRef();
    const [multiline, setMultiline] = useState(false);

    const inputSubmitHandler = () => {
        if (inputText != '') {
            setInputBarEmojiPicker(false);
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

    const blurHandler = () => {
        if (document.documentElement.offsetWidth > 500 && !popupShow && !inputBarEmojiPicker) {
            inputRef.current.focus();
        } else if (popupShow) {
            inputRef.current.blur();
        }
    };

    useEffect(() => {
        blurHandler();
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
            <InputBarContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={inputBarVariants}
                multiline={multiline ? 1 : 0}
                isreplyto={replyTo.id ? 1 : 0}
                isrlt={isRTL(inputText) ? 1 : 0}
                inputtext={inputText ? 1 : 0}
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
                        : ''
                    }
                </AnimatePresence>

                <button
                    className='send-button'
                    disabled={!inputText}
                    onClick={inputSubmitHandler}
                >
                    <IoSend />
                </button>

                <button className='emoji-button' onClick={() => setInputBarEmojiPicker(!inputBarEmojiPicker)}>
                    <GrEmoji />
                </button>
            </InputBarContainer>
        </>
    );
};

const InputBarContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    z-index: 2;

    .input {
        position: absolute;
        left: 0;
        width: 13rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: .6rem 1rem;
        background-color: #ffffff00;
        font-family: ${props => props.isrlt ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-weight: 200;
        font-size: 1rem;
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
        color: #ffffff20;
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
        font-size: 1.5rem;
        color: #ffffff20;
        cursor: pointer;

        &:disabled {
            cursor: not-allowed;
        }
    }

    .emoji-button {
        position: absolute;
        right: 2.2rem;
        width: 2.5rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        font-size: 1.6rem;
        color: #ffffff20;
        cursor: pointer;
    }
`;

export default InputBar;

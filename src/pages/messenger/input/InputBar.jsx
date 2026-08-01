import React, { useState, useRef, useEffect, useCallback } from 'react';
import InputBarReplyIndicator from './InputBarReplyIndicator';
import InputBarEmojiPicker from './InputBarEmojiPicker';
import { useSelector } from 'react-redux';
import { useSend } from '../../../hooks/useSend';
import { isPersian } from '../../../functions/isPersian';
import { GrEmoji } from 'react-icons/gr';
import { IoSend, IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { chatInputVariants, inputButtonVariants } from '../../../config/variants';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });
const onMobile = navigator.userAgentData.mobile;

const InputBar = () => {
    const inputRef = useRef();
    const optionsAnimationStatus = useSelector(store => store.optionsStore.optionsAnimationStatus);
    const [inputText, setInputText] = useState(() => localStorage.getItem('input-text') || '');
    const [emojiPickerShow, setEmojiPickerShow] = useState(false);
    const { sendMessage } = useSend();

    const submit = () => {
        sendMessage(inputText.trim(), setInputText);
    };
    
    const inputKeyHandler = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !onMobile) {
            e.preventDefault();
            submit();
        }
    };

    const blurHandler = (e) => {
        if (!onMobile && !emojiPickerShow && !optionsAnimationStatus) {
            inputRef.current.focus();
        } else if (optionsAnimationStatus) {
            inputRef.current.blur();
        }
    };

    const sendHandler = () => {
        submit();
        if (onMobile) inputRef.current.focus()
    };

    const openEmojiPicker = () => {
        setEmojiPickerShow(previous => !previous);
        if (onMobile && document.activeElement === inputRef.current) {
            inputRef.current.focus();
        }
    };

    const clearHandler = () => {
        setInputText('');
        if (onMobile && document.activeElement === inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        blurHandler();
    }, [emojiPickerShow, optionsAnimationStatus]);

    useEffect(() => {
        localStorage.setItem('input-text', inputText);
    }, [inputText]);

    return (
        <>
            <InputBarReplyIndicator emojiPickerShow={emojiPickerShow} />

            <InputBarContainer
                {...framerMotionAttributes(chatInputVariants)}
                isPerian={isPersian(inputText) ? 1 : 0}
                inputText={inputText.length>0 ? 1 : 0}
                emojiPickerShow={emojiPickerShow ? 1 : 0}
            >
                <textarea
                    dir='auto'
                    value={inputText}
                    ref={inputRef}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={inputKeyHandler}
                    onBlur={blurHandler}
                    autoFocus={document.documentElement.offsetWidth > 500 ? true : false}
                />

                <p className='placeholder'>Send a message...</p>

                <AnimatePresence>
                    {
                        inputText ?
                        <motion.button className='send-button' {...framerMotionAttributes(inputButtonVariants)} onClick={sendHandler}>
                            <IoSend />
                        </motion.button>
                        : null
                    }
                </AnimatePresence>

                <button className='emoji-button' onClick={openEmojiPicker}><GrEmoji /></button>

                <InputBarEmojiPicker setInputText={setInputText} emojiPickerShow={emojiPickerShow} />
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
    padding-bottom: ${props => props.emojiPickerShow ? '10rem' : '0'};
    border: var(--border);
    border-radius: ${props => props.emojiPickerShow ? '25px' : '50px'};
    box-shadow: #000000cc 0px 0px 10px;
    backdrop-filter: var(--glass);
    z-index: 4;
    overflow: hidden;
    transition: ${props =>
        props.emojiPickerShow ?
        'padding .6s cubic-bezier(.53,0,0,.98)' :
        'padding .4s cubic-bezier(.53,0,0,.98), border-radius 2s .2s'
    };

    textarea {
        position: absolute;
        left: 0;
        width: 14rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: .6rem 0 .6rem 1rem;
        background-color: #ffffff00;
        font-family: ${props => props.isPersian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
        font-size: 1rem;
        font-weight: 300;
        resize: none;
        vertical-align: middle;
        overflow: ${props => props.inputText ? 'hidden scroll' : ''};

        ::-webkit-scrollbar {
            width: 0;
        }
    }

    .placeholder {
        color: var(--grey);
        font-weight: 300;
        white-space: nowrap;
        font-size: 1rem;
        position: absolute;
        opacity: ${props => props.inputText ? "0" : "1"};
        left: ${props => props.inputText ? "2rem" : "1rem"};
        letter-spacing: ${props => props.inputText ? "1px" : "0"};
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
        right: ${props => props.inputText ? '1.8rem' : '0'};
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
        padding-bottom: ${props => props.emojiPickerShow ? '10rem' : '0'};
        border-radius: ${props => props.emojiPickerShow ? '20px' : '50px'};
    }
`;

export default InputBar;
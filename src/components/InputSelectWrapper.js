import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../hooks/useMessageOptions';
import SelectBar from './SelectBar';
import InputBar from './InputBar';
import InputBarReplyTo from './InputBarReplyTo';
import InputBarEmojiPicker from './InputBarEmojiPicker';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputSelectContainerVariants } from '../config/varitans';

const InputSelectWrapper = () => {
    const { selectedMessages } = useSelector(store => store.appStore);
    const { replyTo } = useSelector(store => store.sendMessageStore);
    const { clearReplyMessage, applyScrollMessageId } = useMessageOptions();
    const [inputText, setInputText] = useState(localStorage.getItem('input-text') ? localStorage.getItem('input-text') : '');
    const [inputBarEmojiPicker, setInputBarEmojiPicker] = useState(false);

    const closeHandler = (e) => {
        e.stopPropagation();
        clearReplyMessage();
    };

    useEffect(() => {
        if (selectedMessages.length) {
            setInputBarEmojiPicker(false);
        }
    }, [selectedMessages]);

    return (
        <>
            <InputBarReplyTo
                replyTo={replyTo}
                applyScrollMessageId={applyScrollMessageId}
                closeHandler={closeHandler}
            />

            <InputSelectWrapperContainer initial='hidden' animate='visible' exit='exit' variants={inputSelectContainerVariants} emoji={inputBarEmojiPicker ? 1 : 0}>
                <InputBarEmojiPicker
                    setInputText={setInputText}
                    inputBarEmojiPicker={inputBarEmojiPicker}
                    setInputBarEmojiPicker={setInputBarEmojiPicker}
                />

                <AnimatePresence>
                    {
                        selectedMessages.length ?
                        <SelectBar key='select-bar' /> :
                        <InputBar
                            key='input-bar'
                            inputText={inputText}
                            setInputText={setInputText}
                            inputBarEmojiPicker={inputBarEmojiPicker}
                            setInputBarEmojiPicker={setInputBarEmojiPicker}
                        />
                    }
                </AnimatePresence>
            </InputSelectWrapperContainer>
        </>
    );
};

const InputSelectWrapperContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    bottom: 1rem;
    width: 18rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${props => props.emoji ? '18.8rem' : '0'};
    color: var(--normal-color);
    border: solid 2.5px #ffffff20;
    border-radius: ${props => props.emoji ? '25px' : '50px'};
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    z-index: 3;
    overflow: hidden;
    transition: ${props => props.emoji ?
        'padding .6s cubic-bezier(.53,0,0,.98)' :
        'padding .4s cubic-bezier(.53,0,0,.98), border-radius 2s .2s'
    };

    @media (max-width: 768px) {
        width: 15rem;
        margin-right: 4rem;
        bottom: .9rem;
        padding-bottom: ${props => props.emoji ? '13.3rem' : '0'};
        border-radius: ${props => props.emoji ? '20px' : '50px'};
    }
`;

export default InputSelectWrapper;
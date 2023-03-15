import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmojiPickerShow } from '../redux/userSlice';
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const emojiPickerContainerVariatns = {
    hidden: { height: 0 },
    visible: { height: "25rem", transition: { duration: 1.5, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { height: 0, transition: { duration: 1, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } }
};

const Emoji = ({ replyToId, inputText, setInputText }) => {

    const dispatch = useDispatch();

    const { emojiPickerShow } = useSelector(store => store.userStore);

    return (
        <>
            <EmojiPickerIcon onClick={() => dispatch(setEmojiPickerShow(!emojiPickerShow))} whileTap={{ scale: 0.8 }}>
                <GrEmoji />
            </EmojiPickerIcon>

            <AnimatePresence>
                {emojiPickerShow ?
                <EmojiPickerContainer initial='hidden' animate='visible' exit='exit' variants={emojiPickerContainerVariatns} isreplyto={replyToId ? 1: 0}>
                    <EmojiPicker theme="dark" autoFocusSearch={false} width="18rem" height="25rem" onEmojiClick={(e) => setInputText(`${inputText}${e.emoji}`)} />
                </EmojiPickerContainer>
                : ""}
            </AnimatePresence>
        </>
    );
};

const EmojiPickerIcon = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
`;

const EmojiPickerContainer = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.isreplyto ? "6rem" : "3.5rem"};
    width: 18rem;
    height: 25rem;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: bottom .5s;
`;

export default Emoji;
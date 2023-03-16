import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const emojiPickerContainerVariatns = {
    hidden: { height: 0 },
    visible: { height: "22rem", transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { height: 0, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } }
};

const Emoji = ({ replyToId, inputText, setInputText, show, setShow, place }) => {
    return (
        <>
            <EmojiPickerIcon onClick={() => setShow(!show)} whileTap={{ scale: 0.8 }} editpopup={place == "EDIT_POPUP" ? 1 : 0}>
                <GrEmoji />
            </EmojiPickerIcon>

            <AnimatePresence>
                {show ?
                <EmojiPickerContainer initial='hidden' animate='visible' exit='exit' variants={emojiPickerContainerVariatns} isreplyto={replyToId ? 1: 0} editpopup={place == "EDIT_POPUP" ? 1 : 0}>
                    <EmojiPicker theme="dark" autoFocusSearch={false} width="18rem" height="22rem" onEmojiClick={(e) => setInputText(`${inputText}${e.emoji}`)} />
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
    width: ${props => props.editpopup ? "2.2rem" : ""};
    height: ${props => props.editpopup ? "2.2rem" : ""};
    background-color: ${props => props.editpopup ? "#000" : ""};
    border-radius: 50%;
    `;

const EmojiPickerContainer = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.isreplyto ? props.editpopup ? "6rem" : "6rem" : "3.5rem"};
    width: 18rem;
    height: 22rem;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: bottom .6s;
`;

export default Emoji;
import React from 'react';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { emojiPickerVariatns } from '../../../config/varitans';

const ChatInputEmojiPicker = ({ setInputText, emojiPicker }) => {
    const emojiHandler = (e) => {
        setInputText(pre => `${pre}${e.native}`);
    };
    return (
        <>
            <ChatInputEmojiPickerContainer inputbaremojipicker={emojiPicker ? 1 : 0}>
                <div className='picker'>
                    <Picker
                        set="apple"
                        data={data}
                        emojiSize={30}
                        showPreview={false}
                        showSkinTones={false}
                        onEmojiSelect={(e) => emojiHandler(e)}
                        previewPosition='none'
                    />
                </div>
            </ChatInputEmojiPickerContainer>
        </>
    );
};

const ChatInputEmojiPickerContainer = styled.div`
    position: absolute;
    top: 2.6rem;
    z-index: 3;
    height: 9.2rem;
    overflow: hidden;
    border-radius: 15px;

    .picker {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;
    }

    @media (max-width: 745px) {
        transform: scale(0.79);
        top: 1.2rem;
        height: 11.8rem;
    }
`;

export default ChatInputEmojiPicker;

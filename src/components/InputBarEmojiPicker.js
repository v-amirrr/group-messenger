import React from 'react';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarEmojiPickerVariatns } from '../config/varitans';

const InputBarEmojiPicker = ({ setInputText, inputBarEmojiPicker, setInputBarEmojiPicker }) => {

    const emojiHandler = (e) => {
        setInputText(pre => `${pre}${e.native}`);
    };

    return (
        <>
            <InputBarEmojiPickerContainer inputbaremojipicker={inputBarEmojiPicker ? 1 : 0}>
                <AnimatePresence>
                    {
                        inputBarEmojiPicker ?
                        <motion.div className='picker' initial='hidden' animate='visible' exit='exit' variants={inputBarEmojiPickerVariatns}>
                            <Picker
                                set="apple"
                                data={data}
                                emojiSize={30}
                                showPreview={false}
                                showSkinTones={false}
                                onEmojiSelect={(e) => emojiHandler(e)}
                                previewPosition='none'
                            />
                        </motion.div>
                        : ''
                    }
                </AnimatePresence>
            </InputBarEmojiPickerContainer>
        </>
    );
};

const InputBarEmojiPickerContainer = styled.div`
    position: absolute;
    top: 2.6rem;
    z-index: 3;
    height: 18rem;
    overflow: hidden;
    border-radius: 15px;

    .picker {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;
    }

    @media (max-width: 745px) {
        transform: scale(0.7);
        top: 0;
    }
`;

export default InputBarEmojiPicker;

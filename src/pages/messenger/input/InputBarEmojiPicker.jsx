import React, { memo } from 'react';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarEmojiPicker } from '../../../config/variants';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const InputBarEmojiPicker = memo(({ setInputText, emojiPickerShow }) => {
    const emojiHandler = (e) => setInputText(previous => `${previous}${e.native}`);
    return (
        <AnimatePresence>
            {
                emojiPickerShow ?
                <InputBarEmojiPickerContainer {...framerMotionAttributes(inputBarEmojiPicker)}>
                    <div className='emoji-picker'>
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
                </InputBarEmojiPickerContainer> : null
            }
        </AnimatePresence>
    );
});

const InputBarEmojiPickerContainer = styled(motion.div)`
    position: absolute;
    top: 2.6rem;
    z-index: 3;
    height: 9.2rem;
    overflow: hidden;
    border-radius: 15px;

    .emoji-picker {
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

export default InputBarEmojiPicker;

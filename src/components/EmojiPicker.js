import React, { useState } from 'react';
import data from '@emoji-mart/data/sets/14/twitter.json';
import Picker from '@emoji-mart/react';
import { GrEmoji } from 'react-icons/gr';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { emojiPickerVariatns } from '../config/varitans';

const EmojiPicker = ({ setInputText }) => {
    const [open, setOpen] = useState(false);

    const emojiHandler = (e) => {
        setInputText((pre) => `${pre}${e.native}`);
    };

    return (
        <>
            <EmojiPickerContainer>
                <button onClick={() => setOpen(!open)}><GrEmoji /></button>
                <AnimatePresence>
                    {
                        open ?
                        <motion.div className='picker' initial='hidden' animate='visible' exit='exit' variants={emojiPickerVariatns}>
                            <Picker
                                set="apple"
                                data={data}
                                theme="dark"
                                emojiSize={32}
                                showPreview={false}
                                showSkinTones={false}
                                style={{
                                    borderRadius: "20px",
                                    zIndex: -4,
                                    width: '18rem',
                                    height: '18rem',
                                    backgroundColor: "#ffffff10"
                                }}
                                onEmojiSelect={(e) => emojiHandler(e)}
                            />
                        </motion.div>
                        : ''
                    }
                </AnimatePresence>
            </EmojiPickerContainer>
        </>
    );
};

const EmojiPickerContainer = styled.div`
    button {
        width: 2.5rem;
        height: 2.4rem;
        border: none;
        color: #ffffff20;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 2.2rem;
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .picker {
        position: absolute;
        bottom: 150%;
        left: 0;
        width: 20rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;
    }
`;

export default EmojiPicker;

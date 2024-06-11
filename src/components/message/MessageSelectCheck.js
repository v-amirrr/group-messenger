import React from 'react';
import styled from 'styled-components';
import { FcCheckmark } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCheckLocalVariants, selectCheckNonLocalVariants, checkButtonVariants } from '../../config/varitans';

const MessageSelectCheck = ({ selected, selectedMessagesLength, messageClickHandler, localMessage }) => {
    return (
        <>
            <AnimatePresence>
                {
                    selectedMessagesLength ?
                    <MessageSelectCheckContainer
                        className='select-section'
                        key='select-section'
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={localMessage ? selectCheckLocalVariants : selectCheckNonLocalVariants}
                        onClick={messageClickHandler}
                        selected={selected ? 1 : 0}
                    >
                        <AnimatePresence>
                            {
                                selected ?
                                <motion.i
                                    key='selected'
                                    initial='hidden'
                                    animate='visible'
                                    exit='exit'
                                    variants={checkButtonVariants}
                                >
                                    <FcCheckmark />
                                </motion.i>
                                : ''
                            }
                        </AnimatePresence>
                    </MessageSelectCheckContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const MessageSelectCheckContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.8rem;
    height: 1.8rem;
    border: ${props => props.selected ? 'solid 2.5px #ffffff00' : 'solid 2.5px #ffffff10'};
    border-radius: 50%;
    background: ${props => props.selected ? '#151515' : '#ffffff00'};
    overflow: hidden;
    box-shadow: var(--normal-shadow);
    cursor: pointer;
    transition: background .2s, border .2s;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${props => props.trash ? '1rem' : '1.1rem'};
    }
`;

export default MessageSelectCheck;

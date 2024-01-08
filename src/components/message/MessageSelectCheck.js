import React from 'react';
import styled from 'styled-components';
import { FcCheckmark } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCheckLocalVariants, selectCheckNonLocalVariants, checkButtonVariants } from '../../config/varitans';

const MessageSelectCheck = ({ selected, selectedMessagesLength, messageClickHandler, type, isMessageFromLocalUser }) => {
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {
                    selectedMessagesLength || type == 'TRASH' ?
                    <MessageSelectCheckContainer
                        className='select-section'
                        key='select-section'
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={isMessageFromLocalUser ? selectCheckLocalVariants : selectCheckNonLocalVariants}
                        onClick={messageClickHandler}
                        trash={type == 'TRASH' ? 1 : 0}
                        selected={selected ? 1 : 0}
                        localuser={isMessageFromLocalUser ? 1 : 0}
                    >
                        <AnimatePresence exitBeforeEnter>
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
    background-color: ${props => props.selected ? "var(--normal-bg-hover)" : "var(--normal-bg)"};
    width: ${props => props.trash ? '1.4rem' : '1.8rem'};
    height: ${props => props.trash ? '1.4rem' : '1.8rem'};
    border-radius: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: background .4s;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${props => props.trash ? '1rem' : '1.2rem'};
    }
`;

export default MessageSelectCheck;

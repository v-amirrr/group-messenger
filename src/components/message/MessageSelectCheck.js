import React from 'react';
import styled from 'styled-components';
import { FcCheckmark } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCheckLocalVariants, selectCheckNonLocalVariants, checkButtonVariants } from '../../config/varitans';

const MessageSelectCheck = ({ selected, selectedMessagesLength, messageClickHandler, type, localMessage }) => {
    return (
        <>
            <AnimatePresence>
                {
                    selectedMessagesLength || type == 'TRASH' ?
                    <MessageSelectCheckContainer
                        className='select-section'
                        key='select-section'
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={localMessage ? selectCheckLocalVariants : selectCheckNonLocalVariants}
                        onClick={messageClickHandler}
                        trash={type == 'TRASH' ? 1 : 0}
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
    width: ${props => props.trash ? '1.6rem' : '1.8rem'};
    height: ${props => props.trash ? '1.6rem' : '1.8rem'};
    border: ${props => props.selected ? 'solid 2.5px #ffffff00' : 'solid 2.5px #ffffff20'};
    border-radius: 50%;
    background: ${props => props.selected ? 'var(--normal-bg)' : '#ffffff00'};
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

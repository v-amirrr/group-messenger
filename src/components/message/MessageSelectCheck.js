import React from 'react';
import styled from 'styled-components';
import { FcCheckmark } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import {
    selectCheckVariants,
    checkButtonVariants,
} from '../../config/varitans';

const MessageSelectCheck = ({
    selected,
    selectedMessagesLength,
    messageClickHandler,
    type,
}) => {
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
                        variants={selectCheckVariants}
                        trash={type == 'TRASH' ? 1 : 0}
                        selected={selected ? 1 : 0}
                        onClick={messageClickHandler}
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
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    position: absolute;
    right: ${(props) => (props.trash ? '80%' : '0')};
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
        font-size: 1.2rem;
        transition: transform 0.2s;
    }
`;

export default MessageSelectCheck;

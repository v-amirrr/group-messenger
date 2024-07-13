import React from 'react';
import Check from '../common/Check';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCheckLocalVariants, selectCheckNonLocalVariants } from '../../config/varitans';

const MessageSelectCheck = ({ selected, messageClickHandler, isLocalMessage }) => {
    return (
        <>
            <MessageSelectCheckContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={isLocalMessage ? selectCheckLocalVariants : selectCheckNonLocalVariants}
                onClick={messageClickHandler}
                selected={selected ? 1 : 0}
            >
                <AnimatePresence>
                    {selected ? <Check scale={1.2} /> : ''}
                </AnimatePresence>
            </MessageSelectCheckContainer>
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
    background: ${props => props.selected ? 'var(--bg)' : '#ffffff00'};
    overflow: hidden;
    box-shadow: var(--shadow);
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

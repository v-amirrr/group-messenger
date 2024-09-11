import React from 'react';
import Check from '../../../common/Check';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCheckVariants } from '../../../config/varitans';

const MessageSelectCheckbox = ({ selected, messageClickHandler }) => {
    return (
        <>
            <MessageSelectCheckboxContainer
                initial='hidden' animate='visible' exit='exit' variants={selectCheckVariants}
                onClick={messageClickHandler}
                selected={selected ? 1 : 0}
            >
                <AnimatePresence>
                    {selected ? <Check scale={1.2} /> : ''}
                </AnimatePresence>
            </MessageSelectCheckboxContainer>
        </>
    );
};

const MessageSelectCheckboxContainer = styled(motion.div)`
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
    z-index: 1;
    transition: background .2s, border .2s;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${props => props.trash ? '1rem' : '1.1rem'};
    }
`;

export default MessageSelectCheckbox;
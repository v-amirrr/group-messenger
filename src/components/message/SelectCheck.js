import React from 'react';
import styled from 'styled-components';
import { TbCheck } from "react-icons/tb";
import { motion, AnimatePresence } from 'framer-motion';

const selectCheckVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'tween', delay: 0.4 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2, type: 'tween' } }
};

const SelectCheck = ({ selected, selectedMessagesLength }) => {
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {selectedMessagesLength ? 
                <SelectCheckContainer className='select-section' key="select-section" initial='hidden' animate='visible' exit='exit' variants={selectCheckVariants} selected={selected ? 1 : 0} selectedmessageslength={selectedMessagesLength ? 1 : 0}>
                    <i><TbCheck /></i>
                </SelectCheckContainer>
                : ""}
            </AnimatePresence>
        </>
    );
};

const SelectCheckContainer = styled(motion.div)`
    background-color: ${props => props.selected ? "var(--message-selected)" : "var(--message)"};
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        margin-top: .1rem;
        transform: ${props => props.selected ? "scale(1)" : "scale(0)"};
        transition: transform .2s;
    }
`;

export default SelectCheck;
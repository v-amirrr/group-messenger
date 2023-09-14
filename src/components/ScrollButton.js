import React from 'react';
import { FaArrowDown } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { scrollButtonVariants } from '../config/varitans';

const ScrollButton = ({ click, scroll }) => {
    return (
        <>
            <ScrollButtonContainer onClick={click} scroll={scroll ? 1 : 0} initial='hidden' animate='visible' exit='exit' variants={scrollButtonVariants}>
                <i>
                    <FaArrowDown />
                </i>
            </ScrollButtonContainer>
        </>
    );
};

const ScrollButtonContainer = styled(motion.button)`
    position: absolute;
    bottom: 1.2rem;
    right: 2.4rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #ffffff18;
    border-radius: 50%;
    box-shadow: var(--shadow-second);
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    z-index: 3;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        transform: ${props => !props.scroll ? "rotateX(180deg)" : "rotateX(0deg)"};
        transition: transform .5s;
    }

    @media (max-width: 700px) {
        top: 1.2rem;
        left: 0;
    }
`;

export default ScrollButton;
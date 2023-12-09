import React from 'react';
import { FaArrowDown } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { scrollButtonVariants } from '../config/varitans';

const ScrollButton = ({ click, scroll }) => {
    return (
        <>
            <ScrollButtonContainer onClick={click} scrollup={scroll ? 1 : 0} initial='hidden' animate='visible' exit='exit' variants={scrollButtonVariants}>
                <i><FaArrowDown /></i>
            </ScrollButtonContainer>
        </>
    );
};

const ScrollButtonContainer = styled(motion.button)`
    box-sizing: content-box;
    position: absolute;
    bottom: 1.1rem;
    right: 8.2rem;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2.5px #ffffff20;
    border-radius: 50%;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    color: var(--normal-color);
    cursor: pointer;
    overflow: hidden;
    z-index: 2;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        transform: ${props => !props.scrollup ? "rotateX(180deg)" : "rotateX(0deg)"};
        transition: transform .5s;
    }

    @media (max-width: 768px) {
        right: 0;
        bottom: 1rem;
    }
`;

export default ScrollButton;
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
    position: absolute;
    bottom: 1.2rem;
    right: 2.4rem;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1.5px #ffffff14;
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

    @media (max-width: 700px) {
        right: .3rem;
    }
`;

export default ScrollButton;
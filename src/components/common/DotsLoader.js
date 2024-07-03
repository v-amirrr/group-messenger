import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { dotsLoaderVariants } from '../../config/varitans';

const DotsLoader = ({ scale }) => {
    return (
        <>
            <DotsLoaderContainer data={{ scale: scale }} initial='hidden' animate='visible' exit='exit' variants={dotsLoaderVariants}>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </DotsLoaderContainer>
        </>
    );
};

const DotsLoaderContainer = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${props => `scale(${props.data.scale})`} !important;

    .dot {
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        background-color: var(--text);

        &:nth-child(1) {
            animation: dots-animation .5s infinite alternate;
            animation-delay: 0s;
        }

        &:nth-child(2) {
            animation: dots-animation .5s infinite alternate;
            animation-delay: .25s;
        }

        &:nth-child(3) {
            animation: dots-animation .5s infinite alternate;
            animation-delay: .5s;
        }
    }

    @keyframes dots-animation {
        0% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(0.8);
        }
    }
`;

export default DotsLoader;
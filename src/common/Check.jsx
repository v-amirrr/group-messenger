import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { checkVariants } from '../config/varitans';

const Check = ({ scale }) => {
    return (
        <>
            <CheckContainer data={{ scale: scale }} initial='hidden' animate='visible' exit='exit' variants={checkVariants}>
                <span className='checkmark'></span>
                <span className='checkmark'></span>
            </CheckContainer>
        </>
    );
};

const CheckContainer = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${props => `scale(${props.data.scale})`} !important;

    .checkmark {
        background-color: var(--blue);
        border-radius: 50px;
        position: absolute;
        right: .1rem;

        &:nth-child(1) {
            margin: .16rem .55rem 0 0;
            transform: rotate(45deg);
            animation: checkmark-one .2s forwards;
        }

        &:nth-child(2) {
            margin: .4rem .85rem 0 0;
            transform: rotate(-40deg);
            animation: checkmark-two .15s .1s forwards;
        }
    }

    @keyframes checkmark-one {
        0% {
            width: 0;
            height: 0;
        }
        100% {
            width: .12rem;
            height: .7rem;
        }
    }

    @keyframes checkmark-two {
        0% {
            width: 0;
            height: 0;
        }
        100% {
            width: .12rem;
            height: .35rem;
        }
    }
`;

export default Check;
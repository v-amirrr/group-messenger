import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const messageLoaderVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4, type: 'tween' } }
};

const MessageLoader = ({ size }) => {
    return (
        <>
            <MessageLoaderContainer initial='hidden' animate='visible' exit='exit' variants={messageLoaderVariants} size={size}>
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </MessageLoaderContainer>
        </>
    );
};

const MessageLoaderContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .spinner {
        width: ${props => props.size};
        height: ${props => props.size};
        -webkit-animation: rotator 1.4s linear infinite;
        animation: rotator 1.4s linear infinite;
    }

    @-webkit-keyframes rotator {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(270deg);
        }
    }

    @keyframes rotator {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(270deg);
        }
    }

    .path {
        stroke-dasharray: 187;
        stroke-dashoffset: 0;
        transform-origin: center;
        -webkit-animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
        animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
    }

    @-webkit-keyframes colors {
        0% {
            stroke: #4285F4;
        }
        25% {
            stroke: #DE3E35;
        }
        50% {
            stroke: #F7C223;
        }
        75% {
            stroke: #1B9A59;
        }
        100% {
            stroke: #4285F4;
        }
    }

    @keyframes colors {
        0% {
            stroke: #4285F4;
        }
        25% {
            stroke: #DE3E35;
        }
        50% {
            stroke: #F7C223;
        }
        75% {
            stroke: #1B9A59;
        }
        100% {
            stroke: #4285F4;
        }
    }

    @-webkit-keyframes dash {
        0% {
            stroke-dashoffset: 187;
        }
        50% {
            stroke-dashoffset: 46.75;
            transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            transform: rotate(450deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 187;
        }
        50% {
            stroke-dashoffset: 46.75;
            transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 187;
            transform: rotate(450deg);
        }
    }
`;

export default memo(MessageLoader);
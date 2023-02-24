import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const loaderVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const Loader = ({ usage }) => {
    return (
        <>
            <LoaderContainer initial='hidden' animate='visible' exit='exit' variants={loaderVariants} usage={usage}>
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </LoaderContainer>
        </>
    );
};

const LoaderContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: ${props => props.usage == 1 ? "absolute" : ""};
    width: ${props => props.usage == 3 ? "20%" : "50%"};
    height: ${props => props.usage == 3 ? "" : "100%"};

    .spinner {
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

export default Loader;
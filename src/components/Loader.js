import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const loaderVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

const Loader = () => {
    return (
        <>
            <LoaderContainer initial='hidden' animate='visible' exit='exit' variants={loaderVariants}>
                <div className="gooey">
                    <span className="dot"></span>
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </LoaderContainer>
        </>
    );
};

const LoaderContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: absolute;

    .gooey {
        background-color: var(--messenger-loader);
        border-radius: 50px;
        filter: contrast(20);
        width: 142px;
        height: 40px;
    }

    .gooey .dot {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 12px;
        left: 15px;
        filter: blur(4px);
        background: var(--messenger-loader-dots);
        border-radius: 50%;
        transform: translateX(0);
        animation: dot 3s infinite;
    }

    .gooey .dots {
        transform: translateX(0);
        margin-top: 12px;
        margin-left: 31px;
        animation: dots 3s infinite;
    }

    .gooey .dots span {
        display: block;
        float: left;
        width: 16px;
        height: 16px;
        margin-left: 16px;
        filter: blur(4px);
        background: var(--messenger-loader-dots);
        border-radius: 50%;
    }

    @-moz-keyframes dot {
        50% {
            transform: translateX(96px);
        }
    }

    @-webkit-keyframes dot {
        50% {
            transform: translateX(96px);
        }
    }
    @-o-keyframes dot {
        50% {
            transform: translateX(96px);
        }
    }

    @keyframes dot {
        50% {
            transform: translateX(96px);
        }
    }

    @-moz-keyframes dots {
        50% {
            transform: translateX(-31px);
        }
    }

    @-webkit-keyframes dots {
        50% {
            transform: translateX(-31px);
        }
    }

    @-o-keyframes dots {
        50% {
            transform: translateX(-31px);
        }
    }

    @keyframes dots {
        50% {
            transform: translateX(-31px);
        }
    }
`;

export default memo(Loader);
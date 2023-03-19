import React, { memo } from 'react';
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
                <div class="gooey">
                    <span class="dot"></span>
                    <div class="dots">
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
    position: ${props => props.usage == 1 ? "absolute" : ""};
    width: ${props => props.usage == 3 ? "20%" : "50%"};
    height: ${props => props.usage == 3 ? "" : "100%"};

    .gooey {
        background-color: #000000;
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
        background: #fff;
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
        background: #fff;
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
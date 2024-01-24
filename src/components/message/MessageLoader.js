import React, { memo } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { messageLoaderVariants } from '../../config/varitans';

const MessageLoader = ({ status }) => {
    return (
        <>
            <MessageLoaderContainer>
                <AnimatePresence exitBeforeEnter>
                {
                    status == 1 ?
                        <motion.div key='loader' initial='hidden' animate='visible' exit='exit' variants={messageLoaderVariants}>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </motion.div> :
                    status == 2 ?
                        <motion.div key='checkmark' initial='hidden' animate='visible' exit='exit' variants={messageLoaderVariants}>
                            <span className='checkmark'></span>
                            <span className='checkmark'></span>
                        </motion.div>
                    : ''
                }
                </AnimatePresence>
            </MessageLoaderContainer>
        </>
    );
};

const MessageLoaderContainer = styled.div`
    margin: 0 .2rem;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .dot {
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            background-color: #fff;

            &:nth-child(1) {
                animation: loader .6s infinite alternate;
                animation-delay: 0s;
            }

            &:nth-child(2) {
                animation: loader .6s infinite alternate;
                animation-delay: .25s;
            }

            &:nth-child(3) {
                animation: loader .6s infinite alternate;
                animation-delay: .5s;
            }
        }

        .checkmark {
            background-color: #00b7ff;
            border-radius: 50px;
            position: absolute;
            right: 0;

            &:nth-child(1) {
                margin: .16rem .55rem 0 0;
                transform: rotate(45deg);
                animation: checkmark-one .2s forwards;
            }

            &:nth-child(2) {
                margin: .4rem .85rem 0 0;
                transform: rotate(-40deg);
                animation: checkmark-two .2s .2s forwards;
            }
        }
    }

    @keyframes loader {
        0% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(0.7);
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

export default memo(MessageLoader);

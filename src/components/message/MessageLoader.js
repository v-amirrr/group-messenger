import React, { memo } from 'react';
import Check from '../common/Check';
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
                        <Check scale={1.2} />
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
    }

    @keyframes loader {
        0% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(0.7);
        }
    }
`;

export default memo(MessageLoader);

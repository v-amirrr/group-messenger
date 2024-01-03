import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { messageLoaderVariants } from '../../config/varitans';

const MessageLoader = ({ time }) => {

    const [status, setStatus] = useState(time == undefined ? 1 : 0);

    useEffect(() => {
        if (status == 1) {
            setTimeout(() => {
                setStatus(2);
                setTimeout(() => {
                    setStatus(0);
                }, 2000);
            }, 1000);
        }
    }, [time]);

    return (
        <>
            <MessageLoaderContainer>
                <AnimatePresence exitBeforeEnter>
                {
                    status == 1 ?
                        <motion.p key='loader' initial='hidden' animate='visible' exit='exit' variants={messageLoaderVariants}>
                            sending
                            <span className='dot'>.</span>
                            <span className='dot'>.</span>
                            <span className='dot'>.</span>
                        </motion.p> :
                    status == 2 ?
                        <motion.p key='sent' initial='hidden' animate='visible' exit='exit' variants={messageLoaderVariants}>
                            sent successfully
                            <div className='tick'>
                                <span className='first-line-tick'></span>
                                <span className='second-line-tick'></span>
                            </div>
                        </motion.p>
                    : ''
                }
                </AnimatePresence>
            </MessageLoaderContainer>
        </>
    );
};

const MessageLoaderContainer = styled.div`
    margin: 0 .2rem;

    p {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .6rem;
        font-weight: 200;
        color: #666;

        .dot {
            font-size: 1rem;
            margin-bottom: .3rem;
            letter-spacing: -2px;

            &:nth-child(1) {
                animation: dot-flashing .5s infinite alternate;
                animation-delay: 0s;
            }

            &:nth-child(2) {
                animation: dot-flashing .5s infinite alternate;
                animation-delay: .25s;
            }

            &:nth-child(3) {
                animation: dot-flashing .5s infinite alternate;
                animation-delay: .5s;
            }
        }

        .tick {
            width: 1rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .first-line-tick {
                position: absolute;
                left: 0;
                background-color: #666;
                border-radius: 50px;
                width: .6rem;
                height: .5px;
                transform: rotate(-55deg);
                margin: 0 0 0 .12rem;
            }

            .second-line-tick {
                position: absolute;
                left: 0;
                background-color: #666;
                border-radius: 50px;
                width: .3rem;
                height: .5px;
                transform: rotate(60deg);
                margin: .24rem 0 0 .05rem;
            }
        }
    }

    @keyframes dot-flashing {
        0% {
            color: #666;
        }
        100% {
            color: #ffffff11;
        }
    }
`;

export default memo(MessageLoader);

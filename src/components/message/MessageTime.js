import React, { memo } from 'react';
import MessageLoader from './MessageLoader';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { timeVariants } from '../../config/varitans';

const MessageTime = ({ time, messagePosition, isUser }) => {

    const { hour, minute } = time;

    return (
        <>
            <TimeContainer messageposition={messagePosition} isuser={isUser}>
                <AnimatePresence exitBeforeEnter>
                    {hour != null && minute != null ?
                        <motion.div key="time" initial='hidden' animate='visible' exit='exit' variants={timeVariants}>
                            <span>{hour < 10 ? `0${hour}` : hour}</span>
                            :
                            <span>{minute < 10 ? `0${minute}` : minute}</span>
                        </motion.div> :
                    <MessageLoader key="message-loader" size={"1rem"} />}
                </AnimatePresence>
            </TimeContainer>
        </>
    );
};

const TimeContainer = styled(motion.div)`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 2rem;
    font-size: .5rem;
    font-weight: 600;
    letter-spacing: .5px;
    color: var(--message-time);
    white-space: nowrap;
    margin: ${props =>
        props.isuser ?
            props.messageposition == 0 ?
            "0 .4rem .5rem 0" :
            props.messageposition == 1 ?
            "0 .1rem .3rem 0" :
            props.messageposition == 2 ?
            "0 .1rem .3rem 0" :
            props.messageposition == 3 &&
            "0 .1rem .5rem 0" :
        "0 .4rem .3rem 0"
    };
    transform: margin .4s;

    @media (max-width: 768px) {
        font-size: .45rem;
    }
`;

export default memo(MessageTime);
import React, { memo } from 'react';
import MessageLoader from './MessageLoader';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { timeVariants } from '../../config/varitans';

const MessageTime = ({ time, messagePosition, isMessageFromLocalUser }) => {

    const { hour, minute } = time;

    return (
        <>
            <TimeContainer messageposition={messagePosition} isuser={isMessageFromLocalUser ? 1 : 0}>
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
    top: ${props => props.isuser && props.messageposition == 3 ? "0" : "auto"};
    width: 2rem;
    font-size: .45rem;
    font-weight: var(--text-boldness-third);
    letter-spacing: .5px;
    color: var(--text-color-second);
    white-space: nowrap;
    margin: ${props =>
        props.isuser ?
            props.messageposition == 0 ?
            "0 .2rem .4rem 0" :
            props.messageposition == 1 ?
            "0 0 .4rem 0" :
            props.messageposition == 2 ?
            "0 0 .4rem 0" :
            props.messageposition == 3 &&
            ".4rem 0 0 0" :
        "0 .4rem .3rem 0"
    };
    transition: margin .4s, top .4s;

    @media (max-width: 768px) {
        font-size: .4rem;
    }
`;

export default memo(MessageTime);
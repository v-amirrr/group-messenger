import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const timeVariants = {
    hidden: { opacity: 0, x: 20, y: 20, scale: 0 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.4, type: 'tween' } }
};

const MessageTime = ({ hour, minute, messagePosition }) => {
    return (
        <>
            {hour != null && minute != null ?
            <TimeContainer initial='hidden' animate='visible' exit='exit' variants={timeVariants} messageposition={messagePosition}>
                {hour < 10 ? `0${hour}` : hour}:{minute < 10 ? `0${minute}` : minute}
            </TimeContainer> : ""}
        </>
    );
};

const TimeContainer = styled(motion.div)`
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: .5rem;
    font-weight: 500;
    letter-spacing: .5px;
    color: #ffffff55;
    white-space: nowrap;
    margin: ${props => 
        props.isuser ? 
            props.messagePosition == 0 ? 
            ".6rem .5rem" : 
            props.messagePosition == 1 ? 
            ".3rem .5rem" : 
            props.messagePosition == 2 ? 
            ".3rem .5rem" : 
            props.messagePosition == 3 && 
            ".6rem .5rem" :
        ".3rem .8rem"
    };
    transform: margin .4s;
`;

export default MessageTime;
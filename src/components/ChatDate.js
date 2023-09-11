import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { chatDateVariants } from '../config/varitans';

const ChatDate = ({ dateObj, priorDifferentDate }) => {
    return (
        <>
            {priorDifferentDate && dateObj.year && dateObj.month && dateObj.day ?
                <ChatDateContainer initial='hidden' animate='visible' exit='exit' variants={chatDateVariants}>
                    <p className='year'>{dateObj.year}</p>
                    <p className='month'>{dateObj.month}</p>
                    <p className='day'>{dateObj.day}</p>
                </ChatDateContainer>
            : ""}
        </>
    );
};

const ChatDateContainer = styled(motion.div)`
    margin-bottom: 1rem;
    padding: .3rem .5rem;
    background-color: var(--message);
    color: var(--text-color-third);
    border-radius: 50px;
    font-size: .45rem;
    font-weight: var(--text-boldness-second);
    width: fit-content;
    margin: .3rem auto;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-first);
    position: absolute;
    top: 0;
    left: 45%;

    .month {
        margin: 0 .18rem 0 .18rem;
    }

    @media (max-width: 500px) {
        margin: .5rem auto;
        left: 40%;
    }
`;

export default memo(ChatDate);
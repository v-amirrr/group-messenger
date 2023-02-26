import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const chatDateVariants = {
    hidden: { opacity: 0, scaleX: 0.8 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scaleX: 0.8, transition: { duration: 0.4 } }
};

const ChatDate = ({ dateObj }) => {
    return (
        <>
            {dateObj.year != null && dateObj.month != null && dateObj.day != null ?
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
    padding: .3rem .5rem;
    background-color: #ffffff0a;
    color: #f0f0f5;
    border-radius: 50px;
    font-size: .5rem;
    font-weight: 400;
    width: fit-content;
    margin: .5rem auto;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .month {
        letter-spacing: .8px;
        margin: 0 .2rem 0 .25rem;
    }

    @media (max-width: 500px) {
        font-size: .4rem;
        padding: .2rem .3rem;

        .month {
            letter-spacing: 0;
            margin: 0 .2rem 0 .25rem;
        }
    }
`;

export default ChatDate;
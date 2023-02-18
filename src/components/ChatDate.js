import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const chatDateVariants = {
    hidden: { opacity: 0, scaleX: 0.5 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scaleX: 0.5, transition: { duration: 0.4, type: 'tween' } }
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
    padding: .35rem .5rem;
    background-color: #ffffff10;
    border-radius: 50px;
    font-size: .5rem;
    width: fit-content;
    margin: .8rem auto;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .month {
        letter-spacing: .5px;
        margin: 0 .15rem 0 .2rem;
    }

    @media (max-width: 500px) {
        font-size: .4rem;
        padding: .3rem .3rem;
    }
`;

export default ChatDate;
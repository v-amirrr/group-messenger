import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const chatDateVariants = {
    hidden: { opacity: 0, scaleX: 0.8 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scaleX: 0.8, transition: { duration: 0.4 } }
};

const ChatDate = ({ dateObj, priorDifferentDate }) => {
    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {priorDifferentDate ? 
                    dateObj.year != null && dateObj.month != null && dateObj.day != null ?
                    <ChatDateContainer key="chat-date" initial='hidden' animate='visible' exit='exit' variants={chatDateVariants}>
                        <p className='year'>{dateObj.year}</p>
                        <p className='month'>{dateObj.month}</p>
                        <p className='day'>{dateObj.day}</p>
                    </ChatDateContainer>
                    : ""
                : ""}
            </AnimatePresence>
        </>
    );
};

const ChatDateContainer = styled(motion.div)`
    padding: .3rem .5rem;
    background-color: #ffffff0a;
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    color: #f0f0f5;
    border-radius: 50px;
    font-size: .5rem;
    font-weight: 400;
    width: fit-content;
    margin: .3rem auto;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;

    .month {
        letter-spacing: .8px;
        margin: 0 .2rem 0 .25rem;
    }

    @media (max-width: 500px) {
        font-weight: 700;
        font-size: .4rem;
        padding: .2rem .3rem;

        .month {
            letter-spacing: 0;
            margin: 0 .15rem 0 .2rem;
        }
    }
`;

export default ChatDate;
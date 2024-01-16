import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { chatDateVariants } from '../config/varitans';

const ChatDate = ({ dateObj, priorDifferentDate }) => {
    return (
        <>
            {
                priorDifferentDate && dateObj.year && dateObj.month && dateObj.day ?
                <ChatDateContainer initial='hidden' animate='visible' exit='exit' variants={chatDateVariants}>
                    <div className='date'>
                        <p className='year'>{dateObj.year}</p>
                        <p className='month'>{dateObj.month}</p>
                        <p className='day'>{dateObj.day}</p>
                    </div>
                </ChatDateContainer>
                : ''
            }
        </>
    );
};

const ChatDateContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .3rem auto;

    .date {
        padding: .3rem .4rem;
        margin-bottom: 1rem;
        background-color: #ffffff10;
        color: var(--normal-color);
        border-radius: 50px;
        font-size: .45rem;
        font-weight: 400;
        width: fit-content;
        box-shadow: var(--normal-shadow);
        display: flex;
        justify-content: center;
        align-items: center;

        .month {
            margin: 0 .18rem 0 .18rem;
        }
    }
`;

export default memo(ChatDate);
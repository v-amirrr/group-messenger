import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { chatDateVariants } from '../../config/varitans';

const MessageDate = ({ show, date }) => {
    return (
        <>
            {
                show ?
                <MessageDateContainer
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    variants={chatDateVariants}
                >
                    <div className='date'>
                        <p className='year'>
                            {date.year}
                        </p>
                        <p className='month'>
                            {date.month}
                        </p>
                        <p className='day'>
                            {date.day}
                        </p>
                    </div>
                </MessageDateContainer>
                : ''
            }
        </>
    );
};

const MessageDateContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.3rem auto;

    .date {
        padding: 0.3rem 0.4rem;
        margin-bottom: 1rem;
        background-color: #ffffff10;
        color: var(--normal-color);
        border-radius: 50px;
        font-size: 0.45rem;
        font-weight: 400;
        width: fit-content;
        box-shadow: var(--normal-shadow);
        display: flex;
        justify-content: center;
        align-items: center;

        .month {
            margin: 0 0.18rem 0 0.18rem;
        }
    }
`;

export default MessageDate;

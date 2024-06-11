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
    margin: .3rem auto;

    .date {
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .3rem .4rem;
        margin-bottom: 1rem;
        background-color: #151515;
        color: var(--normal-color);
        border-radius: 50px;
        font-size: 0.5rem;
        font-weight: 400;
        letter-spacing: -.5px;
        box-shadow: var(--normal-shadow);

        .month {
            margin: 0 0.2rem 0 0.2rem;
            letter-spacing: 0;
        }
    }
`;

export default MessageDate;

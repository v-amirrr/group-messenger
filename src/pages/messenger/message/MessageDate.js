import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { chatDateVariants } from '../../../config/varitans';

const MessageDate = ({ data }) => {
    return (
        <>
            <MessageDateContainer initial='hidden' animate='visible' exit='exit' variants={chatDateVariants}>
                <div className='date'>
                    <p className='year'>{data?.year}</p>
                    <p className='month'>{data?.month}</p>
                    <p className='day'>{data?.day}</p>
                    <p className='time'>{data?.hour}:{data?.minute} {data?.format}</p>
                </div>
            </MessageDateContainer>
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
    z-index: -1;

    .date {
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .3rem .4rem;
        margin-bottom: 1rem;
        color: var(--grey);
        font-size: .52rem;
        font-weight: 200;

        .month {
            margin: 0 .15rem 0 .15rem;
            letter-spacing: 0;
        }

        .time {
            margin-left: .3rem;
        }
    }
`;

export default MessageDate;
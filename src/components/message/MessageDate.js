import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { chatDateVariants } from '../../config/varitans';

const MessageDate = ({ show, data }) => {
    return (
        <>
            {
                show ?
                <MessageDateContainer initial='hidden' animate='visible' exit='exit' variants={chatDateVariants}>
                    <div className='date'>
                        <p className='year'>{data?.year}</p>
                        <p className='month'>{data?.month}</p>
                        <p className='day'>{data?.day}</p>
                        <p className='time'>{data?.hour} : {data?.minute} {data?.format}</p>
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
        color: #666;
        border-radius: 50px;
        font-size: .55rem;
        font-weight: 500;
        letter-spacing: -.5px;
        box-shadow: var(--normal-shadow);

        .month {
            margin: 0 .15rem 0 .15rem;
            letter-spacing: 0;
        }

        .time {
            margin-left: .4rem;
        }

        .am-pm {
            margin-left: .15rem;
        }
    }
`;

export default MessageDate;
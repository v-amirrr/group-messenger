import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { chatDateVariants } from '../config/varitans';

const ChatDate = ({ dateObj, priorDifferentDate, blur }) => {
    return (
        <>
            {priorDifferentDate && dateObj.year && dateObj.month && dateObj.day ?
                <ChatDateContainer initial='hidden' animate='visible' exit='exit' variants={chatDateVariants} blur={blur}>
                    <div className='date'>
                        <p className='year'>{dateObj.year}</p>
                        <p className='month'>{dateObj.month}</p>
                        <p className='day'>{dateObj.day}</p>
                    </div>
                </ChatDateContainer>
            : ""}
        </>
    );
};

const ChatDateContainer = styled(motion.div)`
    filter: ${props => props.blur ? "blur(5px)" : "blur(0px)"};
    margin: .3rem auto;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    transition: filter .4s;

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
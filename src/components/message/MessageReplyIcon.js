import React from 'react';
import { useOptions } from '../../hooks/useOptions';
import { BsReplyFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { replyIconVariants } from '../../config/varitans';

const MessageReplyIcon = () => {
    const { addNewReplyId } = useOptions();
    return (
        <>
            <MessageReplyIconContainer initial='hidden' animate='visible' exit='exit' variants={replyIconVariants} onClick={() => addNewReplyId(null)}>
                <i className='reply'><BsReplyFill /></i>
                <i className='close'><IoClose /></i>
            </MessageReplyIconContainer>
        </>
    );
};

const MessageReplyIconContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    background-color: var(--bg);
    box-shadow: var(--shadow);
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
    margin: 0 .5rem;
    transition: background .2s;

    .reply {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(1);
        transition: transform .2s;
    }

    .close {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0);
        transition: transform .2s;
        font-size: 1.6rem;
    }

    &:hover {
        background-color: var(--red);

        .reply {
            transform: scale(0);
        }

        .close {
            transform: scale(1);
        }
    }

    @media (max-width: 768px) {
        &:active {
            background-color: var(--red);

            .reply {
                transform: scale(0);
            }

            .close {
                transform: scale(1);
            }
        }
    }
`;

export default MessageReplyIcon;

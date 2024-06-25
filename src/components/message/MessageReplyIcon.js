import React from 'react';
import { useOptions } from '../../hooks/useOptions';
import { BsReplyFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { replyIconVariants } from '../../config/varitans';

const MessageReplyIcon = ({ editReply, editReplyClick, show }) => {
    const { clearReplyMessage } = useOptions();

    const closeHandler = () => {
        if (editReply) {
            editReplyClick();
        } else {
            clearReplyMessage();
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    show ?
                    <MessageReplyIconContainer
                        key='reply-icon'
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={replyIconVariants}
                    >
                        <i className='reply'>
                            <BsReplyFill />
                        </i>
                        <i className='close' onClick={closeHandler}>
                            <IoClose />
                        </i>
                    </MessageReplyIconContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const MessageReplyIconContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    background-color: #151515;
    box-shadow: var(--shadow);
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
    margin: 0 .5rem;
    transition: background .5s;

    .reply {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(1);
        transition: transform .3s;
    }

    .close {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0);
        transition: transform .3s;
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

import React from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { BsReplyFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { replyIconLocalVariants, replyIconNonLocalVariants } from '../../config/varitans';

const MessageReplyIcon = ({ editReply, editReplyClick, show, messageLocal }) => {

    const { clearReplyMessage } = useMessageOptions();

    const closeHandler = () => {
        if (editReply) {
            editReplyClick();
        } else {
            clearReplyMessage();
        }
    };

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {show ?
                <MessageReplyIconContainer key="reply-icon" initial='hidden' animate='visible' exit='exit' variants={messageLocal ? replyIconLocalVariants : replyIconNonLocalVariants}>
                    <i className='reply'>
                        <BsReplyFill />
                    </i>
                    <i className='close' onClick={closeHandler}>
                        <IoClose  />
                    </i>
                </MessageReplyIconContainer>
                : ""}
            </AnimatePresence>
        </>
    );
};

const MessageReplyIconContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    background-color: var(--message);
    box-shadow: var(--shadow-first);
    padding: 1rem;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    transition: background .5s;

    .reply {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(1);
        transition: transform .3s;
    }

    .close {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0);
        transition: transform .3s;
        font-size: 1.6rem;
    }

    &:hover {
        background-color: #ff0000;

        .reply {
            transform: scale(0);
        }

        .close {
            transform: scale(1);
        }
    }

    @media (max-width: 500px) {
        &:active {
        background-color: #ff0000;

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
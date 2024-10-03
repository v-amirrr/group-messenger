import React from 'react';
import { useSkeletonEffect } from '../../../hooks/useSkeletonEffect';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { nonLocalMessageRepliedToVariants, localMessageRepliedToVariants } from '../../../config/varitans';

const MessageRepliedTo = ({ replyTo, type, isLocalMessage }) => {

    const { addSkeletonEffect, scrollToMessage } = useSkeletonEffect();
    let mouseSituation = 'OUT';

    const clickHandler = (e) => {
        if (type == 'CHAT' && replyTo) {
            e.stopPropagation();
            scrollToMessage(replyTo?.id);
            setTimeout(() => {
                addSkeletonEffect(replyTo?.id);
            }, 1000);
        }
    };

    const hoverHandler = () => {
        mouseSituation = 'IN';
        setTimeout(() => {
            if (type == 'CHAT' && replyTo && mouseSituation == 'IN') {
                addSkeletonEffect(replyTo?.id);
            }
        }, 300);
    };

    return (
        <>
            <MessageRepliedToContainer
                initial='hidden' animate='visible' exit='exit' variants={isLocalMessage ? localMessageRepliedToVariants : nonLocalMessageRepliedToVariants}
                onClick={(e) => replyTo != 'DELETED_REPLY' ? clickHandler(e) : ''}
                onMouseEnter={hoverHandler}
                onMouseLeave={() => mouseSituation = 'OUT'}
                data={{
                    chatType: type == 'CHAT',
                    deletedReply: replyTo == 'DELETED_REPLY',
                    isLocalMessage,
                }}
            >
                <i className='reply-icon'><BsReplyFill /></i>
                {
                    replyTo != 'DELETED_REPLY' ?
                    <p className='reply-message'>{replyTo?.plainText}</p> :
                    <p className='reply-message'>Deleted Message</p>
                }
            </MessageRepliedToContainer>
        </>
    );
};

const MessageRepliedToContainer = styled(motion.div)`
    position: relative;
    max-width: 8rem;
    height: 1.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    padding: ${props => props.data.isLocalMessage ? '0 .8rem 0 1.15rem' : '0 1.25rem 0 .8rem'};
    left: ${props => props.data.isLocalMessage ? '.75rem' : '-.75rem'};
    z-index: 1;
    background-color: var(--bg);
    color: var(--grey);
    cursor: ${props => !props.data.deletedReply && 'pointer'};
    transition: background .2s;

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            background-color: ${props => !props.data.deletedReply && props.data.chatType ? 'var(--bg-hover)' : ''};
        }
    }

    .reply-icon {
        position: absolute;
        left: ${props => props.data.isLocalMessage ? '.25rem' : ''};
        right: ${props => props.data.isLocalMessage ? '' : '.25rem'};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .8rem;
        color: #ffffff22;
    }

    .reply-message {
        display: inline;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .6rem;
        font-weight: 300;
    }
`;

export default MessageRepliedTo;
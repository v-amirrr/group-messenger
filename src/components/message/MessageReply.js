import React from 'react';
import { useSkeletonEffect } from '../../hooks/useSkeletonEffect';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

const MessageReply = ({ replyTo, type }) => {

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
            <ReplyContainer
                onClick={(e) => replyTo != 'DELETED_REPLY' ? clickHandler(e) : ''}
                onMouseEnter={hoverHandler}
                onMouseLeave={() => mouseSituation = 'OUT'}
                data={{
                    chatType: type == 'CHAT',
                    deletedReply: replyTo == 'DELETED_REPLY'
                }}
            >
                <i className='reply-icon'><BsReplyFill /></i>
                {
                    replyTo != 'DELETED_REPLY' ?
                    <p className='reply-message'>{replyTo?.plainText}</p> :
                    <p className='reply-message'>Deleted Message</p>
                }
            </ReplyContainer>
        </>
    );
};

const ReplyContainer = styled.div`
    position: relative;
    bottom: .05rem;
    max-width: 6.5rem;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    padding: .25rem .4rem .25rem 1rem;
    margin: 0 .4rem 0 0;
    background-color: var(--bg);
    color: var(--grey);
    box-shadow: var(--shadow);
    font-size: .6rem;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    cursor: ${props => !props.data.deletedReply && 'pointer'};
    transition: background .2s;

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            background-color: ${props => !props.data.deletedReply && props.data.chatType ? 'var(--bg-hover)' : ''};
        }
    }

    .reply-icon {
        position: absolute;
        left: .25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .2rem;
        font-size: .7rem;
        color: #ffffff22;
    }

    .reply-message {
        display: inline;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

export default MessageReply;
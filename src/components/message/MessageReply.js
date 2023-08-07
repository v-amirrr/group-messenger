import React, { memo } from 'react';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

const MessageReply = ({ replyTo }) => {
    return (
        <>
            {replyTo != "no_reply" ?
            <ReplySection>
                <i><BsReplyFill /></i>
                {replyTo ?
                <>
                    <p className='reply-username'>{replyTo?.username}</p>
                    <p className='reply-message'>{replyTo?.message}</p>
                </>
                : <p className='reply-username'>Deleted Message</p>}
            </ReplySection>
            : ""}
        </>
    );
};

const ReplySection = styled.div`
    background-color: var(--message);
    box-shadow: var(--shadow-second);
    position: absolute;
    top: .4rem;
    left: 50%;
    padding: .3rem;
    width: 92%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--text-color-second);
    font-weight: var(--text-boldness-first);
    transform: translate(-50%, 0);
    border-radius: 50px;
    white-space: nowrap;
    overflow: hidden;
    font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        margin-right: .2rem;
        color: var(--text-color-first);
    }

    .reply-username {
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 50%;
        display: ${props => props.isMessageFromLocalUser ? "none" : "inline-block"};
        font-size: .6rem;
        font-weight: 300;
        margin-right: .2rem;
        white-space: nowrap;
        font-weight: var(--text-boldness-second);
        color: var(--text-color-second);
    }

    .reply-message {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .6rem;
        max-width: 50%;
    }
`;

export default memo(MessageReply);
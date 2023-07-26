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
                    <p className='reply-username'>{replyTo?.username}:</p>
                    <p className='reply-message'>{replyTo?.message}</p>
                </>
                : <p className='reply-message'>Deleted Message</p>}
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
    border-radius: var(--radius-fifth);
    white-space: nowrap;
    overflow: hidden;
    font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .8rem;
        margin-left: .2rem;
    }

    .reply-username {
        font-size: .5rem;
        margin: 0 .2rem;
    }

    .reply-message {
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8rem;

        :after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 30%;
            height: 100%;
            pointer-events: none;
            background-image: linear-gradient(to right, transparent, #000000);
            display: none;
        }
    }
`;

export default memo(MessageReply);
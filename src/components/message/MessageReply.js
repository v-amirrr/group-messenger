import React, { memo } from 'react';
import styled from 'styled-components';

const MessageReply = ({ replyTo }) => {
    return (
        <>
            {replyTo != "no_reply" ? 
            <ReplySection>
                {replyTo ? 
                <>
                    <p className='reply-username'>{replyTo?.username}</p>
                    <p className='reply-message'>{replyTo?.message}</p>
                </>
                : <p className='reply-message'>Deleted Message</p>}
            </ReplySection>
            : ""}
        </>
    );
};

const ReplySection = styled.div`
    background-color: var(--message-reply);
    position: absolute;
    top: .4rem;
    left: 50%;
    padding: .3rem;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #888;
    transform: translate(-50%, 0);
    border-radius: 30px;
    white-space: nowrap;
    overflow: hidden;
    
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
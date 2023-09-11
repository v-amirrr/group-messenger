import React, { memo } from 'react';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

const MessageReply = ({ replyTo, type }) => {
    return (
        <>
            {replyTo != "no_reply" && type != "TRASH" ?
            <ReplySection usernamelen={replyTo?.username?.length} messagelen={replyTo?.message?.length}>
                <i><BsReplyFill /></i>
                {replyTo ?
                    <p className='reply-message'>{replyTo?.message}</p>
                : <p className='reply-username'>Deleted Message</p>}
            </ReplySection>
            : ""}
        </>
    );
};

const ReplySection = styled.div`
    border-radius: 50px;
    white-space: nowrap;
    overflow: hidden;
    font-family: ${props => props.isrlt ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .6rem;
    font-weight: 300;
    margin-right: .2rem;
    font-weight: var(--text-boldness-second);
    color: var(--text-color-second);
    background-color: var(--message);
    padding: .2rem .5rem .2rem 1.2rem;
    position: relative;
    bottom: .15rem;
    right: .2rem;
    max-width: 6.5rem;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .8rem;
        margin-right: .2rem;
        position: absolute;
        left: .3rem;
        color: var(--text-color-first);
    }

    .reply-message {
        white-space: nowrap;
        display: inline;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

export default memo(MessageReply);
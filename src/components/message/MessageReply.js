import React from 'react';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

const MessageReply = ({ replyTo, type }) => {
    return (
        <>
            {
                replyTo != 'no_reply' && type != 'TRASH' ?
                <ReplySection
                    usernamelen={replyTo?.username?.length}
                    messagelen={replyTo?.message?.length}
                >
                    <i>
                        <BsReplyFill />
                    </i>
                    {
                        replyTo ?
                        <p className='reply-message'>{replyTo?.message}</p> :
                        <p className='reply-username'>Deleted Message</p>
                    }
                </ReplySection>
                : ''
            }
        </>
    );
};

const ReplySection = styled.div`
    border-radius: 50px;
    white-space: nowrap;
    overflow: hidden;
    font-family: ${props => props.isrlt ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.6rem;
    font-weight: 300;
    margin-right: 0.2rem;
    font-weight: 400;
    color: var(--pale-color);
    background-color: #ffffff09;
    box-shadow: var(--bold-shadow);
    padding: 0.2rem 0.5rem 0.2rem 1.2rem;
    position: relative;
    max-width: 6.5rem;
    height: 100%;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        margin-right: 0.2rem;
        position: absolute;
        left: 0.3rem;
        color: #ffffff22;
    }

    .reply-message {
        white-space: nowrap;
        display: inline;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

export default MessageReply;

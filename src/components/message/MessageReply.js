import React from 'react';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

const MessageReply = ({ replyTo, type, applyScrollMessageId }) => {

    const clickHandler = (e) => {
        e.stopPropagation();
        if (type == 'CHAT') {
            applyScrollMessageId(replyTo?.id, 'CLICK');
        }
    };

    const hoverHandler = () => {
        if (type == 'CHAT') {
            applyScrollMessageId(replyTo?.id, 'HOVER');
        }
    };

    return (
        <>
            {
                replyTo != 'no_reply' && type != 'TRASH' ?
                <ReplyContainer
                    usernamelen={replyTo?.username?.length}
                    messagelen={replyTo?.message?.length}
                    onClick={(e) => clickHandler(e)}
                    onMouseEnter={hoverHandler}
                >
                    <i>
                        <BsReplyFill />
                    </i>
                    {
                        replyTo ?
                        <p className='reply-message'>{replyTo?.message}</p> :
                        <p className='reply-username'>Deleted Message</p>
                    }
                </ReplyContainer>
                : ''
            }
        </>
    );
};

const ReplyContainer = styled.div`
    max-width: 6.5rem;
    height: 100%;
    border-radius: 50px;
    overflow: hidden;
    font-family: ${props => props.isrlt ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    color: var(--pale-color);
    background-color: #ffffff09;
    box-shadow: var(--bold-shadow);
    padding: 0.2rem 0.5rem 0.2rem 1.2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 0.075rem;
    margin-right: 0.4rem;
    white-space: nowrap;
    cursor: pointer;
    transition: background .2s;

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            background-color: #ffffff15;
        }
    }

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

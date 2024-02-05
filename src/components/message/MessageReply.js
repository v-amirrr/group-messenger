import React from 'react';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

const MessageReply = ({ replyTo, type, applyScrollMessageId }) => {

    let mouseSituation = 'OUT';

    const clickHandler = (e) => {
        if (type == 'CHAT' && replyTo) {
            e.stopPropagation();
            applyScrollMessageId(replyTo?.id, 'CLICK');
        }
    };

    const hoverHandler = () => {
        mouseSituation = 'IN';
        setTimeout(() => {
            if (type == 'CHAT' && replyTo && mouseSituation == 'IN') {
                applyScrollMessageId(replyTo?.id, 'HOVER');
            }
        }, 300);
    };

    return (
        <>
            {
                replyTo != 'no_reply' && type != 'TRASH' ?
                <ReplyContainer
                    onClick={(e) => clickHandler(e)}
                    onMouseEnter={hoverHandler}
                    onMouseLeave={() => mouseSituation = 'OUT'}
                    usernamelen={replyTo?.username?.length}
                    messagelen={replyTo?.message?.length}
                    deletedreplyto={!replyTo ? 1 : 0}
                >
                    <i><BsReplyFill /></i>
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
    position: relative;
    bottom: .075rem;
    max-width: 6.5rem;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    padding: .2rem .5rem .2rem 1.2rem;
    margin-right: .4rem;
    background-color: #ffffff08;
    color: var(--pale-color);
    box-shadow: var(--normal-shadow);
    font-size: .6rem;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    cursor: ${props => !props.deletedreplyto && 'pointer'};
    transition: background .2s;

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            background-color: ${props => !props.deletedreplyto && '#ffffff15'};
        }
    }

    i {
        position: absolute;
        left: .3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .2rem;
        font-size: .8rem;
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
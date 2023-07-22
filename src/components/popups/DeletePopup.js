import React from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelect } from '../../hooks/useSelect';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DeletePopup = ({ popupMessages }) => {

    const { deleteMessage, closePopup } = useMessageOptions();
    const { deleteSelectedMessages, clearSelectedMessages } = useSelect();

    const pressEnter = e => {
        if (e.key == "Enter") {
            deleteMessage(popupMessages.id);
        }
    };

    const deleteHandler = () => {
        if (popupMessages.length > 1) {
            deleteSelectedMessages();
        } else {
            deleteMessage(popupMessages[0].id);
        }
        clearSelectedMessages();
    };

    return (
        <>
            <DeletePopupContainer onKeyDown={e => pressEnter(e)}>
                <h4 className='delete-text'>Are you sure you want to delete {popupMessages.length > 1 ? "these messages" : "this message"} permanently?</h4>

                <div className='messages'>
                    {popupMessages.map(item => (
                            <Message className='message' key={item.id} ispersian={item.isPersian} isMessageFromLocalUser={item.isMessageFromLocalUser} messagePosition={item.messagePosition} isreply={item.replyTo != "no_reply" ? 1 : 0}>
                                {item.replyTo != "no_reply" ?
                                <div className='reply'>
                                    {item.replyTo ?
                                    <>
                                        <p className='reply-username'>{item.replyTo?.username}</p>
                                        <p className='reply-message'>{item.replyTo?.message}</p>
                                    </>
                                    : <p className='reply-message'>Deleted Message</p>}
                                </div>
                                : ""}

                                <p className='text'>
                                    {item.messageText?.map((item, index) => (
                                        item.link ? <a key={index} className='link' href={item.word} target="_blank" rel='noopener nereferrer'>{item.word}</a> : `${item.word} `
                                    ))}
                                </p>

                                <div className='time'>
                                    <span>{item.time.hour < 10 ? `0${item.time.hour}` : item.time.hour}</span>
                                    :
                                    <span>{item.time.minute < 10 ? `0${item.time.minute}` : item.time.minute}</span>
                                </div>
                            </Message>
                    ))}
                </div>

                <div className='buttons'>
                    <motion.button className='cancel' whileTap={{ scale: 0.9 }} onClick={closePopup}>Cancel</motion.button>
                    <motion.button className='delete' whileTap={{ scale: 0.9 }} onClick={deleteHandler} autoFocus>Delete</motion.button>
                </div>
            </DeletePopupContainer>
        </>
    );
};

const DeletePopupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .delete-text {
        white-space: nowrap;
    }

    .messages {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        margin-top: 2rem;
        user-select: none;
        width: 80%;
    }

    @media (max-width: 768px) {
        .delete-text {
            font-size: .8rem;
        }
    }
`;

const Message = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--message);
    margin: ${props =>
        props.messagePosition == 0 ?
        ".2rem 0 .2rem 0" :
        props.messagePosition == 1 ?
        ".2rem 0 .04rem 0" :
        props.messagePosition == 2 ?
        ".04rem 0 .04rem 0" :
        props.messagePosition == 3 &&
        ".04rem 0 .2rem 0"
    };
    border-radius: ${props =>
        props.isMessageFromLocalUser ?
            props.messagePosition == 0 ?
            "25px" :
            props.messagePosition == 1 ?
            "25px 25px 2px 25px" :
            props.messagePosition == 2 ?
            "25px 2px 2px 25px" :
            props.messagePosition == 3 &&
            "25px 2px 25px 25px" :
        props.messagePosition == 0 ?
            "25px" :
            props.messagePosition == 1 ?
            "25px 25px 25px 2px" :
            props.messagePosition == 2 ?
            "5px 25px 25px 2px" :
            props.messagePosition == 3 &&
            "2px 25px 25px 25px"
    };
    padding: ${props => props.isreply ? "2.4rem 2.8rem .5rem .8rem" : ".5rem 2.8rem .5rem .8rem"};
    min-width: ${props => props.isreply ? "30%" : ""};
    width: fit-content;
    max-width: 100%;
    font-weight: 200;
    word-break: break-all;

    .text {
        text-align: ${props => props.ispersian ? "right" : "left"};
        word-spacing: 1px;
        line-break: loose;
        word-break: keep-all;
        white-space: pre-wrap;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-size: .8rem;
    }

    .time {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 2rem;
        font-size: .4rem;
        font-weight: 600;
        letter-spacing: .5px;
        color: var(--message-time);
        white-space: nowrap;
        margin: ${props =>
            props.messagePosition == 0 ?
            "0 .4rem .5rem 0" :
            props.messagePosition == 1 ?
            "0 .1rem .3rem 0" :
            props.messagePosition == 2 ?
            "0 .1rem .3rem 0" :
            props.messagePosition == 3 &&
            "0 .1rem .5rem 0"
        };
    }

    .reply {
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
            font-size: .4rem;
            margin: 0 .2rem;
        }

        .reply-message {
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: .6rem;
        }
    }

    @media (max-width: 768px) {
        .text {
            font-size: .6rem;
        }
    }
`;

export default DeletePopup;
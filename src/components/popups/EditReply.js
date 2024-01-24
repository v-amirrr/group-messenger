import React, { useState, useEffect, useRef, memo } from 'react';
import Message from '../message/Message';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { isRTL } from '../../functions/isRlt';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { replyAddSectionVariants, replyButtonVariants } from '../../config/varitans';

const EditReply = ({ replyTo, id, editReplyOpen, setEditReplyOpen }) => {
    const { messages, usernames } = useSelector(store => store.firestoreStore);
    const { user } = useSelector(store => store.userStore);
    const { editMessageReply } = useMessageOptions();
    const messagesRef = useRef();
    const [newReply, setNewReply] = useState(replyTo);
    const [messagesBefore, setMessagesBefore] = useState([]);

    const editHandler = () => {
        editMessageReply(id, newReply);
        setEditReplyOpen(!editReplyOpen);
    };

    const openHandler = () => {
        setEditReplyOpen(!editReplyOpen);
        setTimeout(() => {
            messagesRef?.current?.scrollBy({
                top: messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight,
                left: 0,
                behavior: "instant"
            });
        }, 250);
    };

    useEffect(() => {
        let newMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                break;
            } else {
                newMessages.push(messages[i]);
            }
        }
        setMessagesBefore(newMessages);
    }, []);

    useEffect(() => {
        let text = [];
        if (typeof newReply.message === 'object') {
            newReply?.message?.map((item) => {
                text.push(item.word);
            });
            text = text.join(' ');
            setNewReply({ ...newReply, message: text });
        }
    }, [newReply]);

    return (
        <>
            <ReplyConatiner editreplyopen={editReplyOpen ? 1 : 0}>
                <AnimatePresence exitBeforeEnter>
                    {
                        editReplyOpen ?
                        <motion.div
                            key='reply-messages-open'
                            className='open-items'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={replyAddSectionVariants}
                        >
                            <div className='messages' ref={messagesRef}>
                                {
                                    messagesBefore?.map((message) => (
                                        <Message
                                            onClick={() =>
                                                newReply.id == message.id ?
                                                setNewReply('deleted') :
                                                setNewReply(message)
                                            }
                                            replyIconClick={() => setNewReply('deleted')}
                                            key={message.id}
                                            type='EDIT_REPLY'
                                            newreply={newReply.id == message.id}
                                            message={{
                                                messageUid: message.uid,
                                                localUid: user?.uid,
                                                localMessage: user?.uid == message.uid,
                                                messageUsername: usernames[message.uid],
                                                id: message.id,
                                                text: message.message,
                                                plainText: message.plainText,
                                                isTextPersian : isRTL(message.message) ? 1 : 0,
                                                textLetters: message.plainText.length,
                                                periorUsername: message.periorUsername,
                                                nextUsername: message.nextUsername,
                                                time: message.time,
                                                priorDifferentDate: message.priorDifferentDate,
                                                nextDifferentDate: message.nextDifferentDate,
                                                replyTo: message.replyTo,
                                            }}
                                        />
                                    ))
                                }
                            </div>
                            <div className='buttons'>
                                <button className='cancel' onClick={() => setEditReplyOpen(!editReplyOpen)}>
                                    Cancel
                                </button>
                                <button className='edit' onClick={editHandler}>
                                    Edit Reply
                                </button>
                            </div>
                        </motion.div>
                        : ''
                    }
                    <AnimatePresence>
                        {
                            !editReplyOpen ?
                            <motion.button
                                className='open-button'
                                onClick={openHandler}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                variants={replyButtonVariants}
                            >
                                <i><BsReplyFill /></i>
                                <p>
                                    {
                                        replyTo != 'no_reply' && replyTo != 'deleted' ?
                                        replyTo?.message :
                                        'Add Reply'
                                    }
                                </p>
                            </motion.button>
                            : ''
                        }
                    </AnimatePresence>
                </AnimatePresence>
            </ReplyConatiner>
        </>
    );
};

const ReplyConatiner = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.editreplyopen ? '0' : '1.7rem'};
    left: ${props => props.editreplyopen ? '0' : '3rem'};
    width: ${props => props.editreplyopen ? '100%' : '4.8rem'};
    height: ${props => props.editreplyopen ? '100%' : '1.4rem'};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    background-color: ${props => props.editreplyopen ? '#000000aa' : '#00000000'};
    border: ${props => props.editreplyopen ? 'solid 2.5px #ffffff00' : 'solid 2.5px #ffffff20'};
    box-shadow: var(--shadow-second);
    overflow: hidden;
    transition: ${props =>
        props.editreplyopen ?
        'border .4s .2s, background .2s, width .3s cubic-bezier(.53,0,0,.98), height .3s cubic-bezier(.53,0,0,.98), bottom .3s, left .3s' :
        'border .4s, background .2s .6s, width .3s .1s, height .3s .1s, bottom .3s .1s, left .3s .1s'
    };

    .open-button {
        all: unset;
        cursor: pointer;
        position: absolute;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--pale-color);
        font-weight: 400;
        white-space: nowrap;

        p {
            font-size: 0.6rem;
            white-space: nowrap;
            display: inline;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0 0.2rem 0 0;
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8rem;
            margin: 0 0.1rem 0 0.4rem;
        }
    }

    .open-items {
        width: 100%;
        height: 100%;

        .messages {
            padding: 1rem;
            width: 100%;
            height: 100%;
            padding-bottom: 6rem;
            position: relative;
            overflow: hidden scroll;
            scroll-behavior: smooth;
        }

        .buttons {
            position: absolute;
            bottom: 1rem;
            left: 0;
            width: 100%;
            z-index: 3;

            .cancel {
                background-color: #990000 !important;

                &:hover {
                    background-color: #cc0000 !important;
                }
            }

            .edit {
                background-color: #009900 !important;
                color: #fff !important;
                width: 6rem !important;

                &:hover {
                    background-color: #00cc00 !important;
                }
            }
        }
    }

    @media (max-width: 768px) {
        bottom: auto;
        top: ${props => props.editreplyopen ? '0' : '.8rem'};
        left: ${props => props.editreplyopen ? '0' : '2rem'};

        .reply-messages {
            padding: 1rem 0.5rem;
        }
    }
`;

export default memo(EditReply);

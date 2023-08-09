import React, { useState, useEffect, memo } from 'react';
import Message from '../message/Message';
import { useSelector } from 'react-redux';
import { useMessageOptions } from "../../hooks/useMessageOptions";
import { AiFillEdit } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { replyAddSectionVariants, replyButtonVariants } from '../../config/varitans';

const EditReply = ({ replyTo, id, editReplyOpen, setEditReplyOpen }) => {

    const { messages, localUsername } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);

    const { editReply } = useMessageOptions();

    const [newReply, setNewReply] = useState(replyTo?.id);
    const [messagesBefore, setMessagesBefore] = useState([]);

    useEffect(() => {
        editReply(newReply);
    }, [newReply]);

    useEffect(() => {
        let newMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                break;
            } else {
                newMessages.push(messages[i]);
            }
        };
        setMessagesBefore(newMessages);
    }, []);

    return (
        <>
            <ReplyConatiner editReplyOpen={editReplyOpen ? 1 : 0}>
                <AnimatePresence>
                    {editReplyOpen ?
                    <motion.div key="open" className='open-items' initial='hidden' animate='visible' exit='exit' variants={replyAddSectionVariants}>
                        <header>
                            <button className='close-button' onClick={() => setEditReplyOpen(!editReplyOpen)}>
                                <IoClose />
                            </button>
                            <h3>Choose the message you want to reply to</h3>
                        </header>
                        <div className='messages'>
                            {messagesBefore?.map(message => (
                                <Message
                                    onClick={() => newReply == message.id ? setNewReply("deleted") : setNewReply(message.id)}
                                    key={message.id}
                                    type="EDIT_REPLY"
                                    newreply={newReply == message.id}
                                    message={{
                                        messageUid: message.uid,
                                        localUid: user?.uid,
                                        messageUsername: message.username,
                                        id: message.id,
                                        message: message.message,
                                        periorUsername: message.periorUsername,
                                        nextUsername: message.nextUsername,
                                        time: message.time,
                                        priorDifferentDate: message.priorDifferentDate,
                                        nextDifferentDate: message.nextDifferentDate,
                                        replyTo: message.replyTo,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                    : ""}

                    <AnimatePresence>
                        {!editReplyOpen ?
                        <motion.button className='open-button' onClick={() => setEditReplyOpen(!editReplyOpen)} initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}>
                            <i><AiFillEdit /></i>
                            <p>Edit Reply</p>
                        </motion.button>
                        : ""}
                    </AnimatePresence>
                </AnimatePresence>
            </ReplyConatiner>
        </>
    );
};

const ReplyConatiner = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.editReplyOpen ? "0" : "1.2rem"};
    right: ${props => props.editReplyOpen ? "0" : "1rem"};
    width: ${props => props.editReplyOpen ? "100%" : "6.6rem"};
    height: ${props => props.editReplyOpen ? "100%" : "2.3rem"};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    background-color: var(--edit-reply);
    z-index: 10;
    box-shadow: var(--shadow-second);
    overflow: hidden;
    transition: ${props =>
        props.editReplyOpen ?
        "width .8s cubic-bezier(.53,0,0,.98), height .8s cubic-bezier(.53,0,0,.98), bottom .6s, right .6s" :
        "width .4s .1s cubic-bezier(.53,0,0,.98), height .4s .1s cubic-bezier(.53,0,0,.98), bottom .4s .1s, right .4s .1s"
    };

    .open-button {
        all: unset;
        cursor: pointer;
        position: absolute;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--text-color-third);
        font-weight: var(--text-boldness-second);
        white-space: nowrap;

        .edit-reply-button {
            margin-right: 1rem;
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .2rem;
        }

        p {
            font-size: .8rem;
        }
    }

    .open-items {
        padding: 1rem;
        overflow: hidden scroll;
        width: 100%;
        height: 100%;

        header {
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;

            h3 {
                white-space: nowrap;
                word-spacing: 3px;
                letter-spacing: -1px;
                background-color: var(--message);
                border-radius: 50px;
                padding: .3rem 1rem;
            }

            .close-button {
                position: absolute;
                top: .8rem;
                left: .8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                background-color: var(--button);
                cursor: pointer;
                border-radius: 50px;
                box-shadow: var(--shadow-second);
                padding: .3rem;
                z-index: 999;
                transition: background .2s;

                &:hover {
                    background-color: var(--button-hover);
                }
            }
        }

        .messages {
            margin-top: 3rem;
            position: relative;
            overflow: hidden scroll;
            scroll-behavior: smooth;
        }
    }

    @media (max-width: 768px) {
        header {
            h3 {
                font-size: .9rem;
            }

            hr {
                bottom: -.5rem;
            }
        }

        .reply-messages {
            padding: 1rem .5rem;
        }
    }
`;

export default memo(EditReply);
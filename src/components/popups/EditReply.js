import React, { useState, useEffect, useRef, memo } from 'react';
import Message from '../message/Message';
import { useSelector } from 'react-redux';
import { useMessageOptions } from "../../hooks/useMessageOptions";
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { replyAddSectionVariants, replyButtonVariants, replyMessagesButtonsVariants } from '../../config/varitans';

const EditReply = ({ replyTo, id, editReplyOpen, setEditReplyOpen }) => {

    const { messages } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);

    const { editMessageReply } = useMessageOptions();

    const [newReply, setNewReply] = useState(replyTo);
    const [messagesBefore, setMessagesBefore] = useState([]);

    const messagesEndRef = useRef();

    const editHandler = () => {
        editMessageReply(id, newReply);
        setEditReplyOpen(!editReplyOpen);
    };

    const openHandler = () => {
        setEditReplyOpen(!editReplyOpen);
        if (editReplyOpen) {
            setTimeout(() => {
                messagesEndRef?.current?.scrollIntoView({
                    behavior: "smooth", block: "center", inline: "end"
                });
            }, 800);
        };
    };

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

    useEffect(() => {
        let text = [];
        if (typeof newReply.message === 'object') {
            newReply?.message?.map(item => {
                text.push(item.word);
            });
            text = text.join(" ");
            setNewReply({ ...newReply, message: text });
        }
    }, [newReply]);

    useEffect(() => {
        const goBottom = setTimeout(() => {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
        }, 1000);

        return () => clearTimeout(goBottom);
    }, [editReplyOpen]);

    return (
        <>
            <ReplyConatiner editReplyOpen={editReplyOpen ? 1 : 0}>
                <AnimatePresence exitBeforeEnter>
                    {editReplyOpen ?
                    <motion.div key="reply-messages-open" className='open-items' initial='hidden' animate='visible' exit='exit' variants={replyAddSectionVariants}>
                        <div className='messages'>
                            {messagesBefore?.map(message => (
                                <Message
                                    onClick={() => newReply .id == message.id ? setNewReply("deleted") : setNewReply(message)}
                                    replyIconClick={() => setNewReply("deleted")}
                                    key={message.id}
                                    type="EDIT_REPLY"
                                    newreply={newReply.id == message.id}
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
                            <div ref={messagesEndRef} />
                        </div>
                        <div className='buttons'>
                            <button className='cancel' onClick={() => setEditReplyOpen(!editReplyOpen)}>Cancel</button>
                            <button className='edit' onClick={editHandler}>Edit Reply</button>
                        </div>
                    </motion.div>
                    : ""}

                    <AnimatePresence>
                        {!editReplyOpen ?
                        <motion.button className='open-button' onClick={openHandler} initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}>
                            <i><BsReplyFill /></i>
                            <p>{replyTo != "no_reply" && replyTo != "deleted" ? replyTo?.message : "Add Reply"}</p>
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
    bottom: ${props => props.editReplyOpen ? "0" : "1.7rem"};
    left: ${props => props.editReplyOpen ? "0" : "3rem"};
    width: ${props => props.editReplyOpen ? "100%" : "4rem"};
    height: ${props => props.editReplyOpen ? "100%" : "1.4rem"};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    background-color: ${props => props.editReplyOpen ? "#000000aa" : "#00000000"};
    border: var(--border-first);
    z-index: 10;
    box-shadow: var(--shadow-second);
    overflow: hidden;
    transition: ${props =>
        props.editReplyOpen ?
        "background .4s, width .6s cubic-bezier(.53,0,0,.98), height .6s cubic-bezier(.53,0,0,.98), bottom .6s, left .6s" :
        "background .4s .4s, width .4s .1s cubic-bezier(.53,0,0,.98), height .4s .1s cubic-bezier(.53,0,0,.98), bottom .4s .1s, left .4s .1s"
    };

    .open-button {
        all: unset;
        cursor: pointer;
        position: absolute;
        z-index: 999;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        color: var(--text-color-second);
        font-weight: var(--text-boldness-second);
        white-space: nowrap;

        p {
            font-size: .5rem;
            white-space: nowrap;
            display: inline;
            text-overflow: ellipsis;
            overflow: hidden;
            margin: 0 .2rem 0 0;
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .8rem;
            margin: 0 .1rem 0 .4rem;
        }
    }

    .open-items {
        padding: 1rem;
        overflow: hidden scroll;
        width: 100%;
        height: 100%;

        .messages {
            padding-bottom: 3rem;
            position: relative;
            overflow: hidden scroll;
            scroll-behavior: smooth;
        }

        .buttons {
            position: absolute;
            bottom: 1rem;
            left: 0;
            width: 100%;
            z-index: 999;

            .cancel {
                background-color: #ff0000aa;

                &:hover {
                    background-color: #ff0000;
                }
            }

            .edit {
                background-color: #00ff00aa;
                color: #fff;
                width: 6rem;

                &:hover {
                    background-color: #00ff00;
                }
            }
        }
    }

    @media (max-width: 768px) {
        bottom: auto;
        left: auto;
        top: ${props => props.editReplyOpen ? "0" : ".5rem"};
        right: ${props => props.editReplyOpen ? "0" : ".5rem"};
        transition: ${props =>
            props.editReplyOpen ?
            "background .4s, width .6s cubic-bezier(.53,0,0,.98), height .6s cubic-bezier(.53,0,0,.98), top .6s, right .6s" :
            "background .4s .4s, width .4s .1s cubic-bezier(.53,0,0,.98), height .4s .1s cubic-bezier(.53,0,0,.98), top .4s .1s, right .4s .1s"
        };

        .reply-messages {
            padding: 1rem .5rem;
        }
    }
`;

export default memo(EditReply);
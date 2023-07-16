import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from "../../hooks/useMessageOptions";
import { isRTL } from '../../functions/isRlt';
import { BsReplyFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { replyAddSectionVariants, replyButtonVariants } from '../../config/varitans';

const EditReply = ({ replyTo, popupMessageId, editReplyOpen, setEditReplyOpen }) => {

    const messagesEndRef = useRef();

    const { editReply } = useMessageOptions();

    const { messages, localUsername } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);

    const [newReply, setNewReply] = useState(replyTo?.id);
    const [messagesBefore, setMessagesBefore] = useState([]);

    const handleMessagePosition = (priorDifferentDate, nextDifferentDate, periorUsername, nextUsername, messageUsername, lastMessage) => {
        if (lastMessage) {
            if (periorUsername == messageUsername) {
                return 3;
            } else {
                return 0;
            }
        }

        if (priorDifferentDate && nextDifferentDate) {
            return 0;
        }

        if (priorDifferentDate && !nextDifferentDate) {
            if (nextUsername == messageUsername) {
                return 1;
            } else {
                return 0;
            }
        }

        if (!priorDifferentDate && nextDifferentDate) {
            if (periorUsername == messageUsername) {
                return 3;
            } else {
                return 0;
            }
        }

        if (!priorDifferentDate && !nextDifferentDate) {
            if (periorUsername != messageUsername && nextUsername != messageUsername) {
                return 0;
            } else if (periorUsername != messageUsername && nextUsername == messageUsername) {
                return 1;
            } else if (periorUsername == messageUsername && nextUsername == messageUsername) {
                return 2;
            } else if (periorUsername == messageUsername && nextUsername != messageUsername) {
                return 3;
            }
        }
    };

    useEffect(() => {
        editReply(newReply);
    }, [newReply]);

    useEffect(() => {
        const goBottom = setTimeout(() => {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
        }, 1000);
        return () => clearTimeout(goBottom);
    }, [editReplyOpen]);

    useEffect(() => {
        let newMessages = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id == popupMessageId) {
                break;
            } else {
                newMessages.push(messages[i]);
            }
        };
        let messagesWithPostion = newMessages.map((message, index) => {
            let lastMessage = index+1 == newMessages.length;
            return {
                ...message,
                messagePosition: handleMessagePosition(message.priorDifferentDate, message.nextDifferentDate, message.periorUsername, message.nextUsername, message.uid, lastMessage)
            };
        });
        setMessagesBefore(messagesWithPostion);
    }, []);

    return (
        <>
            <ReplyConatiner editReplyOpen={editReplyOpen ? 1 : 0}>
                <AnimatePresence>
                    {editReplyOpen ?
                    <motion.div key="open" className='reply-messages' initial='hidden' animate='visible' exit='exit' variants={replyAddSectionVariants}>
                        <header>
                            <h3>Choose the message you want to reply to</h3>
                            <hr />
                            <motion.button key="close-icon" className='close-button' onClick={() => setEditReplyOpen(!editReplyOpen)} whileTap={{ scale: 0.8 }}>
                                <IoClose />
                            </motion.button>
                        </header>
                        {messagesBefore?.map(message => (
                            <>
                                {message.priorDifferentDate ?
                                    message.time.year != null && message.time.month != null && message.time.day != null ?
                                    <div className='date'>
                                        <p className='year'>{message.time.year}</p>
                                        <p className='month'>{message.time.month}</p>
                                        <p className='day'>{message.time.day}</p>
                                    </div> : ""
                                : ""}
                                <AddMessageContainer key={message.id} onClick={() => newReply == message.id ? setNewReply("deleted") : setNewReply(message.id)} isuser={message.username == localUsername ? 1 : 0} ispersian={isRTL(message.message) ? 1 : 0} isreply={message.replyTo != "no_reply" ? 1 : 0} selected={message.id == newReply ? 1 : 0} messagePosition={message.messagePosition} isMessageFromLocalUser={message.uid == user.uid ? 1 : 0}>
                                    {message.replyTo != "no_reply" ?
                                    <div className='reply-section'>
                                        {message.replyTo ?
                                        <>
                                            <p className='reply-username'>{message.replyTo?.username}</p>
                                            <p className='reply-message'>{message.replyTo?.message}</p>
                                        </>
                                        : <p className='reply-message'>Deleted Message</p>}
                                    </div>
                                    : ""}
                                    <p className='username'>{message.username}</p>
                                    <p className='message'>
                                        {message.message?.map((item, index) => (
                                            item.link ? <p key={index} className='link' href={item.word} target="_blank">{item.word}</p> : `${item.word} `
                                        ))}
                                    </p>
                                    <span className='time'>
                                        {message.time.hour < 10 ? `0${message.time.hour}` : message.time.hour}:{message.time.minute < 10 ? `0${message.time.minute}` : message.time.minute}
                                    </span>
                                </AddMessageContainer>
                            </>
                        ))}
                        <div ref={messagesEndRef} />
                    </motion.div>
                    : ""}

                    <AnimatePresence>
                        {!editReplyOpen ?
                        <motion.button className='open-button' onClick={() => setEditReplyOpen(!editReplyOpen)} initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}>
                            <BsReplyFill />
                        </motion.button> : ""}
                    </AnimatePresence>
                </AnimatePresence>
            </ReplyConatiner>
        </>
    );
};

const ReplyConatiner = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: ${props => props.editReplyOpen ? "0" : "1rem"};
    bottom: 0;
    margin: ${props => props.editReplyOpen ? "" : "2rem 1.6rem"};
    width: ${props => props.editReplyOpen ? "100%" : "2.2rem"};
    height: ${props => props.editReplyOpen ? "100%" : "2.2rem"};
    border-radius: 25px;
    background-color: var(--edit-reply-background);
    z-index: 10;
    overflow: hidden;
    transition: margin .5s, width .8s cubic-bezier(.53,0,0,.98), height .8s cubic-bezier(.53,0,0,.98), right .5s;

    header {
        position: relative;
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        user-select: none;

        h3 {
            white-space: nowrap;
            word-spacing: 3px;
            letter-spacing: -1px;
        }

        hr {
            width: 100%;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
            border: none;
            height: 2px;
            position: absolute;
            bottom: -.8rem;
        }

        .close-button {
            all: unset;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            position: absolute;
            left: 0;
            background-color: #ffffff11;
            backdrop-filter: blur(20px) saturate(100%);
            -webkit-backdrop-filter: blur(20px) saturate(100%);
            border-radius: 50%;
            padding: .3rem;
            z-index: 999;
            transition: background .3s;

            &:hover {
                background-color: #ffffff22;
            }
        }
    }

    .open-button {
        all: unset;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        backdrop-filter: blur(20px) saturate(100%);
        -webkit-backdrop-filter: blur(20px) saturate(100%);
        border-radius: 50%;
        padding: .3rem;
        z-index: 999;
    }

    .reply-messages {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 1rem;
        overflow: hidden scroll;
        scroll-behavior: smooth;

        /* width */
        ::-webkit-scrollbar {
            width: .5rem;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            border-radius: 50px;
            background: #ffffff04;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #ffffff11;
            border-radius: 50px;
        }
    }

    .date {
        padding: .3rem .5rem;
        background-color: #ffffff0c;
        color: #f0f0f5;
        border-radius: 50px;
        width: fit-content;
        margin: .5rem auto;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            font-size: .4rem;
            font-weight: 400;
        }

        .month {
            margin: 0 .1rem 0 .15rem;
        }
    }

    @media (max-width: 768px) {
        margin: ${props => props.editReplyOpen ? "" : "1.5rem .5rem"};

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

        .date {
            padding: .2rem .3rem;

            p {
                font-size: .4rem;
            }

            .month {
                margin: 0 .2rem 0 .25rem;
            }
        }
    }
`;

const AddMessageContainer = styled.div`
    background-color: ${props => props.selected ? "#ffffff33" : "#ffffff15"};
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: ${ props => props.isMessageFromLocalUser ? "row-reverse" : "row"};
    user-select: none;
    z-index: 2;
    margin: ${props =>
        props.messagePosition == 0 ?
        ".4rem 0" :
        props.messagePosition == 1 ?
        ".4rem 0 .1rem 0" :
        props.messagePosition == 2 ?
        ".1rem 0" :
        props.messagePosition == 3 &&
        ".1rem 0 .4rem 0"
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
    margin-left: ${props => props.isMessageFromLocalUser && "auto"};
    padding: ${props => props.isreply ? "2.4rem 2.8rem .5rem .8rem" : ".5rem 2.8rem .5rem .8rem"};
    min-width: ${props => props.isreply ? "22%" : ""};
    width: fit-content;
    max-width: 85%;
    backdrop-filter: blur(var(--message-blur)) saturate(100%);
    -webkit-backdrop-filter: blur(var(--message-blur)) saturate(100%);
    font-weight: 200;
    word-break: break-all;
    cursor: pointer;
    transition: background .2s;

    .username {
        display: ${props => props.isMessageFromLocalUser ? "none" : ""};
        color: var(--message-username);
        font-size: .7rem;
        font-weight: 300;
        margin-right: .5rem;
        margin-left: -.2rem;
        white-space: nowrap;
    }

    .message {
        text-align: ${props => props.ispersian ? "right" : "left"};
        word-spacing: 1px;
        line-break: loose;
        word-break: keep-all;
        white-space: pre-wrap;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-size: 1rem;
    }

    .time {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: .5rem;
        font-weight: 500;
        letter-spacing: .5px;
        color: #ffffff55;
        white-space: nowrap;
        margin: ${props => props.isMessageFromLocalUser ? ".6rem .5rem" : ".3rem .8rem"};
        transform: margin .4s;
    }

    .reply-section {
        background-color: #000;
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
    }

    @media (max-width: 768px) {
        .message-box {
            padding: ${props => props.isreply ? "2.4rem 2.5rem .5rem .8rem" : ".5rem 2.5rem .5rem .8rem"};
            max-width: 80%;
            min-width: ${props => props.isreply ? "30%" : ""};
            background-color: #ffffff10;
            border-radius: ${props =>
                props.isMessageFromLocalUser ?
                    props.messagePosition == 0 ?
                    "20px" :
                    props.messagePosition == 1 ?
                    "20px 20px 5px 20px" :
                    props.messagePosition == 2 ?
                    "20px 5px 5px 20px" :
                    props.messagePosition == 3 &&
                    "20px 5px 20px 20px" :
                props.messagePosition == 0 ?
                    "20px" :
                    props.messagePosition == 1 ?
                    "20px 20px 20px 5px" :
                    props.messagePosition == 2 ?
                    "5px 20px 20px 5px" :
                    props.messagePosition == 3 &&
                    "5px 20px 20px 20px"
            };
        }

        .username {
            font-size: .5rem;
            margin-right: .4rem;
        }

        .message {
            font-size: .8rem;
        }
    }
`;

export default memo(EditReply);
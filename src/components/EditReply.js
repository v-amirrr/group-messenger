import React, { useState, useEffect, useRef } from 'react';
import ChatDate from "./ChatDate";
import { isRTL } from '../functions/isRlt';
import useMessageOptions from "../hooks/useMessageOptions";
import { useSelector } from 'react-redux';
import { BsReplyFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const replyAddSectionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.2, delay: 0.2 } }
};

const replyButtonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.5 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.01 } }
};

const EditReply = ({ replyTo, popupMessageId, editReplyOpen, setEditReplyOpen }) => {

    const [newReply, setNewReply] = useState(replyTo?.id);
    const [messagesBefore, setMessagesBefore] = useState([]);

    const messagesEndRef = useRef();

    const { messages, localUsername } = useSelector(store => store.messagesStore);

    const { editReply } = useMessageOptions();

    useEffect(() => {
        editReply(newReply);
    }, [newReply]);

    useEffect(() => {
        setTimeout(() => {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
        }, 600);
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
                messagePosition: handleMessagePosition(message.priorDifferentDate, message.nextDifferentDate, message.periorUsername, message.nextUsername, message.username, lastMessage)
            };
        });
        setMessagesBefore(messagesWithPostion);
    }, []);

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

    return (
        <>
            <ReplyConatiner editReplyOpen={editReplyOpen ? 1 : 0}>
                <AnimatePresence>
                    {editReplyOpen ? 
                    <motion.div key="open" className='reply-messages' initial='hidden' animate='visible' exit='exit' variants={replyAddSectionVariants}>
                        {messagesBefore?.map(message => (
                            <>
                                {message.priorDifferentDate ? <ChatDate dateObj={message.time} /> : ""}
                                <AddMessageContainer key={message.id} onClick={() => newReply == message.id ? setNewReply("deleted") : setNewReply(message.id)} isuser={message.username == localUsername ? 1 : 0} ispersian={isRTL(message.message) ? 1 : 0} isreply={message.replyTo != "no_reply" ? 1 : 0} selected={message.id == newReply ? 1 : 0} messagePosition={message.messagePosition}>
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
                        <motion.button key="open-icon" className='reply-button' onClick={() => setEditReplyOpen(!editReplyOpen)} initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}>
                            <BsReplyFill />
                        </motion.button> :
                        <motion.button key="close-icon" className='reply-button' onClick={() => setEditReplyOpen(!editReplyOpen)} initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}>
                            <IoClose />
                        </motion.button>}
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
    right: 0;
    bottom: 0;
    margin: ${props => props.editReplyOpen ? "" : "2rem 1rem"};
    width: ${props => props.editReplyOpen ? "100%" : "2.2rem"};
    height: ${props => props.editReplyOpen ? "100%" : "2.2rem"};
    border-radius: 25px;
    background-image: linear-gradient(
        45deg,
        hsl(0deg 0% 0%) 60%,
        hsl(195deg 100% 10%) 100%,
        hsl(10deg 0% 0%) 60%,
        hsl(360deg 100% 10%) 100%
    );
    z-index: 10;
    overflow: hidden;
    transition: margin .5s, width .8s cubic-bezier(.53,0,0,.98), height .8s cubic-bezier(.53,0,0,.98);

    .reply-button {
        all: unset;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: ${props => props.editReplyOpen ? ".5rem" : ""};
        left: ${props => props.editReplyOpen ? ".5rem" : ""};
        background-color: ${props => props.editReplyOpen ? "#ffffff11" : "#020208"};
        backdrop-filter: blur(20px) saturate(100%);
        -webkit-backdrop-filter: blur(20px) saturate(100%);
        border-radius: 25px;
        padding: .3rem;
        transition: top .3s, left .3s;
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

    @media (max-width: 768px) {
        margin: ${props => props.editReplyOpen ? "" : "1.5rem .5rem"};

        .reply-messages {
            padding: 1rem .5rem;
        }
    }
`;

const AddMessageContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: ${props => props.selected ? "#ffffff33" : "#ffffff0f"};
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
        props.isuser ? 
            props.messagePosition == 0 ? 
            "30px" : 
            props.messagePosition == 1 ? 
            "30px 30px 5px 30px" : 
            props.messagePosition == 2 ? 
            "30px 5px 5px 30px" : 
            props.messagePosition == 3 && 
            "30px 5px 30px 30px" :
        props.messagePosition == 0 ? 
            "30px" : 
            props.messagePosition == 1 ? 
            "30px 30px 30px 5px" : 
            props.messagePosition == 2 ? 
            "5px 30px 30px 5px" : 
            props.messagePosition == 3 && 
            "5px 30px 30px 30px"
    };
    margin-left: ${props => props.isuser && "auto"};
    padding: ${props => props.isreply ? "2.4rem 2.8rem .5rem .8rem" : ".5rem 2.8rem .5rem .8rem"};
    min-width: ${props => props.isreply ? "22%" : ""};
    width: fit-content;
    max-width: 80%;
    font-weight: 200;
    cursor: pointer;
    word-break: break-all;
    user-select: none;
    transition: background .2s;

    .username {
        display: ${props => props.isuser ? "none" : ""};
        color: #aaa;
        font-size: .5rem;
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
        font-size: .8rem;
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
        margin: ${props => props.isuser ? ".6rem .5rem" : ".3rem .8rem"};
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
        max-width: 90%;
    }
`;

export default EditReply;
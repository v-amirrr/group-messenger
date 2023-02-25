import React, { useState, useEffect, useRef } from 'react';
import { isRTL } from '../functions/isRlt';
import useMessageOptions from "../hooks/useMessageOptions";
import { useSelector } from 'react-redux';
import { BsReplyFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const replyAddSectionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.5 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.4 } }
};

const replyButtonVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
};

const AddReplyEditPopup = ({ replyTo }) => {

    const [replySectionOpen, setReplySectionOpen] = useState(false);
    const [newReply, setNewReply] = useState(replyTo.id);

    const messagesEndRef = useRef();

    const { messages, localUsername } = useSelector(store => store.messagesStore);

    const { editMessage } = useMessageOptions();

    useEffect(() => {
        editMessage(newReply, 3);
    }, [newReply]);

    useEffect(() => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: "smooth", block: "center", inline: "end"
        });
    }, []);

    return (
        <>
            <ReplyConatiner replysectionopen={replySectionOpen ? 1 : 0}>
                <AnimatePresence>
                    {replySectionOpen ? 
                    <motion.div key="open" className='reply-messages' initial='hidden' animate='visible' exit='exit' variants={replyAddSectionVariants}>
                        {messages?.map(message => (
                            <AddMessageContainer key={message.id} onClick={() => newReply == message.id ? setNewReply(null) : setNewReply(message.id)} isuser={message.username == localUsername ? 1 : 0} ispersian={isRTL(message.message) ? 1 : 0} isreply={message.replyTo != "no_reply" ? 1 : 0} selected={message.id == newReply ? 1 : 0}>
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
                        ))}
                        <div ref={messagesEndRef} />
                    </motion.div>
                    : ""}
                    <button className='reply-button' onClick={() => setReplySectionOpen(!replySectionOpen)}>
                        <AnimatePresence exitBeforeEnter>
                            {!replySectionOpen ? 
                            <motion.i initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}><BsReplyFill /></motion.i> : 
                            <motion.i initial='hidden' animate='visible' exit='exit' variants={replyButtonVariants}><IoClose /></motion.i>}
                        </AnimatePresence>
                    </button>
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
    margin: ${props => props.replysectionopen ? "" : "2rem 1rem"};
    width: ${props => props.replysectionopen ? "100%" : "2.2rem"};
    height: ${props => props.replysectionopen ? "100%" : "2.2rem"};
    border-radius: 25px;
    background-color: #0c0c0f;
    z-index: 10;
    transition: margin .5s, width .5s cubic-bezier(.53,0,0,.98), height .7s cubic-bezier(.53,0,0,.98);

    .reply-button {
        all: unset;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: ${props => props.replysectionopen ? "1rem" : ""};
        left: ${props => props.replysectionopen ? "1rem" : ""};
        background-color: ${props => props.replySectionOpen ? "#ffffff11" : ""};
        border-radius: 25px;
        padding: .3rem;
        transition: top .3s, left .3s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
        }
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
            background: #ffffff08;
            border-radius: 50px;
        }
    }

    @media (max-width: 768px) {
        margin: ${props => props.replysectionopen ? "" : "1.5rem .5rem"};

        .reply-messages {
            padding: 1rem .5rem;
        }
    }
`;

const AddMessageContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: ${props => props.selected ? "#ffffff33" : "#ffffff0c"};
    margin: .4rem 0;
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
        background-color: #00000055;
        position: absolute;
        top: .4rem;
        left: 50%;
        transform: translate(-50%, 0);
        padding: .3rem;
        width: 90%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #888;
        border-radius: 30px;
        white-space: nowrap;
        transition: background .2s;
        overflow: hidden;

        .reply-username {
            font-size: .5rem;
            margin: 0 .2rem;
        }

        .reply-message {
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
            }
        }

        &:hover {
            background-color: #000;
        }
    }

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

export default AddReplyEditPopup;
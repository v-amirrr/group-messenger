import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelect } from '../../hooks/useSelect';
import { AiFillDelete, AiFillCopy, AiFillEdit, AiFillClockCircle } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from "react-icons/bi";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../../config/varitans';

const MessageOptions = ({ clickEvent, show, message, replyTo }) => {

    const { enterAsAGuest } = useSelector(store => store.userStore);

    const { openPopup, copyMessage, replyMessage, trashMessage, closeOptions } = useMessageOptions();
    const { selectMessage } = useSelect();

    const messageOptionsRef = useRef();

    const optionClick = (option) => {
        closeOptions();
        setTimeout(() => {
            switch (option) {
                case 'REPLY':
                    replyMessage(message.id, message.message, message.messageUsername);
                break;
                case 'SELECT':
                    selectMessage(message);
                break;
            }
        }, 400);
        switch (option) {
            case 'COPY':
                copyMessage(message.message);
            break;
            case 'EDIT':
                openPopup("EDIT_POPUP", [message]);
            break;
            case 'DELETE':
                trashMessage(message.id);
            break;
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    show ?
                    <MessageOptionsContainer key={message.id} ref={messageOptionsRef} initial='hidden' animate='visible' exit='exit' variants={optionsVariants} ismessagefromlocaluser={message.isMessageFromLocalUser ? 1 : 0} x={clickEvent?.pageX} y={clickEvent?.pageY} guest={enterAsAGuest ? 1 : 0}>
                        {
                            !replyTo ?
                            <>
                                <motion.div className='reply' onClick={() => optionClick("REPLY")} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                                    <i><BsReplyFill /></i>
                                    <p>Reply</p>
                                </motion.div>
                                <motion.hr variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants} />
                            </>
                            : ""
                        }
                        <motion.div className='select' onClick={() => optionClick("SELECT")} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                            <i><BiSelectMultiple /></i>
                            <p>Select</p>
                        </motion.div>
                        <motion.hr variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants} />
                        <motion.div className='copy' onClick={() => optionClick("COPY")} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                            <i><AiFillCopy /></i>
                            <p>Copy</p>
                        </motion.div>
                        <motion.hr variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants} />
                        {
                            message.isMessageFromLocalUser ?
                            <>
                                <motion.div className='edit' onClick={() => optionClick("EDIT")} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                                    <i><AiFillEdit /></i>
                                    <p>Edit</p>
                                </motion.div>
                                <motion.hr variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants} />
                                <motion.div className='delete' onClick={() => optionClick("DELETE")} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                                    <i><AiFillDelete /></i>
                                    <p>Delete</p>
                                </motion.div>
                                <motion.hr variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants} />
                            </>
                            : ""
                        }
                        <motion.div className='time' variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                            <i><AiFillClockCircle /></i>
                            {
                                message.time.hour != null && message.time.minute != null ?
                                <p>
                                    <span>{message.time.hour < 10 ? `0${message.time.hour}` : message.time.hour}</span>:
                                    <span>{message.time.minute < 10 ? `0${message.time.minute}` : message.time.minute}</span>
                                </p>
                                : ""
                            }
                        </motion.div>
                    </MessageOptionsContainer>
                    : ""
                }
            </AnimatePresence>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    margin: ${props => props.ismessagefromlocaluser ? "0 .4rem 0 0" : "0 0 0 .4rem"};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    flex-direction: ${props => props.ismessagefromlocaluser ? "row-reverse" : "row"};

    .reply, .copy, .edit, .delete, .select, .time {
        position: relative;
        background-color: var(--normal-bg);
        margin: 0 .1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        width: 100%;
        height: 50%;
        cursor: pointer;
        padding: .5rem;
        transition: padding .2s;
        backdrop-filter: var(--normal-glass);
        -webkit-backdrop-filter: var(--normal-glass);

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            font-size: 1rem;
        }

        p {
            font-size: .7rem;
            position: absolute;
            right: .6rem;
            transform: scale(0);
            opacity: 0;
            transition: transform .2s, opacity .2s;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                p {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        }
    }

    .time {
        cursor: auto;
        padding: .5rem 2.5rem .5rem .5rem;
        border: none;

        p {
            transform: scale(1);
            opacity: 1;
            letter-spacing: 0px;
        }
    }

    .reply {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.6rem .5rem .5rem;
                transition: padding .3s;
            }
        }
    }

    .copy {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.4rem .5rem .5rem;
                transition: padding .3s;
            }
        }
    }

    .edit {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.1rem .5rem .5rem;
                transition: padding .3s;
            }
        }
    }

    .delete {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.9rem .5rem .5rem;
                transition: padding .3s;
            }
        }
    }

    .select {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.8rem .5rem .5rem;
                transition: padding .3s;
            }
        }
    }

    hr {
        display: none;
    }

    @media (max-width: 768px) {
        width: 6.5rem;
        flex-direction: column;
        justify-content: center;
        /* position: absolute; */
        /* left: ${props => props.ismessagefromlocaluser ? `${props.y}px` : "none"}; */
        /* left: ${props => props.ismessagefromlocaluser ? "none" : `${props.y}px`}; */
        margin: ${props => props.ismessagefromlocaluser ? "13rem 0 0 0" : "8rem 0 0 0"};
        z-index: 3;
        background-color: var(--normal-bg);
        border-radius: 15px;
        backdrop-filter: blur(20px) saturate(100%);
        -webkit-backdrop-filter: blur(20px) saturate(100%);
        overflow: hidden;

        hr {
            display: block;
            width: 100%;
            height: .1px;
            background-color: #ffffff30;
            border: none;
        }

        .reply, .copy, .edit, .delete, .select, .time {
            margin: .1rem 0;
            background-color: #ffffff00;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 6.5rem;
            height: 2rem;
            backdrop-filter: none;

            i {
                position: absolute;
                left: .6rem;
                margin: 0;
            }

            p {
                font-size: .8rem;
                right: none;
                left: 2.6rem;
                text-align: start;
                transform: scale(1);
                opacity: 1;
            }
        }
    }
`;

export default memo(MessageOptions);
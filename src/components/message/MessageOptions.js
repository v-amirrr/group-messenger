import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelect } from '../../hooks/useSelect';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from "react-icons/bi";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsVariants, optionLocalVariants, optionNonLocalVariants } from '../../config/varitans';

const MessageOptions = ({ clickEvent, show, message }) => {

    const { enterAsAGuest } = useSelector(store => store.userStore);

    const { openPopup, copyMessage, replyMessage, trashMessage } = useMessageOptions();
    const { selectMessage } = useSelect();

    const messageOptionsRef = useRef();

    return (
        <>
            <AnimatePresence>
                {show ?
                    <MessageOptionsContainer key={message.id} ref={messageOptionsRef} initial='hidden' animate='visible' exit='exit' variants={optionsVariants} ismessagefromlocaluser={message.isMessageFromLocalUser ? 1 : 0} x={clickEvent?.pageX} y={clickEvent?.pageY} guest={enterAsAGuest ? 1 : 0}>
                        <motion.div className='reply' onClick={() => replyMessage(message.id, message.message, message.messageUsername)} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                            <i><BsReplyFill /></i>
                            <p>Reply</p>
                        </motion.div>

                        <motion.div className='select' onClick={() => selectMessage(message)} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                            <i><BiSelectMultiple /></i>
                            <p>Select</p>
                        </motion.div>

                        <motion.div className='copy' onClick={() => copyMessage(message.message)} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                            <i><AiFillCopy /></i>
                            <p>Copy</p>
                        </motion.div>

                        {message.isMessageFromLocalUser ?
                        <>
                            <motion.div className='edit' onClick={() => openPopup("EDIT_POPUP", [message])} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                                <i><AiFillEdit /></i>
                                <p>Edit</p>
                            </motion.div>
                            <motion.div className='delete' onClick={() => trashMessage(message.id)} variants={message.isMessageFromLocalUser ? optionLocalVariants : optionNonLocalVariants}>
                                <i><AiFillDelete /></i>
                                <p>Delete</p>
                            </motion.div>
                        </>
                        : ""}
                    </MessageOptionsContainer>
                : ""}
            </AnimatePresence>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    margin: ${props => props.ismessagefromlocaluser ? "0 .4rem 0 0" : "0 0 0 .4rem"};
    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.ismessagefromlocaluser ? "row-reverse" : "row"};
    width: ${props => props.ismessagefromlocaluser ? "10rem" : ""};

    .reply, .copy, .edit, .delete, .select {
        position: relative;
        background-color: var(--message);
        margin: 0 .15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        width: 100%;
        height: 50%;
        cursor: pointer;
        padding: .5rem;
        box-shadow: var(--shadow-first);
        transition: padding .2s;

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
            transition: transform .3s, opacity .2s;
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

    @media (max-width: 768px) {
        width: 6.8rem;
        /* height: ${props => props.guest ? "3rem" : props.ismessagefromlocaluser ? "10rem" : "6rem"}; */
        flex-direction: column;
        justify-content: center;
        position: absolute;
        /* right: ${props => props.ismessagefromlocaluser ? `${props.x}px` : "none"}; */
        /* right: ${props => props.ismessagefromlocaluser ? "none" : `${props.y}px`}; */
        z-index: 99;
        background-color: transparent;
        margin: ${props => props.ismessagefromlocaluser ? "13rem 0 0 0" : "8rem 0 0 0"};

        .reply, .copy, .edit, .delete, .select {
            margin: .1rem 0;
            border-radius: 50px;
            background-color: var(--message);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 6rem;
            height: 2rem;
            backdrop-filter: blur(5px) saturate(100%);
            -webkit-backdrop-filter: blur(10px) saturate(100%);

            i {
                position: absolute;
                left: 1rem;
                margin: 0;
            }

            p {
                font-size: .8rem;
                right: none;
                left: 2.4rem;
                text-align: start;
                transform: scale(1);
                opacity: 1;
            }
        }
    }
`;

export default memo(MessageOptions);
import React, { memo, useRef } from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const menuMobileUserVariants = {
    hidden: { width: 0, height: 0 },
    visible: { width: "6.8rem", height: "9.6rem", transition: { duration: 0.6, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.3 } }
};

const menuMobileGuestVariants = {
    hidden: { width: 0, height: 0 },
    visible: { width: "6.8rem", height: "3rem", transition: { duration: 0.6, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 5, width: 0, height: 0, transition: { duration: 0.3 } }
};

const menuMobileVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 5, transition: { duration: 0.3 } }
};

const menuDesktopVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.1, staggerChildren: 0.05, when: "afterChildren" } }
};

const menuItemUserDesktopVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: { opacity: 1, x: [20, -20, 0], scale: 1, transition: { duration: 0.6, type: 'tween' } },
    exit: { opacity: 0, x: 80, transition: { duration: 0.5, type: 'tween' } }
};

const MessageOptions = ({ messageUsername, localUsername, isMessageFromLocalUser, messageId, messageText, clickEvent }) => {

    const messageOptionsRef = useRef();

    const { openPopup, copyMessage, replyMessage } = useMessageOptions();

    const { enterAsAGuest } = useSelector(store => store.userStore);

    let onMobile = document.documentElement.offsetWidth < 600;

    return (
        <>
            <MessageOptionsContainer key={messageId} ref={messageOptionsRef} initial='hidden' animate='visible' exit='exit' variants={onMobile ? enterAsAGuest ? menuMobileGuestVariants : isMessageFromLocalUser ? menuMobileUserVariants : menuMobileVariants : menuDesktopVariants} isMessageFromLocalUser={isMessageFromLocalUser ? 1 : 0} x={clickEvent?.pageX} y={clickEvent?.pageY} guest={enterAsAGuest ? 1 : 0}>
                {localUsername && !enterAsAGuest ? 
                <motion.div className='reply' onClick={() => replyMessage(messageId, messageText, messageUsername)} whileTap={{ scale: 0.8 }} variants={onMobile ? "" : menuItemUserDesktopVariants}>
                    <i><BsReplyFill /></i>
                    <p>Reply</p>
                </motion.div>
                : ""}

                <motion.div className='copy' onClick={() => copyMessage(messageText)} whileTap={{ scale: 0.8 }} variants={onMobile ? "" : menuItemUserDesktopVariants}>
                    <i><AiFillCopy /></i>
                    <p>Copy</p>
                </motion.div>

                {isMessageFromLocalUser && !enterAsAGuest ? 
                <>
                    <motion.div className='edit' onClick={() => openPopup("EDIT_POPUP", messageId)} whileTap={{ scale: 0.8 }} variants={onMobile ? "" : menuItemUserDesktopVariants}>
                        <i><AiFillEdit /></i>
                        <p>Edit</p>
                    </motion.div>
                    <motion.div className='delete' onClick={() => openPopup("DELETE_POPUP", messageId)} whileTap={{ scale: 0.8 }} variants={onMobile ? "" : menuItemUserDesktopVariants}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </motion.div>
                </>
                : ""}
            </MessageOptionsContainer>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    margin: ${props => props.isMessageFromLocalUser ? "0 .4rem 0 0" : "0 0 0 .4rem"};
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.isMessageFromLocalUser ? "row-reverse" : "row"};

    ::-webkit-scrollbar {
        height: 0;
    }

    .reply, .copy, .edit, .delete {
        position: relative;
        background-color: var(--message-options);
        margin: 0 .15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        width: 100%;
        height: 50%;
        cursor: pointer;
        padding: .5rem;
        transition: padding .6s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            font-size: 1rem;
        }

        p {
            font-size: .75rem;
            position: absolute;
            right: .6rem;
            transform: scale(0.5);
            opacity: 0;
            transition: transform .5s, opacity .3s;
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
                padding: .5rem 2.7rem .5rem .5rem;
            }
        }
    }

    .copy {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.7rem .5rem .5rem;
            }
        }
    }

    .edit {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 2.3rem .5rem .5rem;
            }
        }
    }

    .delete {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 3.2rem .5rem .5rem;
            }
        }
    }

    @media (max-width: 768px) {
        width: 6.8rem;
        height: ${props => props.guest ? "3rem" : props.isMessageFromLocalUser ? "9.6rem" : "5rem"};
        flex-direction: column;
        position: absolute;
        top: ${props => `${props.y-90}px`};
        left: ${props => props.x < 240 ? `${props.x-20}px` : "none"};
        right: ${props => props.x > 240 ? `${370-(props.x)}px` : "none"};
        z-index: 999;
        background-color: var(--options-mobile-background);
        backdrop-filter: blur(10px) saturate(100%);
        -webkit-backdrop-filter: blur(10px) saturate(100%);
        border-radius: 20px;
        overflow: ${props => props.isMessageFromLocalUser ? "scroll hidden" : ""};
        margin: 0;

        .reply, .copy, .edit, .delete {
            margin: .15rem 0;
            border-radius: 15px;
            background-color: var(--options-mobile-item);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 6rem;
            height: 2rem;

            i {
                position: absolute;
                left: .8rem;
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
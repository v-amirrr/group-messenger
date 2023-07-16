import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelect } from '../../hooks/useSelect';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from "react-icons/bi";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { menuMobileUserVariants, menuMobileGuestVariants, menuMobileVariants, menuMobileItemVariants, menuDesktopVariants, menuItemUserDesktopVariants, menuItemDesktopVariants } from '../../config/varitans';

const MessageOptions = ({ clickEvent, message }) => {

    const { isMessageFromLocalUser, messageText, id, messageUsername } = message;

    const messageOptionsRef = useRef();
    const { enterAsAGuest } = useSelector(store => store.userStore);

    const { openPopup, copyMessage, replyMessage } = useMessageOptions();
    const { selectMessage } = useSelect();

    let onMobile = document.documentElement.offsetWidth < 600;

    return (
        <>
            <MessageOptionsContainer key={id} ref={messageOptionsRef} initial='hidden' animate='visible' exit='exit' variants={onMobile ? enterAsAGuest ? menuMobileGuestVariants : isMessageFromLocalUser ? menuMobileUserVariants : menuMobileVariants : menuDesktopVariants} ismessagefromlocaluser={isMessageFromLocalUser ? 1 : 0} x={clickEvent?.pageX} y={clickEvent?.pageY} guest={enterAsAGuest ? 1 : 0}>
                {!enterAsAGuest ?
                <motion.div className='reply' onClick={() => replyMessage(id, messageText, messageUsername)} whileTap={{ scale: 0.8 }} variants={onMobile ? menuMobileItemVariants : isMessageFromLocalUser ? menuItemUserDesktopVariants : menuItemDesktopVariants}>
                    <i><BsReplyFill /></i>
                    <p>Reply</p>
                </motion.div>
                : ""}

                <motion.div className='select' onClick={() => selectMessage(message)} whileTap={{ scale: 0.8 }} variants={onMobile ? menuMobileItemVariants : isMessageFromLocalUser ? menuItemUserDesktopVariants : menuItemDesktopVariants}>
                    <i><BiSelectMultiple /></i>
                    <p>Select</p>
                </motion.div>

                <motion.div className='copy' onClick={() => copyMessage(message)} whileTap={{ scale: 0.8 }} variants={onMobile ? menuMobileItemVariants : isMessageFromLocalUser ? menuItemUserDesktopVariants : menuItemDesktopVariants}>
                    <i><AiFillCopy /></i>
                    <p>Copy</p>
                </motion.div>

                {isMessageFromLocalUser && !enterAsAGuest ?
                <>
                    <motion.div className='edit' onClick={() => openPopup("EDIT_POPUP", [message])} whileTap={{ scale: 0.8 }} variants={onMobile ? menuMobileItemVariants : isMessageFromLocalUser ? menuItemUserDesktopVariants : menuItemDesktopVariants}>
                        <i><AiFillEdit /></i>
                        <p>Edit</p>
                    </motion.div>
                    <motion.div className='delete' onClick={() => openPopup("DELETE_POPUP", [message])} whileTap={{ scale: 0.8 }} variants={onMobile ? menuMobileItemVariants : isMessageFromLocalUser ? menuItemUserDesktopVariants : menuItemDesktopVariants}>
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
    margin: ${props => props.ismessagefromlocaluser ? "0 .4rem 0 0" : "0 0 0 .4rem"};
    user-select: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.ismessagefromlocaluser ? "row-reverse" : "row"};
    width: ${props => props.ismessagefromlocaluser ? "10rem" : ""};

    ::-webkit-scrollbar {
        height: 0;
    }

    .reply, .copy, .edit, .delete, .select {
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
        transition: padding .4s;

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

    .select {
        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                padding: .5rem 3rem .5rem .5rem;
            }
        }
    }

    @media (max-width: 768px) {
        width: 6.8rem;
        height: ${props => props.guest ? "3rem" : props.ismessagefromlocaluser ? "9.4rem" : "5rem"};
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: ${props => `${props.y-90}px`};
        left: ${props => !props.ismessagefromlocaluser ? `${props.x-20}px` : "none"};
        right: ${props => props.ismessagefromlocaluser ? `${395-(props.x)}px` : "none"};
        z-index: 999;
        background-color: var(--options-mobile-background);
        backdrop-filter: blur(10px) saturate(100%);
        -webkit-backdrop-filter: blur(10px) saturate(100%);
        border-radius: 20px;
        overflow: hidden;
        margin: 0;

        .reply, .copy, .edit, .delete, .select {
            margin: .1rem 0;
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
import React, { useRef } from 'react';
import useMessageOptions from '../../hooks/useMessageOptions';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const menuMobileVariants = {
    hidden: { x: 50, scaleX: 0 },
    visible: { opacity: 1, x: 0, scaleX: 1, transition: { duration: 0.4, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, x: 50, scaleX: 0, transition: { duration: 0.4, staggerChildren: 0.05, when: "beforeChildren" } }
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

const menuItemUserMobileVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2, type: 'tween' } }
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: [-20, 20, 0], scale: 1, transition: { duration: 0.6, type: 'tween' } },
    exit: { opacity: 0, x: -80, transition: { duration: 0.5, type: 'tween' } }
};

const MessageOptions = ({ messageUsername, localUsername, id, message, username, isUser }) => {

    const messageOptionsRef = useRef();

    const { openPopup, copyMessage, replyMessage } = useMessageOptions();

    let size = document.documentElement.offsetWidth;

    return (
        <>
            <MessageOptionsContainer key={id} ref={messageOptionsRef} initial='hidden' animate='visible' exit='exit' variants={size < 500 && messageUsername == localUsername ? menuMobileVariants : menuDesktopVariants} isuser={isUser ? 1 : 0}>
                {localUsername ? 
                <motion.div className='reply' onClick={() => replyMessage(id, message, username)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                    <i><BsReplyFill /></i>
                </motion.div>
                : ""}

                <motion.div className='copy' onClick={() => copyMessage(message)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                    <i><AiFillCopy /></i>
                </motion.div>

                {isUser ? 
                <>
                    <motion.div className='edit' onClick={() => openPopup("EDIT_POPUP", id)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                        <i><AiFillEdit /></i>
                    </motion.div>
                    <motion.div className='delete' onClick={() => openPopup("DELETE_POPUP", id)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                        <i><AiFillDelete /></i>
                    </motion.div>
                </>
                : ""}
            </MessageOptionsContainer>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    margin: ${props => props.isuser ? "0 .4rem 0 0" : "0 0 0 .4rem"};
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.isuser ? "row-reverse" : "row"};

    ::-webkit-scrollbar {
        height: 0;
    }

    .reply, .copy, .edit, .delete {
        background-color: #ffffff11;
        margin: 0 .15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 100%;
        height: 50%;
        cursor: pointer;
        padding: .5rem;
        transition: background .4s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ffffff22;
            }
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            font-size: 1rem;
        }
    }

    @media (max-width: 768px) {
        left: ${props => props.isuser ? "-5.2rem" : "auto"};
        width: ${props => props.isuser ? "5rem" : ""};
        background-color: ${props => props.isuser ? "#000000aa" : ""};
        border-radius: 50px;
        padding: .2rem .05rem;
        overflow: ${props => props.isuser ? "scroll hidden" : ""};
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .reply, .copy, .edit, .delete {
            padding: .35rem;
            background-color: #ffffff15;
        }
    }
`;

export default MessageOptions;
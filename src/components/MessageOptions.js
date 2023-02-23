import React, { useRef } from 'react';
import useMessageOptions from '../hooks/useMessageOptions';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const menuMobileVariants = {
    hidden: { x: 60, scaleX: 0 },
    visible: { opacity: 1, x: 0, scaleX: 1, transition: { duration: 0.4, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, x: 60, scaleX: 0, transition: { duration: 0.4, staggerChildren: 0.05, when: "beforeChildren" } }
};

const menuDesktopVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.1, staggerChildren: 0.05, when: "afterChildren" } }
};

const menuItemUserDesktopVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: [20, -20, 0], transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2, type: 'tween' } }
};

const menuItemUserMobileVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2, type: 'tween' } }
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: [-20, 20, 0], transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, type: 'tween' } }
};

const MessageOptions = ({ messageUsername, localUsername, id, message, username }) => {

    const messageOptionsRef = useRef();

    const { deleteMessage, copyMessage, editMessage, replyMessage } = useMessageOptions();

    let size = document.documentElement.offsetWidth;
    let dragging = false;
    let startX;
    let scrollLeft;

    // messageOptionsRef?.current?.scrollIntoView({
    //     behavior: "smooth", block: "start", inline: "start"
    // });

    const startDragging = e => {
        dragging = true;
        startX = e.pageX - messageOptionsRef.current.offsetLeft;
        scrollLeft = messageOptionsRef.current.scrollLeft;
    };

    const scrollDragHandler = e => {
        if (size < 500 && dragging && messageUsername == localUsername) {
            const x = e.pageX - messageOptionsRef.current.offsetLeft;
            const walk = (x - startX) * 3;
            messageOptionsRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <>
            <MessageOptionsContainer key={id} onMouseMove={e => scrollDragHandler(e)} onMouseDown={(e) => startDragging(e)} onMouseUp={() => dragging = false} ref={messageOptionsRef} initial='hidden' animate='visible' exit='exit' variants={size < 500 && messageUsername == localUsername ? menuMobileVariants : menuDesktopVariants} isuser={messageUsername == localUsername ? 1 : 0} mobile={size < 500 ? 1 : 0}>
                <motion.div className='reply' onClick={() => replyMessage(id, message, username)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                    <i><BsReplyFill /></i>
                </motion.div>
                <motion.div className='copy' onClick={() => copyMessage(message)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                    <i><AiFillCopy /></i>
                </motion.div>
                <motion.div className='edit' onClick={() => editMessage(id, 1)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                    <i><AiFillEdit /></i>
                </motion.div>
                <motion.div className='delete' onClick={() => deleteMessage(id, 1)} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? size < 500 ? menuItemUserMobileVariants : menuItemUserDesktopVariants : menuItemVariants}>
                    <i><AiFillDelete /></i>
                </motion.div>
                <span></span>
            </MessageOptionsContainer>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    position: absolute;
    left: ${props => props.isuser ? "-9.5rem" : "auto"};
    right: ${props => props.isuser ? "auto" : "-5rem"};
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.isuser ? "row-reverse" : "row"};

    /* width */
    ::-webkit-scrollbar {
        height: 0;
    }

    div {
        background-color: #ffffff10;
        margin: 0 .15rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 100%;
        height: 50%;
        cursor: pointer;
        padding: .5rem;
        transition: background .3s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ffffff30;
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

    .delete, .edit {
        display: ${props => props.isuser ? "" : "none"};
    }

    @media (max-width: 768px) {
        left: ${props => props.isuser ? "-6.2rem" : "auto"};
        width: ${props => props.isuser ? "5.6rem" : ""};
        background-color: ${props => props.isuser ? "#000000aa" : ""};
        border-radius: 50px;
        padding: .2rem .05rem .2rem .5rem;
        overflow: ${props => props.isuser ? "scroll hidden" : ""};
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        span {
            background-image: ${props => props.isuser ? "linear-gradient(to left, transparent, #000000)" : ""};
            width: 5.6rem;
            height: 100%;
            position: fixed;
            top: 0;
            border-radius: 50px;
        }

        div {
            padding: .35rem;
            background-color: #ffffff15;
        }
    }
`;

export default MessageOptions;
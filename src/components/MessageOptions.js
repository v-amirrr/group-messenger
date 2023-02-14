import React from 'react';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.08, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, staggerChildren: 0.05, when: "afterChidren" } }
};

const menuItemUserVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: { opacity: 1, x: [20, -10, 0], scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, x: 20, scale: 0.5, transition: { duration: 0.3, type: 'tween' } }
};

const menuItemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: [-20, 10, 0], scale: 1, transition: { duration: 0.3, type: 'tween' } },
    exit: { opacity: 0, x: -20, scale: 1, transition: { duration: 0.2 , type: 'tween' } }
};

const MessageOptions = ({ messageUsername, localUsername, id, message, setShowPopup }) => {

    const deleteMessage = () => {
        setShowPopup({ show: true, type: 1 });
    };

    const copyMessage = () => {
        let messageText = [];

        message.map(item => {
            messageText.push(item.word);
        });

        messageText = messageText.join(" ");

        navigator.clipboard.writeText(messageText);
    };

    const editMessage = () => {
        setShowPopup({ show: true, type: 2 });
    };

    return (
        <>
            <MessageOptionsContainer isuser={messageUsername == localUsername ? 1 : 0} key={id} initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                <motion.div className='copy' onClick={() => copyMessage()} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? menuItemUserVariants : menuItemVariants}>
                    <i><AiFillCopy /></i>
                </motion.div>

                <motion.div className='edit' onClick={() => editMessage()} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? menuItemUserVariants : menuItemVariants}>
                    <i><AiFillEdit /></i>
                </motion.div>

                <motion.div className='delete' onClick={() => deleteMessage()} whileTap={{ scale: 0.8 }} variants={messageUsername == localUsername ? menuItemUserVariants : menuItemVariants}>
                    <i><AiFillDelete /></i>
                </motion.div>
            </MessageOptionsContainer>
        </>
    );
};

const MessageOptionsContainer = styled(motion.div)`
    position: absolute;
    left: ${props => props.isuser ? "-7.4rem" : "auto"};
    right: ${props => props.isuser ? "auto" : "-2.7rem"};
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
    
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
        left: ${props => props.isuser ? "-4.8rem" : "auto"};
        right: ${props => props.isuser ? "auto" : "-1.6rem"};

        div {
            margin: 0 .08rem;
            padding: .35rem;
            background-color: #ffffff15;

            i {
                font-size: .7rem;
            }
        }
    }
`;

export default MessageOptions;
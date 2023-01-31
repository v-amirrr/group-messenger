import React, { forwardRef, useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { isRTL } from '../functions/isRlt';

import DeleteConfirmationPopup from './DeleteConfirmationPopup';

import { AiFillDelete, AiFillCopy } from 'react-icons/ai';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const menuUserVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 20 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, scale: 0.9, x: 20, transition: { duration: 0.2, type: 'tween' } }
};

const menuVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -20 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, scale: 0.9, x: -20, transition: { duration: 0.2, type: 'tween' } }
};

const Message = forwardRef(( props, ref ) => {

    const localStorageUsername = JSON.parse(localStorage.getItem("username"));

    const { message, id, username, messageLength, periorUsername, nextUsername } = props.message;

    const [menuShow, setMenuShow] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [messageStyle, setMessageStyle] = useState("");

    const deleteMessage = () => {
        setDeletePopup(true);
    };

    const copyMessage = () => {
        let messageText = [];

        message.map(item => {
            messageText.push(item.word);
        });

        messageText = messageText.join(" ");

        navigator.clipboard.writeText(messageText);
    };

    useEffect(() => {
        if (periorUsername == username && nextUsername == username) {
            setMessageStyle(2);
        } else if (periorUsername != username && nextUsername != username) {
            setMessageStyle(0);
        } else if (periorUsername != username && nextUsername == username) {
            setMessageStyle(1);
        } else if (periorUsername == username && nextUsername != username) {
            setMessageStyle(3);
        }
    }, [periorUsername, nextUsername]);

    return (
        <>
            <MessageBox 
                key={id} 
                ref={ref} 
                isuser={username == localStorageUsername ? 1 : 0} 
                ispersian={isRTL(message) ? 1 : 0} 
                messagelength={messageLength} 
                messageStyle={messageStyle} 
                onClick={() => setMenuShow(prevState => !prevState)}
            >
                <p className='username'>{username}</p>
                <p className='message'>
                    {message?.map(item => (
                        item.link ? <a className='link' href={item.word} target="_blank">{item.word}</a> : `${item.word} `
                    ))}
                </p>

                <AnimatePresence>
                    {menuShow &&
                    <Menu isuser={username == localStorageUsername ? 1 : 0} key={id} initial='hidden' animate='visible' exit='exit' variants={username == localStorageUsername ? menuUserVariants : menuVariants}>
                        <motion.div className='copy' onClick={() => copyMessage()} whileTap={{ scale: 0.8 }}>
                            <i><AiFillCopy /></i>
                        </motion.div>

                        <motion.div className='delete' onClick={() => deleteMessage()} whileTap={{ scale: 0.8 }}>
                            <i><AiFillDelete /></i>
                        </motion.div>
                    </Menu>}
                </AnimatePresence>
            </MessageBox>

            {createPortal(
                <AnimatePresence exitBeforeEnter>
                    {deletePopup && <DeleteConfirmationPopup setDeletePopup={setDeletePopup} deletePopup={deletePopup} id={id} />}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
});

const MessageBox = styled(motion.div)`
    display: flex;
    align-items: center;
    background-color: ${props => props.isuser ? "#ffffff0c" : "#ffffff0e"};
    margin: ${props => 
        props.messageStyle == 0 ? 
        ".4rem 0" : 
        props.messageStyle == 1 ? 
        ".4rem 0 .1rem 0" : 
        props.messageStyle == 2 ? 
        ".1rem 0" : 
        props.messageStyle == 3 && 
        ".1rem 0 .4rem 0"
    };
    margin-left: ${props => props.isuser && "auto"};
    padding: .5rem 1rem;
    border-radius: ${props => 
        props.isuser ? 
            props.messageStyle == 0 ? 
                "30px" : 
                props.messageStyle == 1 ? 
                "30px 30px 10px 30px" : 
                props.messageStyle == 2 ? 
                "30px 10px 10px 30px" : 
                props.messageStyle == 3 && 
                "30px 10px 30px 30px" :
            props.messageStyle == 0 ? 
                "30px" : 
                props.messageStyle == 1 ? 
                "30px 30px 30px 10px" : 
                props.messageStyle == 2 ? 
                "10px 30px 30px 10px" : 
                props.messageStyle == 3 && 
                "10px 30px 30px 30px"
    };
    width: fit-content;
    max-width: 65%;
    backdrop-filter: blur(5px) saturate(100%);
    -webkit-backdrop-filter: blur(5px) saturate(100%);
    font-weight: 200;
    word-break: break-all;
    cursor: pointer;
    transition: backdrop-filter .4s, border-radius .4s;
    user-select: none;

    .username {
        display: ${props => props.isuser ? "none" : ""};
        color: #aaa;
        font-size: .7rem;
        margin-right: .5rem;
        margin-left: -.2rem;
        white-space: nowrap;
    }

    .message {
        text-align: ${props => props.ispersian ? "right" : "left"};
        word-spacing: 1px;
        line-break: loose;
        word-break: keep-all;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        padding: .5rem .8rem;
        margin-top: .3rem;
        margin-bottom: .3rem;
        /* border-radius: ${props => props.messagelength > 40 || props.messagelength < 20 ? "20px" : "50px"}; */
        max-width: 80%;

        .username {
            font-size: .5rem;
            margin-right: .4rem;
        }

        .message {
            font-size: .8rem;
        }
    }
`;

const Menu = styled(motion.div)`
    position: absolute;
    left: ${props => props.isuser ? "-5rem" : "auto"};
    right: ${props => props.isuser ? "auto" : "-2.7rem"};
    z-index: 0;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    
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
        transition: background .2s;

        &:hover {
            background-color: #ffffff20;
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            font-size: 1rem;
        }
    }

    .delete {
        display: ${props => props.isuser ? "" : "none"};
    }

    @media (max-width: 768px) {
        left: ${props => props.isuser ? "-4.2rem" : "auto"};
        right: ${props => props.isuser ? "auto" : "-2.2rem"};

        div {
            margin: 0 .1rem;
            padding: .45rem;

            i {
                font-size: .9rem;
            }
        }
    }
`;

export default Message;
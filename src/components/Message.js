import React, { forwardRef, useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { isRTL } from '../functions/isRlt';

import Popups from './Popups';

import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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

const timeVariants = {
    hidden: { opacity: 0, x: 20, y: 20, scale: 0 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.4, type: 'tween' } }
};

const Message = forwardRef(( props, ref ) => {

    const localStorageUsername = JSON.parse(localStorage.getItem("username"));

    const { message, id, username, periorUsername, nextUsername, time } = props.message;

    const [menuShow, setMenuShow] = useState(false);
    const [showPopup, setShowPopup] = useState({ show: false, type: 0 });
    const [messageStyle, setMessageStyle] = useState("");

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

    let total_miliseconds, messageTime;

    if (time) {
        total_miliseconds = (time.seconds+(time.nanoseconds)*0.00000001)*1000;
        messageTime = new Date(total_miliseconds);
    }

    return (
        <>
            <MessageBox 
                key={id} 
                ref={ref} 
                isuser={username == localStorageUsername ? 1 : 0} 
                ispersian={isRTL(message) ? 1 : 0} 
                messageStyle={messageStyle} 
                onClick={() => setMenuShow(prevState => !prevState)}
            >
                <p className='username'>{username}</p>
                <p className='message'>
                    {message?.map((item, index) => (
                        item.link ? <a key={index} className='link' href={item.word} target="_blank">{item.word}</a> : `${item.word} `
                    ))}
                </p>

                <AnimatePresence>
                    {time &&
                    <motion.span className='time' initial='hidden' animate='visible' exit='exit' variants={timeVariants}>
                        {messageTime.getHours() < 10 ? `0${messageTime.getHours()}` : messageTime.getHours()}:{messageTime.getMinutes() < 10 ? `0${messageTime.getMinutes()}` : messageTime.getMinutes()}
                    </motion.span>}
                </AnimatePresence>

                <AnimatePresence>
                    {menuShow &&
                    <Menu isuser={username == localStorageUsername ? 1 : 0} key={id} initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                        <motion.div className='copy' onClick={() => copyMessage()} whileTap={{ scale: 0.8 }} variants={username == localStorageUsername ? menuItemUserVariants : menuItemVariants}>
                            <i><AiFillCopy /></i>
                        </motion.div>

                        <motion.div className='edit' onClick={() => editMessage()} whileTap={{ scale: 0.8 }} variants={username == localStorageUsername ? menuItemUserVariants : menuItemVariants}>
                            <i><AiFillEdit /></i>
                        </motion.div>

                        <motion.div className='delete' onClick={() => deleteMessage()} whileTap={{ scale: 0.8 }} variants={username == localStorageUsername ? menuItemUserVariants : menuItemVariants}>
                            <i><AiFillDelete /></i>
                        </motion.div>
                    </Menu>}
                </AnimatePresence>
            </MessageBox>

            {createPortal(
                <AnimatePresence exitBeforeEnter>
                    {showPopup.show && 
                    <Popups 
                        setShowPopup={setShowPopup}
                        id={id}
                        message={message}
                        type={showPopup.type}
                    />}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
});

const MessageBox = styled.div`
    display: flex;
    align-items: center;
    background-color: #ffffff0c;
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
    padding: .5rem 2.8rem .5rem 1rem;
    border-radius: ${props => 
        props.isuser ? 
            props.messageStyle == 0 ? 
            "30px" : 
            props.messageStyle == 1 ? 
            "30px 30px 5px 30px" : 
            props.messageStyle == 2 ? 
            "30px 5px 5px 30px" : 
            props.messageStyle == 3 && 
            "30px 5px 30px 30px" :
        props.messageStyle == 0 ? 
            "30px" : 
            props.messageStyle == 1 ? 
            "30px 30px 30px 5px" : 
            props.messageStyle == 2 ? 
            "5px 30px 30px 5px" : 
            props.messageStyle == 3 && 
            "5px 30px 30px 30px"
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

    .time {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: .55rem;
        font-weight: 300;
        letter-spacing: .5px;
        color: #ffffff55;
        white-space: nowrap;
        margin: .4rem .8rem;
    }

    @media (max-width: 768px) {
        padding: .5rem 2.5rem .5rem .8rem;
        max-width: 70%;
        background-color: #ffffff17;
        border-radius: ${props => 
            props.isuser ? 
                props.messageStyle == 0 ? 
                "20px" : 
                props.messageStyle == 1 ? 
                "20px 20px 5px 20px" : 
                props.messageStyle == 2 ? 
                "20px 5px 5px 20px" : 
                props.messageStyle == 3 && 
                "20px 5px 20px 20px" :
            props.messageStyle == 0 ? 
                "20px" : 
                props.messageStyle == 1 ? 
                "20px 20px 20px 5px" : 
                props.messageStyle == 2 ? 
                "5px 20px 20px 5px" : 
                props.messageStyle == 3 && 
                "5px 20px 20px 20px"
        };

        .username {
            font-size: .5rem;
            margin-right: .4rem;
        }

        .message {
            font-size: .8rem;
        }

        .time {
            font-size: .45rem;
        }
    }
`;

const Menu = styled(motion.div)`
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
        left: ${props => props.isuser ? "-6rem" : "auto"};
        right: ${props => props.isuser ? "auto" : "-2rem"};

        div {
            margin: 0 .1rem;
            padding: .45rem;
            background-color: #ffffff15;

            i {
                font-size: .9rem;
            }
        }
    }
`;

export default Message;
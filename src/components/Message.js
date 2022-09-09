import React, { forwardRef, useState } from 'react';

import { db } from '../config/firebase';
import { doc, deleteDoc } from "firebase/firestore";

import { isRTL } from '../functions/isRlt';

import { AiFillDelete } from 'react-icons/ai';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, scale: 0.6, transition: { duration: 0.2, type: 'tween' } }
};

const Message = forwardRef(( props, ref ) => {

    const localStorageUsername = JSON.parse(localStorage.getItem("username"));

    const { message, id, username } = props;

    const [menuShow, setMenuShow] = useState(false);

    const deleteMessage = id => {
        const docRef = doc(db, "messages", id);
        deleteDoc(docRef);
    };

    return (
        <>
            <MessageBox ref={ref} key={id} isUser={username == localStorageUsername} isPersian={isRTL(message)} onClick={() => setMenuShow(prevState => !prevState)}>
                <p className='username'>{username}</p>
                <p className='message'>{message}</p>

                <AnimatePresence>
                    {
                        menuShow
                        &&
                        username == localStorageUsername
                        &&
                        <Menu whileHover={{ sclae: 1.5 }} whileTap={{ scale: 0.8 }} isUser={username == localStorageUsername} key={id} initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                            <div onClick={() => deleteMessage(id)}>
                                <i><AiFillDelete /></i>
                            </div>
                        </Menu>
                    }
                </AnimatePresence>
            </MessageBox>
        </>
    );
});

const MessageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: ${props => props.isUser ? "#ffffff0c" : "#ffffff0e"};
    margin: .2rem 0;
    margin-left: ${props => props.isUser && "auto"};
    padding: .5rem .8rem;
    border-radius: 20px;
    width: fit-content;
    max-width: 80%;
    backdrop-filter: blur(20px) saturate(120%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    font-weight: 200;
    word-break: break-all;
    cursor: ${props => props.isUser && "pointer"};
    transition: backdrop-filter .4s;
    user-select: ${props => props.isUser && "none"};

    .username {
        display: ${props => props.isUser ? "none" : ""};
        color: #aaa;
        font-size: .8rem;
        margin-right: .5rem;
        white-space: nowrap;
    }

    .message {
        text-align: ${props => props.isPersian ? "right" : "left"};
        word-spacing: 1px;
        letter-spacing: -.5px;
        line-break: loose;
        word-break: keep-all;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        padding: .5rem;

        .username {
            font-size: .5rem;
            margin-right: .4rem;
        }

        .message {
            font-size: .7rem;
        }
    }
`;

const Menu = styled(motion.div)`
    position: absolute;
    left: ${props => props.isUser && "-2.5rem"};
    right: ${props => props.isUser || "-2.5rem"};
    background-color: #ffffff10;
    border-radius: 20px;
    overflow: hidden;
    z-index: 0;
    user-select: none;
    backdrop-filter: blur(50px) saturate(150%);
    -webkit-backdrop-filter: blur(50px) saturate(150%);
    
    hr {
        opacity: 0.2;
    }
    
    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        width: 100%;
        height: 50%;
        cursor: pointer;
        padding: .5rem;
        transition: background .4s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            font-size: 1rem;
        }
    }

    @media (max-width: 768px) {
        div {
            i {
                font-size: .8rem;
            }
        }
    }
`;

export default Message;
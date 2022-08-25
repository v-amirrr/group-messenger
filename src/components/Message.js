import React, { forwardRef, useState } from 'react';

import { db } from '../config/firebase';
import { doc, deleteDoc } from "firebase/firestore";

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

    const isRTL = (text) => {           
        let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
            rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
            rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');
        return rtlDirCheck.test(text);
    };

    const deleteMessage = id => {
        const docRef = doc(db, "messages", id);
        deleteDoc(docRef);
    };

    return (
        <>
            <MessageBox ref={ref} key={id} isUser={username == localStorageUsername} isPersian={isRTL(message)} onClick={() => setMenuShow(prevState => !prevState)}>
                <p className='username' dir="auto">{username}</p>
                <p className='message'>{message}</p>

                <AnimatePresence>
                    {
                        menuShow
                        &&
                        username == localStorageUsername
                        &&
                        <Menu isUser={username == localStorageUsername} key={id} initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
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
    background-color: ${props => props.isUser ? "#ffffff10" : "#ffffff15"};
    margin: .4rem 0;
    margin-left: ${props => props.isUser && "auto"};
    padding: .5rem .8rem; 
    border-radius: 20px;
    width: fit-content;
    max-width: 80%;
    backdrop-filter: blur(50px) saturate(150%);
    -webkit-backdrop-filter: blur(50px) saturate(150%);
    font-weight: 200;
    word-break: break-all;
    cursor: ${props => props.isUser && "pointer"};

    .username {
        display: ${props => props.isUser ? "none" : ""};
        color: #aaa;
        font-size: .8rem;
        margin-right: .5rem;
        word-break: break-all;
    }

    .message {
        text-align: ${props => props.isPersian ? "right" : "left"};
        word-spacing: 1px;
        letter-spacing: -.5px;
        word-break: break-all;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    }
`;

const Menu = styled(motion.div)`
    position: absolute;
    left: ${props => props.isUser && "-2.5rem"};
    right: ${props => props.isUser || "-2.5rem"};
    background-color: #ffffff22;
    border-radius: 20px;
    overflow: hidden;
    z-index: 0;
    user-select: none;

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

        &:active {
            background-color: #ffffff22;
        }
    }
`;

export default Message;
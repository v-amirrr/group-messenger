import React, { useState, useEffect } from 'react';

import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { isRTL } from '../functions/isRlt';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, type: 'tween', when: "afterChildren" } }
};

const popupPageContainer = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, type: 'tween' } }
};

const Popups = ({ type, setShowPopup, message, id }) => {

    const [editInput, setEditInput] = useState("");

    useEffect(() => {
        if (type == 2) {
            let messageText = [];
    
            message.map(item => {
                messageText.push(item.word);
            });
    
            setEditInput(messageText.join(" "));
        }
    }, []);

    const deleteMessage = () => {
        const docRef = doc(db, "messages", id);
        deleteDoc(docRef);
        setShowPopup({ show: false, type: 0 });
    };

    const editMessage = () => {
        const docRef = doc(db, "messages", id);
        updateDoc(docRef, {
            message: editInput,
        });
        setShowPopup({ show: false, type: 0 });
    };

    return (
        <>
            <PopupPage initial='hidden' animate='visible' exit='exit' variants={popupPageVariants}>
                <PopupContainer 
                    variants={popupPageContainer} 
                    ispersian={isRTL(editInput) ? 1 : 0} 
                    dir={isRTL(editInput) ? "rtl" : "ltr"}
                >
                    {type == 1 &&  
                    <>
                        <p>Are you sure that you want to delete this message?</p>
                        <div>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowPopup({ show: false, type: 0 })}>Cancel</motion.button>
                            <motion.button className='delete' whileTap={{ scale: 0.9 }} onClick={deleteMessage}>Delete it</motion.button>
                        </div>
                    </>}

                    {type == 2 &&
                    <>
                        <textarea value={editInput} onChange={e => setEditInput(e.target.value)} autoFocus/>
                        <div>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowPopup({ show: false, type: 0 })}>Cancel</motion.button>
                            <motion.button className='edit' whileTap={{ scale: 0.9 }} onClick={editMessage}>Edit it</motion.button>
                        </div>
                    </>}
                </PopupContainer>
            </PopupPage>
        </>
    );
};

const PopupPage = styled(motion.section)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000088;
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);
    z-index: 999;
`;

const PopupContainer = styled(motion.div)`
    padding: 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff0a;
    border-radius: 25px;

    textarea {
        border: none;
        background-color: #ffffff00;
        font-size: 1rem;
        font-weight: 200;
        line-height: 1.5;
        resize: none;
        width: 25rem;
        height: 5rem;
        text-align: ${props => props.ispersian ? "right" : "left"};
        word-spacing: 1px;
        line-break: loose;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    }

    div {
        margin-top: 2rem;

        button {
            border: none;
            border-radius: 10px;
            background-color: #ffffff11;
            margin: 0 .2rem;
            padding: .5rem 1rem;
            font-size: 1rem;
            font-weight: 900;
            font-family: "Outfit", sans-serif;
            cursor: pointer;
            user-select: none;
            transition: background-color .2s;
            color: #fff;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #ffffff33;
                }
            }
        }

        .edit, .delete {
            color: #ff0000;
        }
    }
    
    @media (max-width: 768px) {
        padding: 1.5rem;

        textarea {
            font-size: .8rem;
            width: 15rem;
        }

        p {
            font-size: .8rem;
        }

        div {
            margin-top: 1.5rem;

            button {
                font-size: .8rem;
            }
        }
    }
`;

export default Popups;
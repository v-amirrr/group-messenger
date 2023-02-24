import React, { useState, useEffect, useRef } from 'react';
import { isRTL } from '../functions/isRlt';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useMessageOptions from '../hooks/useMessageOptions';

const popupPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren" } }
};

const popupPageContainer = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const Popups = ({ type, message, id }) => {

    const popupPage = useRef();
    const [editInput, setEditInput] = useState("");

    const { deleteMessage, editMessage, closePopup } = useMessageOptions();

    const closePopupByTap = e => {
        if (!popupPage.current.contains(e.target)) {
            closePopup();
        }
    };

    const pressEnter = e => {
        if (e.key == "Enter") {
            if (type == 1) {
                deleteMessage(id, 2);
            } else if (type == 2) {
                editMessage(id, 2, editInput);
            }
        }
    };

    useEffect(() => {
        if (type == 2) {
            let messageText = [];
            message.map(item => {
                messageText.push(item.word);
            });
            setEditInput(messageText.join(" "));
        }
    }, []);

    return (
        <>
            <PopupPage initial='hidden' animate='visible' exit='exit' variants={popupPageVariants} onClick={e => closePopupByTap(e)}>
                <PopupContainer 
                    variants={popupPageContainer}
                    ispersian={isRTL(editInput) ? 1 : 0}
                    dir={isRTL(editInput) ? "rtl" : "ltr"}
                    ref={popupPage}
                    onKeyUp={e => pressEnter(e)}
                >
                    {type == 1 &&  
                    <>
                        <p>Are you sure that you want to delete this message?</p>
                        <div>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={closePopup}>Cancel</motion.button>
                            <motion.button className='delete' whileTap={{ scale: 0.9 }} onClick={() => deleteMessage(id, 2)} autoFocus>Delete it</motion.button>
                        </div>
                    </>}

                    {type == 2 &&
                    <>
                        <textarea value={editInput} onChange={e => setEditInput(e.target.value)} autoFocus={document.documentElement.offsetWidth > 500}/>
                        <div>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={closePopup}>Cancel</motion.button>
                            <motion.button className='edit' whileTap={{ scale: 0.9 }} onClick={() => editMessage(id, 2, editInput)}>Edit it</motion.button>
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
    z-index: 9;
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
            font-weight: 700;
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

        .delete {
            color: #ff0000;
        }

        .edit {
            color: #00ff00;
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
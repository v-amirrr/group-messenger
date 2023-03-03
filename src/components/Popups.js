import React, { useState, useEffect, useRef } from 'react';
import EditReply from './EditReply';
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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const Popups = ({ popupMessageId, popupMessageText, popupName, popupMessageReplyTo }) => {

    const popupPage = useRef();
    const [editInput, setEditInput] = useState("");
    const [editReplyOpen, setEditReplyOpen] = useState(false);

    const { deleteMessage, editMessage, closePopup } = useMessageOptions();

    const closePopupByTap = e => {
        if (!popupPage.current.contains(e.target)) {
            closePopup();
        }
    };

    const pressEnter = e => {
        if (e.key == "Enter") {
            if (popupName == "DELETE_POPUP") {
                deleteMessage(popupMessageId);
            } else if (popupName == "EDIT_POPUP" && !e.shiftKey) {
                e.preventDefault();
                editMessage(popupMessageId, editInput, popupMessageReplyTo);
            }
        }
    };

    useEffect(() => {
        if (popupName == "EDIT_POPUP") {
            let messageText = [];
            popupMessageText.map(item => {
                messageText.push(item.word);
            });
            setEditInput(messageText.join(" "));
        }
    }, []);

    return (
        <>
            <PopupPage initial='hidden' animate='visible' exit='exit' variants={popupPageVariants} onClick={(e) => closePopupByTap(e)}>
                <PopupContainer 
                    variants={popupPageContainer}
                    onKeyDown={e => pressEnter(e)}
                    ref={popupPage}
                    dir={isRTL(editInput) ? "rtl" : "ltr"}
                    ispersian={isRTL(editInput) ? 1 : 0}
                    editreplyopen={editReplyOpen ? 1 : 0}
                >
                    {popupName == "DELETE_POPUP" ? 
                    <>
                        <p>Are you sure that you want to delete this message?</p>
                        <div className='buttons'>
                            <motion.button className='cancel' whileTap={{ scale: 0.9 }} onClick={closePopup}>Cancel</motion.button>
                            <motion.button className='delete' whileTap={{ scale: 0.9 }} onClick={() => deleteMessage(popupMessageId)} autoFocus>Delete it</motion.button>
                        </div>
                    </> : ""}

                    {popupName == "EDIT_POPUP" ?
                    <>
                        <textarea value={editInput} onChange={e => setEditInput(e.target.value)} autoFocus={document.documentElement.offsetWidth > 500} />
                        <div className='buttons'>
                            <motion.button className='cancel' whileTap={{ scale: 0.9 }} onClick={closePopup}>
                                Cancel
                            </motion.button>
                            <motion.button className='edit' whileTap={{ scale: 0.9 }} onClick={() => editMessage(popupMessageId, editInput, popupMessageReplyTo)}>
                                Edit
                            </motion.button>
                        </div>
                        <EditReply replyTo={popupMessageReplyTo} popupMessageId={popupMessageId} editReplyOpen={editReplyOpen} setEditReplyOpen={setEditReplyOpen} />
                    </> : ""}
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
    padding: ${props => props.editreplyopen ? "8rem 2rem" : "2rem"};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff0a;
    border-radius: 25px;
    position: relative;
    overflow: hidden;
    transition: padding 1s cubic-bezier(.53,0,0,.98);

    p {
        font-weight: 200;
    }

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

    .buttons {
        margin-top: 2rem;

        .edit, .delete, .cancel {
            border: none;
            border-radius: 10px;
            background-color: #ffffff11;
            margin: 0 .2rem;
            padding: .5rem 1rem;
            font-size: 1rem;
            font-weight: 600;
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
        padding: ${props => props.editreplyopen ? "8rem 1.5rem" : "1.5rem"};

        textarea {
            font-size: .8rem;
            width: 15rem;
        }

        p {
            font-size: .8rem;
        }

        .buttons {
            margin-top: 1.5rem;

            button {
                font-size: .8rem;
            }
        }
    }
`;

export default Popups;
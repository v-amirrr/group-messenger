import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useNotification } from '../../hooks/useNotification';
import { useSelect } from '../../hooks/useSelect';
import { isPersian } from '../../functions/isPersian';
import Message from '../message/Message';
import Counter from '../common/Counter';
import { TiArrowLeft } from 'react-icons/ti';
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion';
import { BsCheckAll } from 'react-icons/bs';
import styled from 'styled-components';
import { trashPageVariants, trashSelectBarVariants, trashSelectBarSwitchIconVariants } from '../../config/varitans';

const TrashPage = () => {
    const navigate = useNavigate();
    const { deletedMessages } = useSelector(store => store.firestoreStore);
    const { selectedMessages, selectOthersMessage } = useSelector(store => store.appStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openPopup } = useMessageOptions();
    const { openNotification } = useNotification();
    const { switchSelectAllTrash, restoreSelectedMessages, clearSelectedMessages } = useSelect();
    const [messages, setMessages] = useState(deletedMessages?.filter(item => item?.uid == user?.uid));

    useEffect(() => {
        setMessages(deletedMessages?.filter(item => item?.uid == user?.uid));
    }, [deletedMessages]);

    return (
        <>
            <TrashPageContainer initial='hidden' animate='visible' exit='exit' variants={trashPageVariants}>
                <motion.div className='deleted-messages' layout key="trash-messages" initial='hidden' animate='visible' exit='exit' variants={trashPageVariants}>
                    <div className='back-button' onClick={() => navigate('/')}><TiArrowLeft /></div>
                    <AnimatePresence>
                        {
                            messages?.map((messageData) => (
                            <Message
                                key={messageData.id}
                                type="TRASH"
                                messageData={{
                                    ...messageData,
                                    isLocalMessage: true,
                                    isTextPersian : isPersian(messageData.plainText),
                                    textLetters: messageData.plainText.length > 20 ? 20 : messageData.plainText.length,
                                }}
                            />
                            ))
                        }
                    </AnimatePresence>
                </motion.div>
                <AnimatePresence>
                    {
                        selectedMessages?.length ?
                            <motion.div key='trash-select-bar' className='trash-select-bar' initial='hidden' animate='visible' exit='exit' variants={trashSelectBarVariants}>
                                <div className='counter'><Counter num={selectedMessages?.length} /></div>
                                <button className='delete-button' onClick={() => openPopup("DELETE_POPUP", [selectedMessages])}>
                                    <i><TbTrashX /></i>
                                    <p>Delete</p>
                                </button>
                                <button className='restore-button' onClick={restoreSelectedMessages}>
                                    <i><FaTrashRestore /></i>
                                    <p>Restore</p>
                                </button>
                                <div className='switch' onClick={() => switchSelectAllTrash(messages)}>
                                    <AnimatePresence>
                                        {
                                            selectedMessages?.length == messages?.length ?
                                            <motion.i className='clear-icon' key='clear-icon' initial='hidden' animate='visible' exit='exit' variants={trashSelectBarSwitchIconVariants}><AiOutlineClear  /></motion.i> :
                                            <motion.i className='select-icon' key='select-icon' initial='hidden' animate='visible' exit='exit' variants={trashSelectBarSwitchIconVariants}><BsCheckAll /></motion.i>
                                        }
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        : ''
                    }
                </AnimatePresence>
            </TrashPageContainer>
        </>
    );
};

const TrashPageContainer = styled(motion.div)`
    position: fixed;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .deleted-messages {
        position: relative;
        width: 62%;
        height: 100%;
        font-family: 'Outfit', sans-serif;
        text-align: center;
        padding: 5rem 8rem 9rem 8rem;
        scroll-behavior: smooth;
        overflow: hidden scroll;

        @media (max-width: 1400px) {
            width: 70%;
        }

        @media (max-width: 1100px) {
            width: 80%;
        }

        @media (max-width: 800px) {
            width: 100%;
            padding: 5rem 1rem 10rem 1rem;
        }

        .back-button {
            width: 2rem;
            height: 2rem;
            background-color: #ffffff10;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.7rem;
            cursor: pointer;
            position: absolute;
            top: 1rem;
            left: 5rem;
            transition: background .2s;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #ffffff20;
                }
            }
        }
    }

    .trash-select-bar {
        box-sizing: content-box;
        position: absolute;
        bottom: 1rem;
        width: 18rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--normal-color);
        z-index: 3;
        overflow: hidden;

        .counter {
            position: absolute;
            left: 0.25rem;
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;
            background-color: #ffffff10;
            overflow: hidden;
            backdrop-filter: var(--bold-glass);
            -webkit-backdrop-filter: var(--bold-glass);
        }

        .delete-button, .restore-button {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            margin: 0 0.2rem;
            width: 5.8rem;
            height: 2.2rem;
            cursor: pointer;
            backdrop-filter: var(--bold-glass);
            -webkit-backdrop-filter: var(--bold-glass);
            transition: background .2s, color .2s;

            &:disabled {
                color: var(--pale-color);
                cursor: not-allowed;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1rem;
            }

            p {
                font-size: 1rem;
                font-weight: 400;
            }
        }

        .delete-button {
            background-color: #ff000030;
            color: #ff0000;

            i {
                font-size: 1.2rem;
                margin-right: .05rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #ff000050;
                }
            }
        }

        .restore-button {
            background-color: #00ff0030;
            color: #00ff00;

            i {
                font-size: .9rem;
                margin-right: .05rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #00ff0050;
                }
            }
        }

        .switch {
            position: absolute;
            right: 0.25rem;
            width: 1.7rem;
            height: 1.7rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: #ffffff10;
            backdrop-filter: var(--bold-glass);
            -webkit-backdrop-filter: var(--bold-glass);
            cursor: pointer;
            transition: background .2s;

            i {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .clear-icon {
                i {
                    font-size: 1rem;
                }
            }

            .select-icon {
                i {
                    font-size: 1.2rem;
                }
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: #ffffff20;
                }
            }
        }
    }
`;

export default TrashPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { useSelect } from '../../hooks/useSelect';
import { isPersian } from '../../functions/isPersian';
import Message from '../messenger/message/Message';
import Counter from '../../common/Counter';
import Options from '../messenger/options/Options';
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { trashPageVariants, trashSelectBarVariants } from '../../config/varitans';

const TrashPage = () => {
    const navigate = useNavigate();
    const { deletedMessages } = useSelector(store => store.firestoreStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { optionsAnimationStatus } = useSelector(store => store.optionsStore);
    const { user } = useSelector(store => store.userStore);
    const { openModal } = useModal();
    const { restoreSelectedMessages, clearSelectedMessages } = useSelect();
    const [messages, setMessages] = useState(deletedMessages?.filter(item => item?.uid == user?.uid));
    const [messageOptions, setMessageOptions] = useState({ data: null, animationStatus: 0 });

    useEffect(() => {
        setMessages(deletedMessages?.filter(item => item?.uid == user?.uid));
    }, [deletedMessages]);

    return (
        <>
            <Trash
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={trashPageVariants}
                data={{ optionsAnimationStatus }}
            >
                <div className='trash-container'>
                    <div className='header'>
                        <button className='header-back-button' onClick={() => navigate('/')}><IoIosArrowBack /></button>
                        <p className='header-text'>Trash</p>
                        <div className='trash-count'><Counter num={messages?.length} size={0.7} /></div>
                    </div>
                    <motion.div className='deleted-messages' layout key='trash-messages'>
                        <AnimatePresence>
                            {
                                messages?.map((messageData) => (
                                <Message
                                    key={messageData?.id}
                                    type="TRASH"
                                    messageData={{
                                        ...messageData,
                                        isLocalMessage: true,
                                        isTextPersian : isPersian(messageData?.plainText),
                                        textLetters: messageData?.plainText?.length > 20 ? 20 : messageData?.plainText?.length,
                                    }}
                                    options={{
                                        messageOptions: messageOptions,
                                        setMessageOptions: setMessageOptions,
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
                                <div className='counter'><Counter num={selectedMessages?.length} size={1} /></div>
                                <button className='delete-button' onClick={() => openModal("PERMENANT_DELETE_CONFIRMATION", selectedMessages)}>
                                    <i><TbTrashX /></i>
                                    <p>Delete</p>
                                </button>
                                <button className='restore-button' onClick={restoreSelectedMessages}>
                                    <i><FaTrashRestore /></i>
                                    <p>Restore</p>
                                </button>
                                <button className='close' onClick={clearSelectedMessages}><IoClose /></button>
                            </motion.div> : ''
                        }
                    </AnimatePresence>
                </div>
                <Options messageOptions={messageOptions} setMessageOptions={setMessageOptions} type='TRASH' />
            </Trash>
        </>
    );
};

const Trash = styled(motion.div)`
    position: absolute;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    .trash-container {
        position: relative;
        width: 36rem;
        height: 35rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: var(--border);
        border-radius: 25px;
        background-color: #00000044;
        box-shadow: var(--shadow);
        overflow: hidden;
        transform: ${props => props.data.optionsAnimationStatus == 2 ? 'scale(0.95)' : 'scale(1)'} !important;
        transition: ${props => props.data.optionsAnimationStatus == 2 ? 'transform .4s' : 'transform .3s'};

        .header {
            position: absolute;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: .8rem 0;
            backdrop-filter: var(--glass);
            z-index: 2;

            .header-text {
                font-size: 1.4rem;
                font-weight: 600;
            }

            .trash-count {
                margin: .2rem;
                border-radius: 50%;
                background-color: var(--red);
                width: 1rem;
                height: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-weight: 600;
                overflow: hidden;
            }

            .header-back-button {
                position: absolute;
                left: .7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                border-radius: 50%;
                color: var(--text);
            }
        }

        .deleted-messages {
            position: relative;
            width: 95%;
            height: 100%;
            text-align: center;
            padding: 5rem 1rem 9rem 1rem;
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
            z-index: 3;
            overflow: hidden;

            .counter {
                position: absolute;
                left: 0.6rem;
                width: 1.7rem;
                height: 1.7rem;
                border-radius: 50%;
                background-color: var(--bg);
                overflow: hidden;
                backdrop-filter: var(--glass);
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
                backdrop-filter: var(--glass);
                transition: background .2s, color .2s;

                &:disabled {
                    color: var(--grey);
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
                color: var(--red);

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
                color: var(--green);

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

            .close {
                position: absolute;
                right: 0.6rem;
                width: 1.7rem;
                height: 1.7rem;
                font-size: 1.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background-color: var(--bg);
                backdrop-filter: var(--glass);
                cursor: pointer;
                transition: background .2s;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: var(--bg-hover);
                    }
                }
            }
        }

        @media (max-width: 768px) {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: none;
        }
    }
`;

export default TrashPage;
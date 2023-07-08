import React, { memo } from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelector } from 'react-redux';
import { FcEmptyTrash } from "react-icons/fc";
import { FaTrashRestore } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const themesOpenVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themesCloseVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themesVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, staggerChildren: 0.2 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
};

const SettingsTrash = ({ open, setOpen }) => {

    const { deletedMessages } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);

    const { undeleteMessage } = useMessageOptions();

    return (
        <>
            <SettingsTrashContainer open={open == "SETINGS_TRASH" ? 1 : 0}>
                <AnimatePresence exitBeforeEnter>
                    {open == "SETINGS_TRASH" ?
                    <motion.div key="theme-open" className='theme-open' initial='hidden' animate='visible' exit='exit' variants={themesOpenVariants}>
                        {deletedMessages.length ?
                        <div className='deleted-messages'>
                            {deletedMessages.map(message => (
                                message.uid == user.uid ?
                                    <div className='deleted-message'>
                                        <div className='deleted-message-box'>
                                            <div className='deleted-message-text'>{message.message}</div>
                                        </div>
                                        <div className='deleted-message-return' onClick={() => undeleteMessage(message.id)}>
                                            <FaTrashRestore />
                                        </div>
                                    </div>
                                : ""
                            ))}
                        </div>
                        : <div className='trash-empty'>Empty...</div>}
                        <button className='theme-open-submit' onClick={() => setOpen(false)}>Done</button>
                    </motion.div> :
                    <motion.div key="theme-close" onClick={() => setOpen("SETINGS_TRASH")} className='theme-close' initial='hidden' animate='visible' exit='exit' variants={themesCloseVariants}>
                        <i className='list-item-icon'><FcEmptyTrash /></i>
                        <p>Message Trash</p>
                        <i className='list-item-back'><RiArrowRightSLine /></i>
                    </motion.div>}
                </AnimatePresence>
            </SettingsTrashContainer>
        </>
    );
};

const SettingsTrashContainer = styled.div`
    width: 65%;
    height: ${props => props.open ? "18rem" : "2.2rem"};
    padding: ${props => props.open ? "" : "0 .5rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    cursor: ${props => props.open ? "" : "pointer"};
    overflow: hidden;
    position: relative;
    margin: .3rem;
    background-color: var(--settings-item);
    transition: background .2s, border .2s, height .8s cubic-bezier(.53,0,0,.98), padding .2s;

    .theme-close {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;

        .list-item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .4rem;
        }

        p {
            font-size: .8rem;
            font-weight: 600;
        }

        .list-item-back {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: absolute;
            right: 0;
        }
    }

    .theme-open {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 18rem;

        .deleted-messages {
            width: 100%;
            height: 18rem;
            overflow: hidden scroll;
            position: relative;
            scroll-behavior: smooth;
            flex-direction: column;
            padding: 1rem .2rem 2.5rem .2rem;

            .deleted-message {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row-reverse;
                user-select: none;

                .deleted-message-box {
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row-reverse;
                    background-color: ${props => props.selected ? "var(--message-selected)" : "var(--message)"};
                    margin: .2rem 0 .2rem auto;
                    border-radius: 25px;
                    padding: ${props => props.isreply ? "2.4rem .8rem .5rem .8rem" : ".5rem .8rem .5rem .8rem"};
                    min-width: ${props => props.isreply ? "22%" : ""};
                    width: fit-content;
                    max-width: 65%;
                    font-weight: 200;
                    word-break: break-all;
                    transition: backdrop-filter .4s, border-radius .4s, margin .4s, background .2s;

                    .deleted-message-text {
                        text-align: ${props => props.ispersian ? "right" : "left"};
                        word-spacing: 1px;
                        line-break: loose;
                        word-break: keep-all;
                        white-space: pre-wrap;
                        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
                        font-size: .8rem;
                    }
                }

                .deleted-message-return {
                    font-size: .8rem;
                    background-color: #ffffff08;
                    width: 1.8rem;
                    height: 1.8rem;
                    cursor: pointer;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            @media (max-width: 768px) {
                .deleted-message {
                    padding: ${props => props.isreply ? "2.4rem 2.5rem .5rem .8rem" : ".5rem 2.5rem .5rem .8rem"};
                    max-width: 80%;
                    min-width: ${props => props.isreply ? "30%" : ""};
                    border-radius: 20px;
                }

                .deleted-message-message {
                    font-size: .6rem;
                }
            }
        }

        .theme-open-submit {
            position: absolute;
            bottom: 0;
            padding: .5rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--settings-submit);
            border: none;
            cursor: pointer;
            font-size: .8rem;
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            background-color: ${props => props.open ? "" : "var(--settings-item-hover)"};
        }
    }
`;

export default memo(SettingsTrash);
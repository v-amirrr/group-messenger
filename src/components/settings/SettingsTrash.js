import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Message from '../message/Message';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useNotification } from '../../hooks/useNotification';
import { useSelect } from '../../hooks/useSelect';
import { isRTL } from '../../functions/isRlt';
import { FcEmptyTrash, FcFullTrash } from "react-icons/fc";
import { TbTrashX } from 'react-icons/tb';
import { FaTrashRestore } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { BsCheckAll } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { trashSettingsVariants } from '../../config/varitans';

const SettingsTrash = ({ open, setOpen, setHeight }) => {
    const { deletedMessages } = useSelector(store => store.firestoreStore);
    const { selectedMessages } = useSelector(store => store.appStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openPopup } = useMessageOptions();
    const { openNotification } = useNotification();
    const { switchSelectAllTrash, restoreSelectedMessages } = useSelect();
    const [messages, setMessages] = useState(deletedMessages?.filter(item => item?.uid == user?.uid));

    const itemSwitch = () => {
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            if (open == "SETTINGS_TRASH") {
                setOpen(false);
            } else {
                setOpen("SETTINGS_TRASH");
                setHeight(15);
            }
        }
    };

    useEffect(() => {
        setMessages(deletedMessages?.filter(item => item?.uid == user?.uid));
    }, [deletedMessages]);

    useEffect(() => {
        if (!messages?.length) {
            setOpen(false);
        }
    }, [messages]);

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                {
                    messages?.length ?
                    <i className='item-icon'><FcFullTrash /></i> :
                    <i className='item-icon'><FcEmptyTrash /></i>
                }
                <h4>Trash</h4>
                <AnimatePresence exitBeforeEnter>
                    {
                        messages?.length ?
                        <motion.div key="trash-counter" className='deleted-messages-counter' initial='hidden' animate='visible' exit='exit' variants={trashSettingsVariants}>
                            {messages?.length}
                        </motion.div>
                        : ""
                    }
                </AnimatePresence>
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence>
                {
                    open == "SETTINGS_TRASH" ?
                        <MessagesContainer initial='hidden' animate='visible' exit='exit' variants={trashSettingsVariants} selectbarshow={selectedMessages.length}>
                            <AnimatePresence exitBeforeEnter>
                                {
                                    messages?.length ?
                                    <>
                                        <div className='select-bar'>
                                            <div className='counter'>{selectedMessages.length}</div>
                                            <button className='delete-button' disabled={!selectedMessages.length} onClick={() => openPopup("DELETE_POPUP", [selectedMessages])}>
                                                <i><TbTrashX /></i>
                                                <p>Delete</p>
                                            </button>
                                            <button className='restore-button' disabled={!selectedMessages.length} onClick={restoreSelectedMessages}>
                                                <i><FaTrashRestore /></i>
                                                <p>Restore</p>
                                            </button>
                                            <div className='all' onClick={() => switchSelectAllTrash(messages)}><BsCheckAll /></div>
                                        </div>
                                        <motion.div layout key="trash-messages" className='deleted-messages' initial='hidden' animate='visible' exit='exit' variants={trashSettingsVariants}>
                                            <AnimatePresence>
                                                {
                                                    messages?.map((message) => (
                                                    <Message
                                                        key={message.id}
                                                        type="TRASH"
                                                        message={{
                                                            messageUid: message.uid,
                                                            localUid: user?.uid,
                                                            localMessage: user?.uid == message.uid,
                                                            id: message.id,
                                                            text: message.message,
                                                            plainText: message.plainText,
                                                            isTextPersian : isRTL(message.message) ? 1 : 0,
                                                            textLetters: message.plainText.length,
                                                            periorUsername: message.periorUsername,
                                                            nextUsername: message.nextUsername,
                                                            time: message.time,
                                                            priorDifferentDate: message.priorDifferentDate,
                                                            nextDifferentDate: message.nextDifferentDate,
                                                            replyTo: message.replyTo,
                                                        }}
                                                    />
                                                    ))
                                                }
                                            </AnimatePresence>
                                        </motion.div>
                                    </> :
                                    <motion.div key="trash-empty" className='trash-empty' initial='hidden' animate='visible' exit='exit' variants={trashSettingsVariants}>
                                        <p>Trash is empty!</p>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </MessagesContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const MessagesContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 5rem;

    .select-bar {
        width: 100%;
        padding: .4rem 0;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        .delete-button, .restore-button {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 25px;
            height: 1.8rem;
            width: 4rem;
            margin: 0 .1rem;
            cursor: pointer;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            p {
                font-size: .65rem;
            }
        }

        .delete-button {
            background-color: #ff000030;
            color: #ff0000;

            i {
                font-size: 1rem;
                margin-right: .05rem;
            }
        }

        .restore-button {
            background-color: #00ff0030;
            color: #00ff00;

            i {
                font-size: .75rem;
                margin-right: .1rem;
            }
        }

        .all {
            background-color: #ffffff10;
            border-radius: 50%;
            width: 1.4rem;
            height: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            cursor: pointer;
            margin-left: .2rem;
        }

        .counter {
            background-color: #ffffff10;
            border-radius: 50%;
            width: 1.4rem;
            height: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .8rem;
            margin-right: .2rem;
        }
    }

    .deleted-messages {
        position: relative;
        overflow: hidden scroll;
        width: 100%;
        padding: .5rem .5rem 3rem .5rem;
    }

    .trash-empty {
        margin-bottom: 2.5rem;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
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
`;

export default SettingsTrash;
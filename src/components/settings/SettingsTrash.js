import React, { memo, useState } from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelector } from 'react-redux';
import { FcEmptyTrash } from "react-icons/fc";
import { FaTrashRestore } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { trashVariants } from '../../config/varitans';

const SettingsTrash = ({ open, setOpen }) => {

    const { deletedMessages } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);

    const { undeleteMessage } = useMessageOptions();

    const [messages, setMessages] = useState(deletedMessages.filter(item => item.uid == user.uid));

    const itemSwitch = () => {
        if (open == "SETTINGS_TRASH") {
            setOpen(false);
        } else {
            setOpen("SETTINGS_TRASH");
        }
    };

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcEmptyTrash /></i>
                <h4>Trash</h4>
                {
                    deletedMessages.length ?
                    <div className='deleted-messages-counter'>{messages.length}</div>
                    : ""
                }
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence exitBeforeEnter>
                {
                    open == "SETTINGS_TRASH" ?
                    <div key="item-data" className='item-data'>
                        <MessagesContainer initial='hidden' animate='visible' exit='exit' variants={trashVariants}>
                            {deletedMessages.length ?
                            <div className='deleted-messages'>
                                {messages.map(message => (
                                        <div className='deleted-message' key={message.id}>
                                            <div className='deleted-message-box'>
                                                <div className='deleted-message-text'>{message.message}</div>
                                            </div>
                                            <div className='deleted-message-return' onClick={() => undeleteMessage(message.id)}>
                                                <FaTrashRestore />
                                            </div>
                                        </div>
                                ))}
                            </div>
                            : <div className='trash-empty'>Empty...</div>}
                        </MessagesContainer>
                    </div>
                    : ""
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
    padding: 0 .5rem 3rem .5rem;
    overflow: hidden scroll;

    /* width */
    ::-webkit-scrollbar {
        width: .3rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background: #ffffff04;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ffffff14;
        border-radius: 50px;
    }

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
`;

export default memo(SettingsTrash);
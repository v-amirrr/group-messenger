import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageOptionsId } from '../../redux/appSlice';
import { useSelect } from '../../hooks/useSelect';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { isRTL } from '../../functions/isRlt';
import MessageOptions from '../message/MessageOptions';
import ChatDate from '../ChatDate';
import MessageTime from './MessageTime';
import MessageReply from './MessageReply';
import SelectCheck from './SelectCheck';
import MessageUsername from './MessageUsername';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { messageLocalVariants, messageNonLocalVariants, replyIconLocalVariants, replyIconNonLocalVariants } from '../../config/varitans';
import MessageReplyIcon from './MessageReplyIcon';

const Message = props => {

    const { messageUid, localUid, message, id, replyTo, messageUsername, periorUsername, nextUsername, time, priorDifferentDate, nextDifferentDate } = props.message;

    const dispatch = useDispatch();
    const { messageOptionsId, selectedMessages, menuShow } = useSelector(store => store.appStore);
    const { replyTo: replyToApp } = useSelector(store => store.sendMessageStore);

    const { selectMessage, checkMessage, unSelectMessage } = useSelect();
    const { replyMessage } = useMessageOptions();

    const [messagePosition, setMessagePosition] = useState(null);
    const [clickEvent, setClickEvent] = useState(null);
    const [selected, setSelected] = useState(false);

    const messageClickHandler = (e) => {
        if (props.type == "CHAT" || props.type == "TRASH") {
            if (selectedMessages.length || props.type == "TRASH") {
                if (selected) {
                    unSelectMessage(id);
                    setSelected(false);
                } else {
                    selectMessage({
                        ...props.message,
                        isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                        isPersian: isRTL(message) ? 1 : 0,
                    });
                }
            } else {
                if (messageOptionsId == id && props.type == "CHAT") {
                    dispatch(setMessageOptionsId(null));
                    setClickEvent(null);
                } else {
                    dispatch(setMessageOptionsId(id));
                    setClickEvent(e);
                }
            }
        } else {
            props?.onClick();
        }
    };

    const messageDoubleClickHandler = () => {
        if (!selectedMessages.length) {
            replyMessage(id, message, messageUsername);
        }
    };

    // detect message's position in order to set its border-radius
    useEffect(() => {
        if (props.type == "TRASH") {
            setMessagePosition(0);
        } else {
            if (priorDifferentDate && nextDifferentDate) {
                setMessagePosition(0);
            }
            if (priorDifferentDate && !nextDifferentDate) {
                if (nextUsername == messageUid) {
                    setMessagePosition(1);
                } else {
                    setMessagePosition(0);
                }
            }
            if (!priorDifferentDate && nextDifferentDate) {
                if (periorUsername == messageUid) {
                    setMessagePosition(3);
                } else {
                    setMessagePosition(0);
                }
            }
            if (!priorDifferentDate && !nextDifferentDate) {
                if (periorUsername != messageUid && nextUsername != messageUid) {
                    setMessagePosition(0);
                } else if (periorUsername != messageUid && nextUsername == messageUid) {
                    setMessagePosition(1);
                } else if (periorUsername == messageUid && nextUsername == messageUid) {
                    setMessagePosition(2);
                } else if (periorUsername == messageUid && nextUsername != messageUid) {
                    setMessagePosition(3);
                }
            }
        }
    }, [nextUsername, periorUsername, priorDifferentDate, nextDifferentDate]);

    // check the selected messages in order to detect select bar's options
    useEffect(() => {
        checkMessage(id, selected, setSelected, localUid);
    }, [selectedMessages]);

    return (
        <>

            <MessageBox layout={props.type == "EDIT_REPLY" ? 0 : 1} initial='hidden' animate='visible' exit='exit' variants={messageUid == localUid ? messageLocalVariants : messageNonLocalVariants} layoutId={props.type == "EDIT_REPLY" ? id : null} chatdate={priorDifferentDate && time.year && time.month && time.day} isMessageFromLocalUser={messageUid == localUid ? 1 : 0} ispersian={isRTL(message) ? 1 : 0} messagePosition={messagePosition} isreply={replyTo != "no_reply" ? 1 : 0} selected={selected ? 1 : 0} anymessageselected={selectedMessages.length ? 1 : 0} type={props.type} replyto={replyToApp.id == id ? 1 : 0} newreply={props.newreply ? 1 : 0} date={priorDifferentDate ? 1 : 0}>
                <ChatDate layout={props.type == "EDIT_REPLY" ? 0 : 1} layoutId={props.type == "EDIT_REPLY" ? id : null} key="chat-date" dateObj={time} priorDifferentDate={priorDifferentDate} />

                <div className='message-box' onClick={(e) => messageClickHandler(e)} onDoubleClick={messageDoubleClickHandler}>
                    <p className='message'>
                        <MessageUsername username={messageUsername} show={messageUid != localUid} />
                        <MessageReply replyTo={replyTo} type={props.type} />
                        {props.type != "TRASH" ?
                        message?.map((item, index) => (
                            item.link ? <a key={index} className='link' href={item.word} target="_blank" rel='noopener nereferrer'>{item.word}</a> : `${item.word} `
                        )) :
                        message}
                    </p>
                    <MessageTime time={time} messagePosition={messagePosition} isMessageFromLocalUser={messageUid == localUid ? 1 : 0} />
                </div>

                <SelectCheck type={props.type} selected={selected} selectedMessagesLength={selectedMessages.length} messageClickHandler={messageClickHandler}/>

                    {/* {replyToApp.id == id || props.newreply ?
                    <motion.i key="reply-icon" className='reply-icon' initial='hidden' animate='visible' exit='exit' variants={messageUid == localUid ? replyIconLocalVariants : replyIconNonLocalVariants}><BsReplyFill /></motion.i>
                    : ""} */}
                    <MessageReplyIcon show={replyToApp.id == id || props.newreply} messageLocal={messageUid == localUid} />

                <MessageOptions
                    clickEvent={clickEvent}
                    show={messageOptionsId == id && props.type == "CHAT" && !menuShow}
                    message={{
                        ...props.message,
                        isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                        isPersian: isRTL(message) ? 1 : 0,
                    }}
                />
            </MessageBox>
        </>
    );
};

const MessageBox = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${ props => props.isMessageFromLocalUser ? "row-reverse" : "row"};
    user-select: none;
    padding-top: ${props => props.chatdate ? "2rem" : ""};
    position: relative;
    transition: padding .4s;

    .message-box {
        z-index: 2;
        display: flex;
        justify-content: ${props => props.isMessageFromLocalUser ? "flex-start" : "flex-end"};
        align-items: center;
        flex-direction: ${props => props.isMessageFromLocalUser ? "row-reverse" : "row"};
        background-color: ${props => props.selected || props.newreply ? "var(--message-selected)" : "var(--message)"};
        margin: ${props =>
            props.messagePosition == 0 ?
            ".3rem 0 .3rem 0" :
            props.messagePosition == 1 ?
            ".3rem 0 .04rem 0" :
            props.messagePosition == 2 ?
            ".04rem 0 .04rem 0" :
            props.messagePosition == 3 &&
            ".04rem 0 .3rem 0"
        };
        border-radius: 25px;
        border-radius: ${props =>
            props.isMessageFromLocalUser ?
                props.messagePosition == 0 ?
                "25px" :
                props.messagePosition == 1 ?
                "25px 25px 5px 25px" :
                props.messagePosition == 2 ?
                "25px 5px 5px 25px" :
                props.messagePosition == 3 &&
                "25px 5px 25px 25px" :
            props.messagePosition == 0 ?
                "25px" :
                props.messagePosition == 1 ?
                "25px 25px 25px 5px" :
                props.messagePosition == 2 ?
                "5px 25px 25px 5px" :
                props.messagePosition == 3 &&
                "5px 25px 25px 25px"
        };
        margin-right: ${props => props.type != "TRASH" && props.anymessageselected || props.replyto || props.newreply ? "3rem" : ""};
        margin-left: ${props => !props.isMessageFromLocalUser && props.replyto || props.newreply ? "3rem" : ""};
        padding: .5rem 2.8rem .5rem .8rem;
        min-width: ${props => props.isreply ? "22%" : ""};
        width: fit-content;
        max-width: ${props => props.type == "EDIT_REPLY" ? "80%" : props.isMessageFromLocalUser && props.type == "CHAT" ? "60%" : "80%"};
        backdrop-filter: ${props => props.type == "CHAT" ? "var(--glass-first)" : "blur(0)"};
        -webkit-backdrop-filter: ${props => props.type == "CHAT" ? "var(--glass-first)" : ""};
        font-weight: var(--text-boldness-first);
        word-break: break-all;
        cursor: pointer;
        box-shadow: var(--shadow-first);
        transition: backdrop-filter .4s, border-radius .4s .4s, margin .4s, background .2s, padding .2s;

        .message {
            text-align: ${props => props.ispersian ? "right" : "left"};
            word-spacing: 1px;
            line-break: loose;
            word-break: keep-all;
            white-space: pre-wrap;
            font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
            font-size: ${props => props.type == "TRASH" ? ".8rem" : "1rem"};
            font-weight: var(--text-boldness-first);
            color: var(--text-color-third);
        }
    }

    @media (max-width: 768px) {
        .message-box {
            padding: .5rem 2.5rem .5rem .8rem;
            max-width: 95%;
            min-width: ${props => props.isreply ? "30%" : ""};
            border-radius: ${props =>
                props.isMessageFromLocalUser ?
                    props.messagePosition == 0 ?
                    "20px" :
                    props.messagePosition == 1 ?
                    "20px 20px 5px 20px" :
                    props.messagePosition == 2 ?
                    "20px 5px 5px 20px" :
                    props.messagePosition == 3 &&
                    "20px 5px 20px 20px" :
                props.messagePosition == 0 ?
                    "20px" :
                    props.messagePosition == 1 ?
                    "20px 20px 20px 5px" :
                    props.messagePosition == 2 ?
                    "5px 20px 20px 5px" :
                    props.messagePosition == 3 &&
                    "5px 20px 20px 20px"
            };
        }

        .message {
            font-size: .8rem;
        }
    }
`;

export default memo(Message);
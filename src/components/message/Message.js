import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageOptionsId } from '../../redux/appSlice';
import { useSelect } from '../../hooks/useSelect';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { isRTL } from '../../functions/isRlt';
import MessageOptions from '../message/MessageOptions';
import ChatDate from '../ChatDate';
import MessageReply from './MessageReply';
import MessageSelectCheck from './MessageSelectCheck';
import MessageUsername from './MessageUsername';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';
import MessageReplyIcon from './MessageReplyIcon';

const Message = (props) => {
    const {
        messageUid,
        localUid,
        message,
        id,
        replyTo,
        messageUsername,
        periorUsername,
        nextUsername,
        time,
        priorDifferentDate,
        nextDifferentDate,
    } = props.message;

    const dispatch = useDispatch();
    const { messageOptionsId, selectedMessages, menuShow } = useSelector((store) => store.appStore);
    const { replyTo: replyToApp } = useSelector((store) => store.sendMessageStore);

    const { selectMessage, checkMessage, unSelectMessage } = useSelect();
    const { replyMessage } = useMessageOptions();

    const [messagePosition, setMessagePosition] = useState(null);
    const [clickEvent, setClickEvent] = useState(null);
    const [selected, setSelected] = useState(false);
    const [hold, setHold] = useState(false);
    let timer;

    const messageClickHandler = (e) => {
        if (props.type == 'CHAT' || props.type == 'TRASH') {
            if (selectedMessages.length || props.type == 'TRASH') {
                if (hold) {
                    setHold(false);
                } else if (selected && !hold) {
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
                if (messageOptionsId == id && props.type == 'CHAT') {
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
        if (!selectedMessages.length && props.type == 'CHAT') {
            replyMessage(id, message, messageUsername);
        }
    };

    // detect message's position in order to set its border-radius
    useEffect(() => {
        if (props.type == 'TRASH') {
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
                if (
                    periorUsername != messageUid &&
                    nextUsername != messageUid
                ) {
                    setMessagePosition(0);
                } else if (
                    periorUsername != messageUid &&
                    nextUsername == messageUid
                ) {
                    setMessagePosition(1);
                } else if (
                    periorUsername == messageUid &&
                    nextUsername == messageUid
                ) {
                    setMessagePosition(2);
                } else if (
                    periorUsername == messageUid &&
                    nextUsername != messageUid
                ) {
                    setMessagePosition(3);
                }
            }
        }
    }, [nextUsername, periorUsername, priorDifferentDate, nextDifferentDate]);

    // check the selected messages in order to detect select bar's options
    useEffect(() => {
        checkMessage(id, selected, setSelected, localUid);
        if (!selectedMessages.length) {
            setHold(false);
        }
    }, [selectedMessages]);

    const onHoldStarts = () => {
        if (!selectedMessages.length && props.type == 'CHAT' || props.type == 'TRASH') {
            timer = setTimeout(() => {
                selectMessage({
                    ...props.message,
                    isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                    isPersian: isRTL(message) ? 1 : 0,
                });
                setHold(true);
            }, 300);
        }
    };

    const onHoldEnds = () => {
        if (!selectedMessages.length) {
            clearTimeout(timer);
            setHold(false);
        }
    };

    return (
        <>
            <MessageBox
                layout={props.type == 'EDIT_REPLY' ? 0 : 1}
                layoutId={props.type == 'EDIT_REPLY' ? id : null}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={messageVariants}
                chatdate={priorDifferentDate && time.year && time.month && time.day}
                localuser={messageUid == localUid ? 1 : 0}
                ispersian={isRTL(message) ? 1 : 0}
                messageposition={messagePosition}
                isreply={replyTo != 'no_reply' ? 1 : 0}
                selected={selected ? 1 : 0}
                anymessageselected={selectedMessages.length ? 1 : 0}
                type={props.type}
                replyto={replyToApp.id == id ? 1 : 0}
                newreply={props.newreply ? 1 : 0}
                date={priorDifferentDate ? 1 : 0}
            >
                <ChatDate
                    layout={props.type == 'EDIT_REPLY' ? 0 : 1}
                    layoutId={props.type == 'EDIT_REPLY' ? id : null}
                    key='chat-date'
                    dateObj={time}
                    priorDifferentDate={priorDifferentDate}
                />

                <div
                    className='message-box'
                    onClick={(e) => messageClickHandler(e)}
                    onDoubleClick={messageDoubleClickHandler}
                    onMouseDown={onHoldStarts}
                    onMouseUp={onHoldEnds}
                    onTouchStart={onHoldStarts}
                    onTouchEnd={onHoldEnds}
                >
                    <p className='message'>
                        <div className='username-reply'>
                            <MessageUsername
                                username={messageUsername}
                                show={messageUid != localUid}
                            />
                            <MessageReply replyTo={replyTo} type={props.type} />
                        </div>
                        {
                            props.type != 'TRASH' ?
                            message?.map((item, index) =>
                                item.link ?
                                <a
                                    key={index}
                                    className='link'
                                    href={item.word}
                                    target='_blank'
                                    rel='noopener nereferrer'
                                >
                                    {item.word}
                                </a>
                                : `${item.word} `
                            )
                            : message
                        }
                    </p>
                </div>

                <MessageSelectCheck
                    type={props.type}
                    selected={selected}
                    selectedMessagesLength={selectedMessages.length}
                    messageClickHandler={messageClickHandler}
                    isMessageFromLocalUser={messageUid == localUid ? 1 : 0}
                />

                <MessageReplyIcon
                    editReply={props.newreply}
                    editReplyClick={props.replyIconClick}
                    show={replyToApp.id == id || props.newreply}
                    isMessageFromLocalUser={messageUid == localUid ? 1 : 0}
                />

                <MessageOptions
                    clickEvent={clickEvent}
                    show={
                        messageOptionsId == id &&
                        props.type == 'CHAT' &&
                        !menuShow &&
                        !selectedMessages.length
                    }
                    message={{
                        ...props.message,
                        isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                        isPersian: isRTL(message) ? 1 : 0,
                    }}
                    replyTo={replyToApp.id == id ? 1 : 0}
                />
            </MessageBox>
        </>
    );
};

const MessageBox = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${(props) => (props.localuser ? 'row-reverse' : 'row')};
    padding-top: ${(props) => (props.chatdate ? '1.8rem' : '')};
    position: relative;
    transition: padding 0.4s;

    .message-box {
        z-index: 1;
        display: flex;
        justify-content: ${(props) =>
            props.localuser ? 'flex-start' : 'flex-end'};
        align-items: center;
        flex-direction: ${(props) => (props.localuser ? 'row' : 'row')};
        background-color: ${(props) =>
            props.selected ? 'var(--normal-bg-hover)' : 'var(--normal-bg)'};
        margin: ${(props) =>
            props.messageposition == 0
                ? '.2rem 0 .2rem 0'
                : props.messageposition == 1
                ? '.2rem 0 .06rem 0'
                : props.messageposition == 2
                ? '.06rem 0 .06rem 0'
                : props.messageposition == 3 && '.06rem 0 .2rem 0'};
        border-radius: 25px;
        border-radius: ${(props) =>
            props.localuser
                ? props.messageposition == 0
                    ? '25px'
                    : props.messageposition == 1
                    ? '25px 25px 5px 25px'
                    : props.messageposition == 2
                    ? '25px 5px 5px 25px'
                    : props.messageposition == 3 && '25px 5px 25px 25px'
                : props.messageposition == 0
                ? '25px'
                : props.messageposition == 1
                ? '25px 25px 25px 5px'
                : props.messageposition == 2
                ? '5px 25px 25px 5px'
                : props.messageposition == 3 && '5px 25px 25px 25px'};
        margin-right: ${(props) => props.type != 'TRASH' && props.anymessageselected ? '3rem' : ''};
        margin-left: ${(props) => props.type != 'TRASH' && props.anymessageselected ? '3rem' : ''};
        padding: .45rem .5rem;
        width: fit-content;
        max-width: ${(props) => props.type == 'EDIT_REPLY' ? '80%' : props.localuser && props.type == 'CHAT' ? '60%' : '64%'};
        backdrop-filter: ${(props) =>
            props.type == 'CHAT' ? 'var(--normal-glass)' : 'blur(0)'};
        -webkit-backdrop-filter: ${(props) =>
            props.type == 'CHAT' ? 'var(--normal-glass)' : ''};
        font-weight: 200;
        word-break: break-all;
        cursor: pointer;
        box-shadow: var(--normal-shadow);
        color: var(--normal-color);
        transition: backdrop-filter 0.4s, border-radius 0.4s, margin 0.4s,
            background 0.4s, background 0.2s, padding 0.2s;

        .message {
            text-align: ${(props) => (props.ispersian ? 'right' : 'left')};
            word-spacing: 1px;
            white-space: pre-wrap;
            word-break: ${(props) => (props.type == 'TRASH' ? '' : 'keep-all')};
            font-family: ${(props) =>
                    props.ispersian ? 'Vazirmatn' : 'Outfit'},
                'Vazirmatn', sans-serif;
            font-size: ${(props) => (props.type == 'TRASH' ? '.6rem' : '1rem')};

            .username-reply {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                position: relative;
                bottom: .075rem;
                margin-right: .2rem;
                word-spacing: 0;
                white-space: nowrap;
            }
        }
    }

    @media (max-width: 768px) {
        .message-box {
            max-width: 80%;
            border-radius: ${(props) =>
                props.localuser
                    ? props.messageposition == 0
                        ? '20px'
                        : props.messageposition == 1
                        ? '20px 20px 5px 20px'
                        : props.messageposition == 2
                        ? '20px 5px 5px 20px'
                        : props.messageposition == 3 && '20px 5px 20px 20px'
                    : props.messageposition == 0
                    ? '20px'
                    : props.messageposition == 1
                    ? '20px 20px 20px 5px'
                    : props.messageposition == 2
                    ? '5px 20px 20px 5px'
                    : props.messageposition == 3 && '5px 20px 20px 20px'};
        }
    }
`;

export default memo(Message);

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
import MessageLoader from './MessageLoader';
import MessageReplyIcon from './MessageReplyIcon';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';

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
    const { messageOptionsId, selectedMessages } = useSelector((store) => store.appStore);
    const { replyTo: replyToApp, loading } = useSelector((store) => store.sendMessageStore);

    const { selectMessage, checkMessage, unSelectMessage } = useSelect();
    const { replyMessage } = useMessageOptions();

    const [messagePosition, setMessagePosition] = useState(null);
    const [clickEvent, setClickEvent] = useState(null);
    const [selected, setSelected] = useState(false);
    const [hold, setHold] = useState(false);
    let timer;

    let letters;
    props.type != 'TRASH' && message?.map(item => letters =+ item.word.length);

    // either opens options, or selects
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
        checkMessage(id, selected, setSelected);
        if (!selectedMessages.length) {
            setHold(false);
        }
    }, [selectedMessages]);

    const onHoldStarts = () => {
        if (!selectedMessages.length && props.type == 'CHAT') {
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
            <MessageContainer
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
                letters={letters}
            >
                <ChatDate
                    layout={props.type == 'EDIT_REPLY' ? 0 : 1}
                    layoutId={props.type == 'EDIT_REPLY' ? id : null}
                    key='chat-date'
                    dateObj={time}
                    priorDifferentDate={priorDifferentDate}
                />
                <MessageUsername
                    username={messageUsername}
                    show={messageUid != localUid && messagePosition < 2}
                    chatdate={priorDifferentDate && time.year && time.month && time.day}
                    anymessageselected={selectedMessages.length ? 1 : 0}
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
                        <div className='reply'>
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

                <div className='options'>
                    <MessageOptions
                        clickEvent={clickEvent}
                        show={
                            messageOptionsId == id &&
                            props.type == 'CHAT' &&
                            !selectedMessages.length &&
                            time.hour != undefined
                        }
                        message={{
                            ...props.message,
                            isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                            isPersian: isRTL(message) ? 1 : 0,
                        }}
                        replyTo={replyToApp.id == id ? 1 : 0}
                    />
                </div>

                <MessageLoader time={time.hour} />

            </MessageContainer>
        </>
    );
};

const MessageContainer = styled(motion.div)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.localuser ? 'row-reverse' : 'row'};
    padding-top: ${props => props.messageposition < 2 && !props.localuser && !props.chatdate ? '1.8rem' : props.messageposition < 2 && !props.localuser && props.chatdate ? '3rem' : props.chatdate ? '1.8rem' : ''};
    position: relative;
    transition: padding 0.4s;

    .options {
        display: flex;
        justify-content: ${(props) => props.localuser ? 'flex-end' : 'flex-start'};
        align-items: center;
    }

    .message-box {
        z-index: 1;
        display: flex;
        justify-content: ${(props) => props.localuser ? 'flex-start' : 'flex-end'};
        align-items: center;
        background-color: ${(props) => props.selected ? 'var(--normal-bg-hover)' : 'var(--normal-bg)'};
        margin: ${(props) =>
            props.messageposition == 0
                ? '.1rem 0 .1rem 0'
                : props.messageposition == 1
                ? '.1rem 0 .06rem 0'
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
                ? '5px 25px 25px 25px'
                : props.messageposition == 1
                ? '5px 25px 25px 5px'
                : props.messageposition == 2
                ? '5px 25px 25px 5px'
                : props.messageposition == 3 && '5px 25px 25px 25px'};
        margin-right: ${(props) => props.type != 'TRASH' && props.anymessageselected && props.localuser ? '3rem' : ''};
        margin-left: ${(props) => props.type != 'TRASH' && props.anymessageselected && !props.localuser ? '3rem' : ''};
        padding: ${props => props.letters < 3 && !props.isreply ? ".45rem .8rem" : ".45rem .5rem"};
        width: fit-content;
        max-width: ${(props) => props.type == 'EDIT_REPLY' ? '80%' : '65%'};
        backdrop-filter: ${(props) =>
            props.type == 'CHAT' ? 'var(--normal-glass)' : 'blur(0)'};
        -webkit-backdrop-filter: ${(props) =>
            props.type == 'CHAT' ? 'var(--normal-glass)' : ''};
        font-weight: 200;
        word-break: break-all;
        cursor: pointer;
        box-shadow: ${props => props.blur ? "var(--bold-shadow)" : "var(--normal-shadow)"};
        color: var(--normal-color);
        transition: backdrop-filter 0.4s, border-radius 0.4s, margin 0.4s,
            background 0.4s, background 0.2s, padding 0.2s, box-shadow .2s;

        .message {
            text-align: ${(props) => (props.ispersian ? 'right' : 'left')};
            word-spacing: 1px;
            white-space: pre-wrap;
            word-break: ${(props) => (props.type == 'TRASH' ? '' : 'keep-all')};
            font-family: ${(props) =>
                    props.ispersian ? 'Vazirmatn' : 'Outfit'},
                'Vazirmatn', sans-serif;
            font-size: ${(props) => (props.type == 'TRASH' ? '.6rem' : '1rem')};

            .reply {
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

        &:hover {
            filter: ${props => props.blur ? "blur(0px)" : "blur(0px)"};
        }
    }

    @media (max-width: 768px) {
        .message-box {
            max-width: 85%;
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
                    ? '5px 20px 20px 20px'
                    : props.messageposition == 1
                    ? '5px 20px 20px 5px'
                    : props.messageposition == 2
                    ? '5px 20px 20px 5px'
                    : props.messageposition == 3 && '5px 20px 20px 20px'};
        }

        .options {
            position: absolute;
        }
    }
`;

export default memo(Message);

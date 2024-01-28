import React, { useState, useEffect, memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSelect } from '../../hooks/useSelect';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { isRTL } from '../../functions/isRlt';
import MessageOptions from './MessageOptions';
import MessageDate from './MessageDate';
import MessageReply from './MessageReply';
import MessageSelectCheck from './MessageSelectCheck';
import MessageUsername from './MessageUsername';
import MessageLoader from './MessageLoader';
import MessageReplyIcon from './MessageReplyIcon';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { messageVariants } from '../../config/varitans';

const Message = ({ message, type, options, onClick, replyIconClick, newreply }) => {
    const {
        messageUid,
        localUid,
        localMessage,
        text,
        plainText,
        isTextPersian,
        textLetters,
        id,
        replyTo,
        messageUsername,
        periorUsername,
        nextUsername,
        time,
        priorDifferentDate,
        nextDifferentDate,
    } = message;
    const { selectedMessages, scrollMessageId } = useSelector(store => store.appStore);
    const { selectMessage, checkMessage, unSelectMessage } = useSelect();
    const { replyMessage, addMessageScrollPosition, applyScrollMessageId } = useMessageOptions();
    const messageRef = useRef();
    const [messagePosition, setMessagePosition] = useState(null);
    const [selected, setSelected] = useState(false);
    const [replyEffect, setReplyEffect] = useState(false);
    const [status, setStatus] = useState(time?.year == undefined ? 1 : 0);
    const [hold, setHold] = useState(false);
    let timer;

    const messageClickHandler = () => {
        if (type == 'CHAT' || type == 'TRASH') {
            if (selectedMessages?.length || type == 'TRASH') {
                if (hold) {
                    setHold(false);
                } else if (selected && !hold) {
                    unSelectMessage(id);
                    setSelected(false);
                } else {
                    selectMessage({
                        ...message,
                        isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                        isPersian: isRTL(text) ? 1 : 0,
                    });
                }
            } else {
                if (options?.messageOptions?.id == id && type == 'CHAT') {
                    options.setMessageOptions(false);
                } else {
                    options.setMessageOptions(message);
                }
            }
        } else {
            onClick();
        }
    };

    const messageDoubleClickHandler = () => {
        if (!selectedMessages?.length && type == 'CHAT') {
            options.setMessageOptions(false);
            replyMessage(id, plainText, messageUsername);
        }
    };

    const onHoldStarts = () => {
        if (!selectedMessages?.length && type == 'CHAT') {
            timer = setTimeout(() => {
                selectMessage({
                    ...message,
                    isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                    isPersian: isRTL(text) ? 1 : 0,
                });
                setHold(true);
            }, 300);
        }
    };

    const onHoldEnds = () => {
        if (!selectedMessages?.length) {
            clearTimeout(timer);
            setHold(false);
        }
    };

    useEffect(() => {
        if (type == 'CHAT') {
            addMessageScrollPosition(id, messageRef.current?.getBoundingClientRect().top);
        }
        if (type == 'TRASH') {
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

    useEffect(() => {
        checkMessage(id, selected, setSelected);
        if (!selectedMessages?.length) {
            setHold(false);
        }
    }, [selectedMessages]);

    useEffect(() => {
        if (status == 1 && time.year && time.month && time.day && time.hour && time.minute && time.second) {
            setStatus(2);
            setTimeout(() => {
                setStatus(0);
            }, 1500);
        }
    }, [time]);

    useEffect(() => {
        if (scrollMessageId.id == id) {
            setReplyEffect(true);
            setTimeout(() => {
                setReplyEffect(false);
            }, 2000);
        }
    }, [scrollMessageId]);

    return (
        <>
            <MessageContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={messageVariants}
                ref={messageRef}
                layout={type == 'EDIT_REPLY' ? 0 : 1}
                layoutId={type == 'EDIT_REPLY' ? id : null}
                date={priorDifferentDate && time.year && time.month ? 1 : 0}
                type={type}
                localmessage={localMessage ? 1 : 0}
                persian={isTextPersian ? 1 : 0}
                letters={textLetters}
                position={messagePosition}
                selected={selected ? 1 : 0}
                messagesselected={selectedMessages.length ? 1 : 0}
                reply={replyTo != 'no_reply' ? 1 : 0}
                replyeffect={replyEffect ? 1 : 0}
            >
                <MessageDate
                    key='date'
                    layout={type == 'EDIT_REPLY' ? 0 : 1}
                    layoutId={type == 'EDIT_REPLY' ? id : null}
                    date={{
                        year: time.year,
                        month: time.month,
                        day: time.day
                    }}
                    show={priorDifferentDate && time.year && time.month && time.day}
                />
                <MessageUsername
                    show={messageUid != localUid && messagePosition < 2}
                    username={messageUsername}
                    dateShown={priorDifferentDate && time.year && time.month && time.day}
                    messagesSelected={selectedMessages.length ? 1 : 0}
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
                    <div className='message'>
                        <MessageReply replyTo={replyTo} type={type} applyScrollMessageId={applyScrollMessageId} />
                        {
                            type != 'TRASH' ?
                            text?.map((item, index) =>
                                item.link ?
                                <a
                                    key={index}
                                    className={type == 'EDIT_REPLY' ? 'disabled-link' : 'link'}
                                    href={item.word}
                                    target='_blank'
                                    rel='noopener nereferrer'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {item.word}
                                </a> :
                                index == text.length-1 ?
                                `${item.word}` :
                                `${item.word} `
                            ) :
                            text
                        }
                    </div>
                </div>
                <MessageSelectCheck
                    type={type}
                    selected={selected}
                    selectedMessagesLength={selectedMessages.length}
                    messageClickHandler={messageClickHandler}
                    localMessage={localMessage}
                />
                <MessageReplyIcon
                    editReply={newreply}
                    editReplyClick={replyIconClick}
                    show={newreply}
                />
                <div className='options'>
                    <MessageOptions options={options} id={id} />
                </div>
                <MessageLoader
                    status={status}
                />
            </MessageContainer>
        </>
    );
};

const MessageContainer = styled(motion.div)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${props => props.localmessage ? 'row-reverse' : 'row'};
    padding-top: ${props =>
        props.position < 2 && !props.localmessage && !props.date ?
        '1.8rem' :
        props.position < 2 && !props.localmessage && props.date ?
        '3rem' :
        props.date && '1.8rem'
    };
    transition: padding 0.4s;

    .options {
        display: flex;
        justify-content: ${props => props.localmessage ? 'flex-end' : 'flex-start'};
        align-items: center;
    }

    .message-box {
        z-index: 1;
        display: flex;
        justify-content: ${props => props.localmessage ? 'flex-start' : 'flex-end'};
        align-items: center;
        background-color: var(--normal-bg);
        margin: ${props =>
            props.type == 'TRASH' ?
            '.2rem' :
            props.position == 0 ?
            '.1rem 0 .1rem 0' :
            props.position == 1 ?
            '.1rem 0 .06rem 0' :
            props.position == 2 ?
            '.06rem 0 .06rem 0' :
            props.position == 3 &&
            '.06rem 0 .2rem 0'
        };
        margin-right: ${props =>
            props.type == 'TRASH' ?
            '2rem' :
            props.messagesselected && props.localmessage ?
            '3rem' :
            ''
        };
        margin-left: ${props =>
            props.type != 'TRASH' && props.messagesselected && !props.localmessage ?
            '3rem' :
            ''
        };
        border-radius: 25px;
        border-radius: ${props =>
            props.type == 'TRASH' ?
            '20px' :
            props.localmessage ?
            props.position == 0 ?
            '25px' : props.position == 1 ?
            '25px 25px 5px 25px' :
            props.position == 2 ?
            '25px 5px 5px 25px' :
            props.position == 3 &&
            '25px 5px 25px 25px' :
            props.position == 0 ?
            '5px 25px 25px 25px' :
            props.position == 1 ?
            '5px 25px 25px 5px' :
            props.position == 2 ?
            '5px 25px 25px 5px' :
            props.position == 3 &&
            '5px 25px 25px 25px'
        };
        padding: ${props =>
            props.type == 'TRASH' && props.letters > 3 ?
            '.45rem' :
            props.type == 'TRASH' && props.letters <= 3 ?
            '.45rem .8rem' :
            props.reply ?
            '.45rem .8rem .45rem .45rem' :
            props.letters <= 3 ?
            '.45rem 1rem' :
            props.letters > 3 ?
            '.45rem .7rem' : ''
        };
        width: fit-content;
        max-width: ${props => props.type == 'EDIT_REPLY' || props.type == 'TRASH' ? '80%' : '65%'};
        word-break: break-all;
        cursor: pointer;
        box-shadow: var(--normal-shadow);
        color: var(--normal-color);
        background-image: linear-gradient(
            90deg,
            #ffffff00 0%,
            #ffffff20 50%,
            #ffffff00 100%
        );
        background-position: left -20rem top 0;
        background-repeat: no-repeat;
        animation: ${props => props.selected || props.replyeffect ? 'skeleton-loading-message linear 1s' : ''};
        transition: border-radius .2s, margin .4s, background .2s, padding .2s;

        .message {
            text-align: ${props => props.persian ? 'right' : 'left'};
            word-spacing: 1px;
            white-space: pre-wrap;
            word-break: ${props => props.type == 'TRASH' ? '' : 'keep-all'};
            font-family: ${props => props.persian ? 'Vazirmatn' : 'Outfit'}, 'Vazirmatn', sans-serif;
            font-size: ${props => props.type == 'TRASH' ? '.7rem' : '1rem'};
            font-weight: 200;
        }
    }

    @media (max-width: 768px) {
        .message-box {
            max-width: 85%;
            border-radius: ${props => props.localmessage ?
                props.position == 0 ?
                '20px' :
                props.position == 1
                ? '20px 20px 5px 20px' :
                props.position == 2 ?
                '20px 5px 5px 20px' :
                props.position == 3 &&
                '20px 5px 20px 20px' :
                props.position == 0 ?
                '5px 20px 20px 20px' :
                props.position == 1 ?
                '5px 20px 20px 5px' :
                props.position == 2 ?
                '5px 20px 20px 5px' :
                props.position == 3 &&
                '5px 20px 20px 20px'
            };
        }

        .options {
            position: absolute;
        }
    }
`;

export default memo(Message);

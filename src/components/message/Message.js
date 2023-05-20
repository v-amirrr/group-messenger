import React, { forwardRef, useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../../redux/popupSlice';
import { setMessageIdOptionsShow } from '../../redux/userSlice';
import { useSelect } from '../../hooks/useSelect';
import MessageOptions from '../message/MessageOptions';
import ChatDate from '../ChatDate';
import MessageTime from './MessageTime';
import MessageReply from './MessageReply';
import { isRTL } from '../../functions/isRlt';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import SelectCheck from './SelectCheck';

const Message = forwardRef(( props, ref ) => {

    const { messageUid, localUid, localUsername, message, id, replyTo, messageUsername, periorUsername, nextUsername, time, priorDifferentDate, nextDifferentDate } = props.message;

    const dispatch = useDispatch();

    const { selectMessage, checkMessage, unSelectMessage } = useSelect();

    const { popupShow, popupName } = useSelector(store => store.popupStore);
    const { messageIdOptionsShow, selectedMessages } = useSelector(store => store.userStore);

    const [messagePosition, setMessagePosition] = useState(null);
    const [clickEvent, setClickEvent] = useState(null);
    const [selected, setSelected] = useState(false);

    const messageClickHandler = (e) => {
        if (selectedMessages.length) {
            if (selected) {
                unSelectMessage(id);
                setSelected(false);
            } else {
                selectMessage({                            
                    isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                    messageText: message,
                    id: id,
                    replyTo: replyTo,
                    time: time,
                    messagePosition: messagePosition,
                    isPersian: isRTL(message) ? 1 : 0,
                });
            }
        } else {
            if (messageIdOptionsShow == id) {
                dispatch(setMessageIdOptionsShow(null));
                setClickEvent(null);
            } else {
                dispatch(setMessageIdOptionsShow(id));
                setClickEvent(e);
            }
        }
    };

    // detect message's position in order to set its border-radius
    useEffect(() => {
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
    }, [nextUsername, periorUsername, priorDifferentDate, nextDifferentDate]);

    useEffect(() => {
        if (!popupShow && popupName) {
            setTimeout(() => {
                dispatch(setPopup({ show: true, type: popupName }));
            }, 300);
        }
    }, [popupShow, popupName]);

    // check the selected messages in order to detect select bar's options
    useEffect(() => {
        checkMessage(id, selected, setSelected, localUid);
    }, [selectedMessages]);

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                <ChatDate key="chat-date" dateObj={time} priorDifferentDate={priorDifferentDate} />
            </AnimatePresence>

            <MessageBox key={id} ref={ref} isMessageFromLocalUser={messageUid == localUid ? 1 : 0} ispersian={isRTL(message) ? 1 : 0} messagePosition={messagePosition} isreply={replyTo != "no_reply" ? 1 : 0} selected={selected ? 1 : 0} anymessageselected={selectedMessages.length ? 1 : 0}>

                <div className='message-box' onClick={(e) => messageClickHandler(e)}>
                    <MessageReply replyTo={replyTo} />

                    <p className='username'>
                        {messageUsername}
                    </p>

                    <p className='message'>
                        {message?.map((item, index) => (
                            item.link ? <a key={index} className='link' href={item.word} target="_blank" rel='noopener nereferrer'>{item.word}</a> : `${item.word} `
                        ))}
                    </p>

                    <AnimatePresence>
                        <MessageTime time={time} messagePosition={messagePosition} isMessageFromLocalUser={messageUid == localUid ? 1 : 0} />
                    </AnimatePresence>
                </div>

                <SelectCheck selected={selected} selectedMessagesLength={selectedMessages.length} />

                <AnimatePresence>
                    {messageIdOptionsShow == id ? 
                    <MessageOptions
                        clickEvent={clickEvent}
                        message={{
                            isMessageFromLocalUser: messageUid == localUid ? 1 : 0,
                            messageText: message,
                            id: id,
                            replyTo: replyTo,
                            time: time,
                            messagePosition: messagePosition,
                            isPersian: isRTL(message) ? 1 : 0,
                        }}
                    />
                    : ""}
                </AnimatePresence>
            </MessageBox>
        </>
    );
});

const MessageBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: ${ props => props.isMessageFromLocalUser ? "row-reverse" : "row"};
    user-select: none;

    .message-box {
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: ${ props => props.isMessageFromLocalUser ? "row-reverse" : "row"};
        background-color: ${props => props.selected ? "var(--message-selected)" : "var(--message)"};
        margin: ${props => 
            props.messagePosition == 0 ? 
            ".2rem 0 .2rem 0" : 
            props.messagePosition == 1 ? 
            ".2rem 0 .04rem 0" : 
            props.messagePosition == 2 ? 
            ".04rem 0 .04rem 0" : 
            props.messagePosition == 3 && 
            ".04rem 0 .2rem 0"
        };
        border-radius: ${props => 
            props.isMessageFromLocalUser ? 
                props.messagePosition == 0 ? 
                "25px" : 
                props.messagePosition == 1 ? 
                "25px 25px 2px 25px" : 
                props.messagePosition == 2 ? 
                "25px 2px 2px 25px" : 
                props.messagePosition == 3 && 
                "25px 2px 25px 25px" :
            props.messagePosition == 0 ? 
                "25px" : 
                props.messagePosition == 1 ? 
                "25px 25px 25px 2px" : 
                props.messagePosition == 2 ? 
                "5px 25px 25px 2px" : 
                props.messagePosition == 3 && 
                "2px 25px 25px 25px"
        };
        margin-right: ${props => props.anymessageselected ? "3rem" : ""};
        padding: ${props => props.isreply ? "2.4rem 2.8rem .5rem .8rem" : ".5rem 2.8rem .5rem .8rem"};
        min-width: ${props => props.isreply ? "22%" : ""};
        width: fit-content;
        max-width: 65%;
        backdrop-filter: var(--message-blur);
        -webkit-backdrop-filter: var(--message-blur);
        font-weight: 200;
        word-break: break-all;
        cursor: pointer;
        transition: backdrop-filter .4s, border-radius .4s, margin .4s, background .2s;

        .username {
            display: ${props => props.isMessageFromLocalUser ? "none" : ""};
            color: var(--message-username);
            font-size: .7rem;
            font-weight: 300;
            margin-right: .5rem;
            margin-left: -.2rem;
            white-space: nowrap;
        }
    
        .message {
            text-align: ${props => props.ispersian ? "right" : "left"};
            word-spacing: 1px;
            line-break: loose;
            word-break: keep-all;
            white-space: pre-wrap;
            font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
            font-size: 1rem;
        }
    }

    @media (max-width: 768px) {
        .message-box {
            padding: ${props => props.isreply ? "2.4rem 2.5rem .5rem .8rem" : ".5rem 2.5rem .5rem .8rem"};
            max-width: 80%;
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

        .username {
            font-size: .5rem;
            margin-right: .4rem;
        }

        .message {
            font-size: .8rem;
        }
    }
`;

export default memo(Message);
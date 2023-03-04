import React, { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../../redux/popupSlice';
import { isRTL } from '../../functions/isRlt';
import Popups from '../Popups';
import MessageOptions from '../MessageOptions';
import ChatDate from '../ChatDate';
import MessageTime from './MessageTime';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Message = forwardRef(( props, ref ) => {

    const [menuShow, setMenuShow] = useState(false);
    const [messagePosition, setMessagePosition] = useState("");

    const dispatch = useDispatch();
    const { popupShow, popupName, popupMessageId } = useSelector(store => store.popupStore);

    const {
        message,
        id,
        replyTo,
        messageUsername,
        periorUsername,
        nextUsername,
        time,
        localUsername,
        priorDifferentDate,
        nextDifferentDate
    } = props.message;

    useEffect(() => {
        if (priorDifferentDate && nextDifferentDate) {
            setMessagePosition(0);
        }

        if (priorDifferentDate && !nextDifferentDate) {
            if (nextUsername == messageUsername) {
                setMessagePosition(1);
            } else {
                setMessagePosition(0);
            }
        }

        if (!priorDifferentDate && nextDifferentDate) {
            if (periorUsername == messageUsername) {
                setMessagePosition(3);
            } else {
                setMessagePosition(0);
            }
        }

        if (!priorDifferentDate && !nextDifferentDate) {
            if (periorUsername != messageUsername && nextUsername != messageUsername) {
                setMessagePosition(0);
            } else if (periorUsername != messageUsername && nextUsername == messageUsername) {
                setMessagePosition(1);
            } else if (periorUsername == messageUsername && nextUsername == messageUsername) {
                setMessagePosition(2);
            } else if (periorUsername == messageUsername && nextUsername != messageUsername) {
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

    return (
        <>
            {priorDifferentDate ? <ChatDate dateObj={time} /> : ""}

            <MessageBox key={id} ref={ref} onClick={() => setMenuShow(!menuShow)} isuser={messageUsername == localUsername ? 1 : 0} ispersian={isRTL(message) ? 1 : 0} messagePosition={messagePosition} isreply={replyTo != "no_reply" ? 1 : 0}>
                {replyTo != "no_reply" ? 
                <div className='reply-section'>
                    {replyTo ? 
                    <>
                        <p className='reply-username'>{replyTo?.username}</p>
                        <p className='reply-message'>{replyTo?.message}</p>
                    </>
                    : <p className='reply-message'>Deleted Message</p>}
                </div>
                : ""}
                <p className='username'>{messageUsername}</p>
                <p className='message'>
                    {message?.map((item, index) => (
                        item.link ? <a key={index} className='link' href={item.word} target="_blank" rel='noopener nereferrer'>{item.word}</a> : `${item.word} `
                    ))}
                </p>

                <AnimatePresence>
                    <MessageTime hour={time.hour} minute={time.minute} messagePosition={messagePosition} />
                </AnimatePresence>

                <AnimatePresence>
                    {menuShow ? 
                    <MessageOptions 
                        messageUsername={messageUsername} 
                        localUsername={localUsername} 
                        isUser={messageUsername == localUsername}
                        id={id} 
                        message={message} 
                        username={messageUsername}
                    /> : ""}
                </AnimatePresence>
            </MessageBox>

            {createPortal(
                <AnimatePresence exitBeforeEnter>
                    {popupShow && popupMessageId == id ?
                    <Popups
                        popupMessageId={popupMessageId}
                        popupMessageText={message}
                        popupName={popupName}
                        popupMessageReplyTo={replyTo}
                    /> : ""}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
});

const MessageBox = styled.div`
    display: flex;
    justify-content: ${props => props.isuser ? "flex-end" : ""};
    align-items: center;
    flex-direction: ${ props => props.isuser ? "row-reverse" : "row"};
    background-color: #ffffff0c;
    margin: ${props => 
        props.messagePosition == 0 ? 
        ".4rem 0" : 
        props.messagePosition == 1 ? 
        ".4rem 0 .1rem 0" : 
        props.messagePosition == 2 ? 
        ".1rem 0" : 
        props.messagePosition == 3 && 
        ".1rem 0 .4rem 0"
    };
    border-radius: ${props => 
        props.isuser ? 
            props.messagePosition == 0 ? 
            "30px" : 
            props.messagePosition == 1 ? 
            "30px 30px 5px 30px" : 
            props.messagePosition == 2 ? 
            "30px 5px 5px 30px" : 
            props.messagePosition == 3 && 
            "30px 5px 30px 30px" :
        props.messagePosition == 0 ? 
            "30px" : 
            props.messagePosition == 1 ? 
            "30px 30px 30px 5px" : 
            props.messagePosition == 2 ? 
            "5px 30px 30px 5px" : 
            props.messagePosition == 3 && 
            "5px 30px 30px 30px"
    };
    margin-left: ${props => props.isuser && "auto"};
    padding: ${props => props.isreply ? "2.4rem 2.8rem .5rem .8rem" : ".5rem 2.8rem .5rem .8rem"};
    min-width: ${props => props.isreply ? "22%" : ""};
    width: fit-content;
    max-width: 65%;
    backdrop-filter: blur(5px) saturate(100%);
    -webkit-backdrop-filter: blur(5px) saturate(100%);
    font-weight: 200;
    word-break: break-all;
    cursor: pointer;
    transition: backdrop-filter .4s, border-radius .4s;
    user-select: none;

    .username {
        display: ${props => props.isuser ? "none" : ""};
        color: #aaa;
        font-size: .7rem;
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

    .reply-section {
        background: linear-gradient(39deg, rgba(0,59,94,1) 0%, rgba(0,26,42,1) 0%, rgba(0,27,43,1) 1%, rgba(0,0,0,1) 50%, rgba(0,22,27,1) 99%, rgba(0,27,33,1) 100%, rgba(0,69,83,1) 100%);
        position: absolute;
        top: .4rem;
        left: 50%;
        padding: .3rem;
        width: 90%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #888;
        transform: translate(-50%, 0);
        border-radius: 30px;
        white-space: nowrap;
        overflow: hidden;
        
        .reply-username {
            font-size: .5rem;
            margin: 0 .2rem;
        }
        
        .reply-message {
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: .8rem;

            :after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 30%;
                height: 100%;
                pointer-events: none;
                background-image: linear-gradient(to right, transparent, #000000);
                display: none;
            }
        }
    }

    @media (max-width: 768px) {
        padding: ${props => props.isreply ? "2.4rem 2.5rem .5rem .8rem" : ".5rem 2.5rem .5rem .8rem"};
        max-width: 80%;
        min-width: ${props => props.isreply ? "30%" : ""};
        background-color: #ffffff10;
        border-radius: ${props => 
            props.isuser ? 
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

        .username {
            font-size: .5rem;
            margin-right: .4rem;
        }

        .message {
            font-size: .8rem;
        }

        .time {
            font-size: .45rem;
        }
    }
`;

export default Message;
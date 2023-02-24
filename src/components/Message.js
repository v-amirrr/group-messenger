import React, { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../redux/messagesSlice';
import { isRTL } from '../functions/isRlt';
import Popups from './Popups';
import MessageOptions from './MessageOptions';
import ChatDate from './ChatDate';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const timeVariants = {
    hidden: { opacity: 0, x: 20, y: 20, scale: 0 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.4, type: 'tween' } }
};

const Message = forwardRef(( props, ref ) => {

    const dispatch = useDispatch();
    const { popup } = useSelector(store => store.messagesStore);
    
    const { message, id, replyTo, messageUsername, periorUsername, nextUsername, time, localUsername, priorDifferentDate, nextDifferentDate } = props.message;

    const [menuShow, setMenuShow] = useState(false);
    const [messagePosition, setMessagePosition] = useState("");

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
        if (!popup.show && popup.type) {
            setTimeout(() => {
                dispatch(setPopup({ show: true, type: popup.type }));
            }, 300);
        }
    }, [popup]);

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
                        item.link ? <a key={index} className='link' href={item.word} target="_blank">{item.word}</a> : `${item.word} `
                    ))}
                </p>

                <AnimatePresence>
                    {time.hour != null && time.minute != null ?
                    <motion.span className='time' initial='hidden' animate='visible' exit='exit' variants={timeVariants}>
                        {time.hour < 10 ? `0${time.hour}` : time.hour}:{time.minute < 10 ? `0${time.minute}` : time.minute}
                    </motion.span> : ""}
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
                    {popup.show && popup.id == id ?
                    <Popups
                        id={id}
                        message={message}
                        type={popup.type}
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
    display: flex;
    align-items: center;
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

    .time {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: .5rem;
        font-weight: 500;
        letter-spacing: .5px;
        color: #ffffff55;
        white-space: nowrap;
        margin: ${props => 
            props.isuser ? 
                props.messagePosition == 0 ? 
                ".6rem .5rem" : 
                props.messagePosition == 1 ? 
                ".3rem .5rem" : 
                props.messagePosition == 2 ? 
                ".3rem .5rem" : 
                props.messagePosition == 3 && 
                ".6rem .5rem" :
            ".3rem .8rem"
        };
        transform: margin .4s;
    }

    .reply-section {
        background-color: #00000055;
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
        transition: background .2s;
        overflow: hidden;

        .reply-username {
            font-size: .5rem;
            margin: 0 .2rem;
        }

        .reply-message {
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
            }
        }

        &:hover {
            background-color: #000;
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
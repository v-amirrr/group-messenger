import React, { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isRTL } from '../functions/isRlt';
import Popups from './Popups';
import MessageOptions from './MessageOptions';
import { setPopup } from '../redux/messagesSlice';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const timeVariants = {
    hidden: { opacity: 0, x: 20, y: 20, scale: 0 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.4, type: 'tween' } }
};

const Message = forwardRef(( props, ref ) => {

    const dispatch = useDispatch();
    const { popup } = useSelector(store => store.messagesStore);
    
    const { message, id, messageUsername, periorUsername, nextUsername, time, localUsername } = props.message;

    const [menuShow, setMenuShow] = useState(false);
    const [messageStyle, setMessageStyle] = useState("");

    useEffect(() => {
        if (periorUsername == messageUsername && nextUsername == messageUsername) {
            setMessageStyle(2);
        } else if (periorUsername != messageUsername && nextUsername != messageUsername) {
            setMessageStyle(0);
        } else if (periorUsername != messageUsername && nextUsername == messageUsername) {
            setMessageStyle(1);
        } else if (periorUsername == messageUsername && nextUsername != messageUsername) {
            setMessageStyle(3);
        }
    }, [periorUsername, nextUsername]);

    useEffect(() => {
        if (!popup.show && popup.type) {
            setTimeout(() => {
                dispatch(setPopup({ show: true, type: popup.type }));
            }, 300);
        }
    }, [popup]);

    return (
        <>
            <MessageBox 
                key={id} 
                ref={ref} 
                isuser={messageUsername == localUsername ? 1 : 0} 
                ispersian={isRTL(message) ? 1 : 0} 
                messageStyle={messageStyle} 
                onClick={() => setMenuShow(prevState => !prevState)}
            >
                <p className='username'>{messageUsername}</p>
                <p className='message'>
                    {message?.map((item, index) => (
                        item.link ? <a key={index} className='link' href={item.word} target="_blank">{item.word}</a> : `${item.word} `
                    ))}
                </p>

                <AnimatePresence>
                    {time.hour != null && time.minute != null ?
                    <motion.span className='time' initial='hidden' animate='visible' exit='exit' variants={timeVariants}>
                        {time.hour < 10 ? 
                        `0${time.hour}` : 
                        time.hour}:{time.minute < 10 ? 
                        `0${time.minute}` : 
                        time.minute}
                    </motion.span> : ""}
                </AnimatePresence>

                <AnimatePresence>
                    {menuShow ? 
                    <MessageOptions 
                        messageUsername={messageUsername} 
                        localUsername={localUsername} 
                        id={id} 
                        message={message}
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
    align-items: center;
    background-color: #ffffff0c;
    margin: ${props => 
        props.messageStyle == 0 ? 
        ".4rem 0" : 
        props.messageStyle == 1 ? 
        ".4rem 0 .1rem 0" : 
        props.messageStyle == 2 ? 
        ".1rem 0" : 
        props.messageStyle == 3 && 
        ".1rem 0 .4rem 0"
    };
    margin-left: ${props => props.isuser && "auto"};
    padding: .5rem 2.8rem .5rem 1rem;
    border-radius: ${props => 
        props.isuser ? 
            props.messageStyle == 0 ? 
            "30px" : 
            props.messageStyle == 1 ? 
            "30px 30px 5px 30px" : 
            props.messageStyle == 2 ? 
            "30px 5px 5px 30px" : 
            props.messageStyle == 3 && 
            "30px 5px 30px 30px" :
        props.messageStyle == 0 ? 
            "30px" : 
            props.messageStyle == 1 ? 
            "30px 30px 30px 5px" : 
            props.messageStyle == 2 ? 
            "5px 30px 30px 5px" : 
            props.messageStyle == 3 && 
            "5px 30px 30px 30px"
    };
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
                props.messageStyle == 0 ? 
                ".6rem .5rem" : 
                props.messageStyle == 1 ? 
                ".3rem .5rem" : 
                props.messageStyle == 2 ? 
                ".3rem .5rem" : 
                props.messageStyle == 3 && 
                ".6rem .5rem" :
            ".3rem .8rem"
        };
        transform: margin .4s;
    }

    @media (max-width: 768px) {
        padding: .5rem 2.5rem .5rem .8rem;
        max-width: 80%;
        background-color: #ffffff10;
        border-radius: ${props => 
            props.isuser ? 
                props.messageStyle == 0 ? 
                "20px" : 
                props.messageStyle == 1 ? 
                "20px 20px 5px 20px" : 
                props.messageStyle == 2 ? 
                "20px 5px 5px 20px" : 
                props.messageStyle == 3 && 
                "20px 5px 20px 20px" :
            props.messageStyle == 0 ? 
                "20px" : 
                props.messageStyle == 1 ? 
                "20px 20px 20px 5px" : 
                props.messageStyle == 2 ? 
                "5px 20px 20px 5px" : 
                props.messageStyle == 3 && 
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
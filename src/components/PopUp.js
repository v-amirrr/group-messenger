import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { isRTL } from '../functions/isRlt';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const popUpPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, type: 'tween', when: "afterChildren" } }
};

const popUpContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { staggerChildren: 0.1, when: "afterChildren" } }
};

const popUpItemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: { opacity: 1, y: [-20, 20, 0], scale: 1, transition: { duration: 0.3, type: 'tween' } },
    exit: { opacity: 0, y: 20, scaleX: 0, transition: { duration: 0.3, type: 'tween' } }
};

const PopUp = () => {

    const [warningPopup, setWarningPopup] = useState(!!sessionStorage.getItem("warning"));
    const [usernamePopup, setUsernamePopup] = useState(!!localStorage.getItem("username"));

    const [nameInput, setNameInput] = useState("");

    const messages = useSelector(store => store.messagesStore.messages);

    const warningPopUpSubmitHandler = e => {
        e.preventDefault();
        sessionStorage.setItem("warning", "true");
        setWarningPopup(!!sessionStorage.getItem("warning"));
    };

    const getNameamePopUpSubmitHandler = e => {
        e.preventDefault();

        let sameName = false;

        if (messages.length) {
            messages.map(message => {
                if (message.username.toLowerCase() == nameInput.toLowerCase()) {
                    sameName = true;
                }
            });

            if (sameName) {
                alert("The name you've choosen is already used. Please choose another name.");
                setNameInput("");
            } else {
                localStorage.setItem("username", JSON.stringify(nameInput));
                setNameInput("");
                setUsernamePopup(!!localStorage.getItem("username"));
            }
        } else {
            alert("There's a problem in your connection. If you're in sanctioned countries like Iran, you have to use VPN. If you're already using VPN please use another VPN (also you can use shecan.ir).");
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    !warningPopup || !usernamePopup
                    ?
                    <PopUpPage initial='hidden' animate='visible' exit='exit' variants={popUpPageVariants}>
                        <AnimatePresence exitBeforeEnter>
                            {
                                !warningPopup
                                ?
                                    <PopUpContainer initial='hidden' animate='visible' exit='exit' key="warning-popup" variants={popUpContainerVariants}>
                                        <motion.h1 variants={popUpItemVariants} className='popup-title'>things you need to know</motion.h1>
                                        <motion.p variants={popUpItemVariants} className='popup-warning'>If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> for using this app.</motion.p>
                                        <motion.p variants={popUpItemVariants} className='popup-text'>
                                            In this app you can send a message and also you can delete any of your messages. For deleting a message just click on the message and the delete icon will appear. So feel free to send your messages.
                                        </motion.p>
                                        <motion.button variants={popUpItemVariants} type="submit" className='popup-button' onClick={warningPopUpSubmitHandler}>let's go</motion.button>
                                    </PopUpContainer>
                                :
                                warningPopup && !usernamePopup
                                ?
                                    <PopUpContainer initial='hidden' animate='visible' exit='exit' key="getname-popup" variants={popUpContainerVariants}>
                                        <form>
                                            <input
                                                type="text"
                                                className='popup-input'                          
                                                placeholder="Please Enter Your Name..."
                                                dir="auto"
                                                value={nameInput}
                                                onChange={e => setNameInput(e.target.value)}
                                                ispersian={isRTL(nameInput)}
                                                autoFocus
                                            />
                                            <motion.button type="submit" className='popup-button' disabled={!nameInput} onClick={getNameamePopUpSubmitHandler}>OK</motion.button>
                                        </form>
                                    </PopUpContainer>
                                :
                                ""
                            }
                        </AnimatePresence>
                    </PopUpPage>
                    :
                    ""
                }
            </AnimatePresence>
        </>
    );
};

const PopUpPage = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000aa;
    backdrop-filter: blur(15px) saturate(100%);
    -webkit-backdrop-filter: blur(15px) saturate(100%);
    position: absolute;
    z-index: 2;
`;

const PopUpContainer = styled(motion.div)`
    max-width: 40rem;
    max-height: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .popup-title {
        text-transform: uppercase;
        letter-spacing: -2px;
        word-spacing: 6px;
    }

    .popup-warning {
        margin: 1rem 0;
        color: #ff0000;
        font-weight: 400;
    }
    
    .popup-text {
        margin-bottom: 1rem;
        word-spacing: 2px;
        font-weight: 400;
        font-size: .8rem;
        color: #ccc;
        width: 60%;
    }

    .popup-button {
        margin-top: .5rem;
        font-size: 1rem;
        font-weight: 600;
        width: 50%;
        padding: .5rem 0;
        border-radius: 50px;
        border: none;
        background-color: #ffffff11;
        text-transform: uppercase;
        user-select: none;
        transition: background .3s, color .3s;
        
        &:not([disabled]) {
            cursor: pointer;
        }

        &:hover:not([disabled]) {
            background-color: #ffffff15;
        }

        &:active:not([disabled]) {
            background-color: #ffffff22;
        }
    }
    
    .popup-input {
        color: #fff;
        padding: 1rem;
        border: none;
        background-color: #00000000;
        font-size: 1rem;
        text-align: center;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-weight: 200;
    }

    @media (max-width: 900px) {
        max-width: 90%;
        max-height: 40%;
        padding: .5rem;

        .popup-title {
            font-size: 1.2rem;
        }

        .popup-warning {
            font-size: .8rem;
        }
    
        .popup-text {
            font-size: .6rem;
            width: 80%;
        }
    }
`;

export default PopUp;
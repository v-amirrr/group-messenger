import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isRTL } from '../functions/isRlt';
import { setLocalUsername } from '../redux/messagesSlice';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const modalPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.2, type: 'tween', when: "afterChildren" } }
};

const modalContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, type: 'tween' } }
};

const sameNameVariants = {
    hidden: { opacity: 0, y: -30, scaleX: 0.5 },
    visible: { opacity: 1, y: 0, scaleX: 1, transition: { duration: 0.2, type: 'tween' } },
    exit: { opacity: 0, y: -30, scaleY: 0, transition: { duration: 0.2, type: 'tween' } }
};

const Modals = () => {

    const dispatch = useDispatch();

    const [warningPopup, setWarningPopup] = useState(!!sessionStorage.getItem("warning"));
    const [usernamePopup, setUsernamePopup] = useState(!!localStorage.getItem("username"));
    const [warningModalCheckbox, setWarningModalCheckbox] = useState(false);
    const [sameNameShow, setSameNameShow] = useState(false);

    const [nameInput, setNameInput] = useState("");

    const messages = useSelector(store => store.messagesStore.messages);
    
    let sameName = false;

    const warningPopUpSubmitHandler = e => {
        e.preventDefault();
        sessionStorage.setItem("warning", "true");
        setWarningPopup(!!sessionStorage.getItem("warning"));
        if (warningModalCheckbox) {
            localStorage.setItem("warning-check", "true");
        }
    };
    
    const getNameamePopUpSubmitHandler = e => {
        e.preventDefault();

        if (messages.length) {
            messages.map(message => {
                if (message.username.toLowerCase() == nameInput.toLowerCase()) {
                    sameName = true;
                }
            });

            if (!sameName) {
                localStorage.setItem("username", JSON.stringify(nameInput));
                dispatch(setLocalUsername(nameInput));
                setUsernamePopup(!!localStorage.getItem("username"));
            } else {
                setSameNameShow(true);
                setTimeout(() => {
                    setSameNameShow(false);
                }, 3000);
            }
        } else {
            alert("There's a problem in your connection. If you're in sanctioned countries like Iran, you have to use VPN. If you're already using VPN please use another VPN (also you can use shecan.ir).");
        }
    };

    useEffect(() => {
        if (!!localStorage.getItem("warning-check")) {
            setWarningPopup(true);
        }
    }, []);

    return (
        <>
            <AnimatePresence>
                {!warningPopup || !usernamePopup ?
                    <ModalPage initial='hidden' animate='visible' exit='exit' variants={modalPageVariants}>
                        <AnimatePresence exitBeforeEnter>
                            {!warningPopup ?
                                <ModalContainer initial='hidden' animate='visible' exit='exit' key="warning-popup" variants={modalContainerVariants}>
                                    <h1 className='modal-title'>things you need to know</h1>
                                    <p className='modal-warning'>
                                        If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> in order to use this app.
                                    </p>
                                    <p className='modal-text'>
                                        In this app you can send a message and also you can delete any of your messages. For deleting a message just click on the message and the delete icon will appear. So feel free to send your messages.
                                    </p>
                                    <div className='modal-warning-checkbox' onClick={() => setWarningModalCheckbox(!warningModalCheckbox)}>
                                        <p>Don't show this again. </p>
                                        <input type="checkbox" checked={warningModalCheckbox} onChange={() => setWarningModalCheckbox(!warningModalCheckbox)} />
                                    </div>
                                    <motion.button type="submit" className='modal-button' onClick={warningPopUpSubmitHandler}>let's go</motion.button>
                                </ModalContainer> :
                            warningPopup && !usernamePopup ?
                                <ModalContainer initial='hidden' animate='visible' exit='exit' key="getname-popup" variants={modalContainerVariants}>
                                    <form>
                                        <input
                                            type="text"
                                            className='modal-input'                          
                                            placeholder="Your Name..."
                                            dir="auto"
                                            value={nameInput}
                                            onChange={e => setNameInput(e.target.value)}
                                            ispersian={isRTL(nameInput)}
                                            autoFocus
                                        />
                                        <motion.button type="submit" className='modal-button' disabled={!nameInput} onClick={getNameamePopUpSubmitHandler}>OK</motion.button>

                                        <AnimatePresence>
                                            {sameNameShow &&
                                                <motion.div className='same-name' initial='hidden' animate='visible' exit='exit' variants={sameNameVariants}>
                                                    <p>
                                                        <span>{nameInput}</span> is already taken by somebody else. Please choose another name.
                                                    </p>
                                                </motion.div>
                                            }
                                        </AnimatePresence>
                                    </form>
                                </ModalContainer>
                            : ""}
                        </AnimatePresence>
                    </ModalPage>
                : "" }
            </AnimatePresence>
        </>
    );
};

const ModalPage = styled(motion.section)`
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

const ModalContainer = styled(motion.div)`
    max-width: 40rem;
    max-height: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .modal-title {
        text-transform: uppercase;
        letter-spacing: -2px;
        word-spacing: 6px;
    }

    .modal-warning {
        margin: 1rem 0;
        color: #ff0000;
        font-weight: 400;
    }

    .modal-warning-checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row-reverse;
        margin: .5rem;
        user-select: none;
        cursor: pointer;

        p {
            font-weight: 200;
            font-size: .8rem;
        }

        input {
            display: flex;
            justify-content: center;
            align-items: center;
            width: .8rem;
            height: .8rem;
            margin: 0 .4rem;
        }
    }
    
    .modal-text {
        margin-bottom: 1rem;
        word-spacing: 2px;
        font-weight: 400;
        font-size: .8rem;
        color: #ccc;
        width: 60%;
    }

    .modal-button {
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

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover:not([disabled]) {
                background-color: #ffffff15;
            }
        }

        &:active:not([disabled]) {
            background-color: #ffffff22;
        }
    }
    
    .modal-input {
        color: #fff;
        padding: 1rem;
        border: none;
        background-color: #00000000;
        font-size: 1rem;
        text-align: center;
        font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-weight: 200;
    }

    .same-name {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            margin: 1rem;
            padding: 1rem;
            background-color: #ffffff11;
            border-radius: 20px;
            font-size: .8rem;
            font-weight: 200;
        }

        span {
            font-weight: 600;
        }
    }

    @media (max-width: 900px) {
        max-width: 90%;
        max-height: 40%;
        padding: .5rem;

        .modal-title {
            font-size: 1.2rem;
        }

        .modal-warning {
            font-size: .8rem;
        }
    
        .modal-text {
            font-size: .6rem;
            width: 80%;
        }

        .modal-button {
            width: 70%;
        }
    }
`;

export default Modals;
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { isRTL } from '../functions/isRlt';

import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const popUpPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween', when: "beforeChildren", childrenDelay: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const popUpContainerVariants = {
    hidden: { opacity: 0, scaleY: 0.8 },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.2, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, scaleY: 0.8, transition: { duration: 0.2, type: 'tween', when: "afterChildren" } }
};

const PopUp = () => {

    const [name, setName] = useState(false);
    const [vpn, setVpn] = useState(false);
    const [nameInput, setNameInput] = useState("");

    const messages = useSelector(state => state.messagesState.messages);

    useEffect(() => {
        if (!!localStorage.getItem("username") == true) {
            setName(false);
        } else {
            setName(true);
        }

        if (!!sessionStorage.getItem("vpn") == true) {
            setVpn(false);
        } else {
            setVpn(true);
        }
    }, []);
    
    const vpnPopUpSubmitHandler = e => {
        e.preventDefault();
        setVpn(false);
        sessionStorage.setItem("vpn", "true");
    };
    
    const namePopUpSubmitHandler = e => {
        e.preventDefault();

        let sameName = false;

        messages.map(message => {
            if (message.username.toLowerCase() == nameInput.toLowerCase()) {
                sameName = true;
            }
        });

        if (sameName) {
            alert("The name you've choosen is already used. Please choose another name.");
            setNameInput("");
        } else {
            setName(false);
            localStorage.setItem("username", JSON.stringify(nameInput));
            setNameInput("");
        }
    };

    return (
        <>
            <AnimatePresence>
                {
                    name
                    &&
                    <PopUpPage initial='hidden' animate='visible' exit='exit' variants={popUpPageVariants}>
                        <PopUpContainer variants={popUpContainerVariants}>
                            <form>
                                <input
                                    type="text"
                                    className='popup-input'                            
                                    placeholder="Please Enter Your Name..." 
                                    autoFocus 
                                    value={nameInput}
                                    onChange={e => setNameInput(e.target.value)}
                                    dir="auto"
                                    isPersian={isRTL(nameInput)}
                                />
                                <motion.button whileTap={nameInput && { scale: 0.8 }} type="submit" disabled={!nameInput} className='popup-button' onClick={namePopUpSubmitHandler}>OK</motion.button>
                            </form>
                        </PopUpContainer>
                    </PopUpPage>
                }
            </AnimatePresence>
          
            <AnimatePresence>
                {
                    vpn
                    &&
                    <PopUpPage initial='hidden' animate='visible' exit='exit' variants={popUpPageVariants}>
                        <PopUpContainer variants={popUpContainerVariants}>
                            <form>
                                <h1 className='popup-title'>things you need to know</h1>
                                <p className='popup-warning'>if you're in countries like iran, syria, cuba and etc, you have to turn on your <b>VPN</b> for using the app.</p>
                                <p className='popup-text'>
                                    in this app you can send a message and also you can delete any of your messages. for deleting a message just click on the message and the delete icon will appear. so feel free to send your messages.
                                    <p className='popup-text'>and just remember that the chat starts from bottom to top. that means the newest messages are at top and the oldest one are at bottom.</p>
                                </p>
                                <motion.button type="submit" whileTap={{ scale: 0.8 }} className='popup-button' onClick={vpnPopUpSubmitHandler}>OK</motion.button>
                            </form>
                        </PopUpContainer>
                    </PopUpPage>
                }
            </AnimatePresence>
        </>
    );
};

const PopUpPage = styled(motion.section)`
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #00000055;
    z-index: 9;
    position: absolute;
    inset: 0 0 0 0;
    backdrop-filter: blur(8px) saturate(100%);
    -webkit-backdrop-filter: blur(8px) saturate(100%);
`;

const PopUpContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: fit-content;
    height: 50%;
    max-width: 70%;
    max-height: 50%;
    padding: 2rem;
    text-align: center;
    border-radius: 12px;

    .popup-title {
        text-transform: uppercase;
        letter-spacing: -2px;
        word-spacing: 6px;
    }

    .popup-warning {
        text-transform: capitalize;
        margin: 1rem;
    }
    
    .popup-text {
        text-transform: capitalize;
        word-spacing: 2px;
        font-weight: 100;
        font-size: .8rem;
        margin: .7rem;
    }

    .popup-button {
        margin-top: 1rem;
        font-size: 1.5rem;
        font-weight: 900;
        width: 60%;
        padding: .5rem 0;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        background-color: #ffffff11;
    }
    
    .popup-input {
        color: #fff;
        padding: 1rem;
        border: none;
        background-color: #00000000;
        font-size: 1rem;
        text-align: center;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-weight: 200;
    }

    @media (max-width: 900px) {
        max-width: 80%;
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
        }
    }
`;

export default PopUp;
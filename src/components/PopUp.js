import React, { useState, useEffect } from 'react';

import Input from '@mui/material/Input';

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
    
    const vpnPopUpSubmitHandler = () => {
        setVpn(false);
        sessionStorage.setItem("vpn", "true");
    };

    const namePopUpSubmitHandler = () => {
        setName(false);
        localStorage.setItem("username", JSON.stringify(nameInput));
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
                                    placeholder="Please Write Your Name..." 
                                    autoFocus 
                                    value={nameInput}
                                    onChange={e => setNameInput(e.target.value)}
                                />
                                <button whileTap={nameInput && { scale: 0.5 }} type="submit" disabled={!nameInput} className='popup-button' onClick={namePopUpSubmitHandler}>OK</button>
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
                                <p className='popup-text'>if you're in iran, for using this app you need to turn on your VPN.</p>
                                <motion.button type="submit" whileTap={nameInput && { scale: 0.5 }} className='popup-button' onClick={vpnPopUpSubmitHandler}>OK</motion.button>
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #000000;
    z-index: 9;
    position: absolute;
    inset: 0 0 0 0;
`;

const PopUpContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 40%;
    height: 40%;
    text-align: center;
    padding: .5rem;
    background-color: #ffffff10;
    border: solid 2px #ffffff11;
    border-radius: 12px;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(17px) saturate(180%);
    
    .popup-text {
        margin: 1rem 0;
        line-height: 2rem;
        text-transform: capitalize;
        word-spacing: 5px;
    }

    .popup-button {
        margin: 1rem 0;
        font-size: 1.5rem;
        font-weight: 900;
        width: 90%;
        padding: .5rem 0;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        background-color: #000000;
    }
    
    .popup-input {
        color: #fff;
        width: 70%;
        padding: 1rem;
        border: none;
        background-color: #00000000;
        font-size: 1rem;
        text-align: center;
    }

    @media (max-width: 1300px) {
        width: 50%;
    }

    @media (max-width: 1100px) {
        width: 60%;
    }

    @media (max-width: 1000px) {
        width: 70%;
    }

    @media (max-width: 900px) {
        width: 80%;
    }

    @media (max-width: 800px) {
        width: 90%;
    }
`;

export default PopUp;
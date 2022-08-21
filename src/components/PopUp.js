import React, { useState } from 'react';

import styled from 'styled-components';

import { motion, AnimatePresence } from 'framer-motion';

const popUpPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween', when: "beforeChildren", childrenDelay: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const popUpContainerVariants = {
    hidden: { opacity: 0, scaleY: 0.8 },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.4, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, scaleY: 0.8, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const PopUp = () => {

    const [show, setShow] = useState(false);

    return (
        <>
            <AnimatePresence>
                {
                    show
                    &&
                    <PopUpPage initial='hidden' animate='visible' exit='exit' variants={popUpPageVariants}>
                        <PopUpContainer variants={popUpContainerVariants}>
                            <p className='popup-text'>if you're in iran, for using this app you need to use VPN.</p>
                            <button className='popup-button' onClick={() => setShow(false)}>OK</button>
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
    background-color: #000000ee;
    backdrop-filter: blur(5px) saturate(180%);
    -webkit-backdrop-filter: blur(5px) saturate(180%);
    z-index: 999;
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
    background-color: #ffffff10;
    padding: .5rem;
    border: solid 2px #ffffff11;
    border-radius: 12px;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(17px) saturate(180%);

    .popup-text {
        margin: 1.5rem 0;
        text-transform: capitalize;
    }

    .popup-button {
        margin: 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 900;
        width: 90%;
        padding: .5rem 0;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        background-color: #000000;
    }
`;

export default PopUp;
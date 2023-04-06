import React, { useState } from 'react';
import { useWarningPage } from '../hooks/useWarningPage';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const warningModalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.05 } }
};

const warningModalItemsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: [50, -20, 0], scaleX: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scaleX: [1, 1.2, 0.8], transition: { duration: 0.6 } }
};

const WarningPage = () => {

    const { warningPageSubmit } = useWarningPage();

    const [warningModalCheckbox, setWarningModalCheckbox] = useState(false);

    const pressEnter = (e) => {
        if (e.key == "Enter") {
            warningPageSubmit(warningModalCheckbox);
        }
    };

    return (
        <>
            <WarningModalPage initial='hidden' animate='visible' exit='exit' variants={warningModalVariants} onKeyDown={(e) => pressEnter(e)}>
                <div className='container'>
                    <motion.h1 className='title' variants={warningModalItemsVariants}>things you need to know</motion.h1>
                    <motion.p className='warning' variants={warningModalItemsVariants}>
                        If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> in order to use this app.
                    </motion.p>
                    <motion.p className='guide' variants={warningModalItemsVariants}>
                        In this app you can send message, reply to a message, delete your messege, edit your message also edit your message's replies. For doing those things you just need to hit on one of your message to see the options. You also can change background of the app.
                    </motion.p>
                    <motion.div className='show-again' onClick={() => setWarningModalCheckbox(!warningModalCheckbox)} variants={warningModalItemsVariants}>
                        <p>Don't show this again. </p>
                        <input type="checkbox" autoFocus checked={warningModalCheckbox} onChange={() => setWarningModalCheckbox(!warningModalCheckbox)} />
                    </motion.div>
                    <motion.button type="submit" className='submit' onClick={() => warningPageSubmit(warningModalCheckbox)} variants={warningModalItemsVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>LET'S GO</motion.button>
                </div>
            </WarningModalPage>
        </>
    );
};

const WarningModalPage = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--warning-page);
    backdrop-filter: blur(15px) saturate(100%);
    -webkit-backdrop-filter: blur(15px) saturate(100%);
    position: absolute;
    z-index: 2;
    user-select: none;

    .container {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;

        .title {
            font-size: 2rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -2px;
            word-spacing: 5px;
            margin-bottom: 1.2rem;
            white-space: nowrap;
        }
    
        .warning {
            font-size: .8rem;
            font-weight: 500;
            margin-bottom: .8rem;
            color: #ff0000;
        }
    
        .guide {
            max-width: 40%;
            font-size: .6rem;
            font-weight: 200;
            margin-bottom: .8rem;
        }
        
        .show-again {
            font-size: .6rem;
            font-weight: 400;
            margin-bottom: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            input {
                display: flex;
                justify-content: center;
                align-items: center;
                width: .6rem;
                height: .6rem;
                margin: 0 .2rem;
                cursor: pointer;
            }
        }
    
        .submit {
            all: unset;
            border-radius: 30px;
            background-color: var(--warning-page-button);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: -1px;
            word-spacing: 5px;
            padding: .5rem 0;
            width: 20%;
            white-space: nowrap;
        }
    }

    @media (max-width: 1000px) {
        .container {
            .title {
                font-size: 1.5rem;
            }

            .warning {
                font-size: .8rem;
                max-width: 70%;
            }

            .guide {
                max-width: 50%;
            }

            .submit {
                width: 40%;
            }
        }
    }
`;

export default WarningPage;
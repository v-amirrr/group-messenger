import React, { useState, useEffect } from 'react';
import { useWarningPage } from '../hooks/useWarningPage';
import { useRedirection } from '../hooks/useRedirection';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { warningModalVariants, warningModalItemsVariants } from '../config/varitans';

const WarningPage = () => {

    const { warningPageSubmit } = useWarningPage();
    const { warningRedirection } = useRedirection();

    const [warningModalCheckbox, setWarningModalCheckbox] = useState(false);

    const pressEnter = (e) => {
        if (e.key == "Enter") {
            warningPageSubmit(warningModalCheckbox);
        }
    };

    useEffect(() => {
        warningRedirection();
    }, []);

    return (
        <>
            <WarningModalPage initial='hidden' animate='visible' exit='exit' variants={warningModalVariants} onKeyDown={(e) => pressEnter(e)}>
                <div className='container'>
                    <motion.h1 className='title' variants={warningModalItemsVariants}>THINGS YOU NEED TO KNOW</motion.h1>
                    <motion.p className='warning' variants={warningModalItemsVariants}>
                        If you're in sanctioned countries like <b>Iran</b>, you have to turn on your <b>VPN</b> in order to use this app.
                    </motion.p>
                    <motion.p className='guide' variants={warningModalItemsVariants}>
                        In this app you can send message, reply to a message, delete your messege, edit your message also edit your message's replies. For doing those things you just need to hit on one of your message to see the options. You also can change background of the app.
                    </motion.p>
                    <motion.div className='show-again' onClick={() => setWarningModalCheckbox(!warningModalCheckbox)} variants={warningModalItemsVariants}>
                        <input type="checkbox" autoFocus checked={warningModalCheckbox} onChange={() => setWarningModalCheckbox(!warningModalCheckbox)} />
                        <p>Don't show this again.</p>
                    </motion.div>
                    <motion.button type="submit" className='submit' onClick={() => warningPageSubmit(warningModalCheckbox)} variants={warningModalItemsVariants}>LET'S GO</motion.button>
                </div>
            </WarningModalPage>
        </>
    );
};

const WarningModalPage = styled(motion.section)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--page-second);
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
            font-weight: var(--text-boldness-fourth);
            letter-spacing: -2px;
            word-spacing: 5px;
            margin-bottom: 1.2rem;
            white-space: nowrap;
        }

        .warning {
            font-size: .8rem;
            font-weight: var(--text-boldness-second);
            margin-bottom: .8rem;
            color: #ff0000;
        }

        .guide {
            max-width: 40%;
            font-size: .6rem;
            font-weight: var(--text-boldness-second);
            line-height: 1.4;
            margin-bottom: .8rem;
            color: var(--text-color-second);
        }

        .show-again {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--text-color-first);
            font-size: .6rem;
            font-weight: var(--text-boldness-second);
            margin-bottom: 1.2rem;
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
            border-radius: var(--radius-fourth);
            background-color: var(--button);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            font-weight: var(--text-boldness-third);
            letter-spacing: -1px;
            word-spacing: 5px;
            padding: .5rem 0;
            box-shadow: var(--shadow-second);
            width: 20%;
            cursor: pointer;
            transition: background .2s;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--button-hover);
                }
            }
        }
    }

    @media (max-width: 1000px) {
        .container {
            .title {
                font-size: 1.5rem;
            }

            .warning {
                font-size: .8rem;
                max-width: 80%;
            }

            .guide {
                max-width: 60%;
            }

            .submit {
                width: 40%;
            }
        }
    }
`;

export default WarningPage;
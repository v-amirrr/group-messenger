import React, { useState, useEffect } from 'react';
import { useWarningPage } from '../hooks/useWarningPage';
import { useRedirection } from '../hooks/useRedirection';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { warningPageVariants, warningContainerVariants } from '../config/varitans';

const WarningPage = () => {
    const { warningPageSubmit } = useWarningPage();
    const { warningRedirection } = useRedirection();

    const [warningModalCheckbox, setWarningModalCheckbox] = useState(false);

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            warningPageSubmit(warningModalCheckbox);
        }
    };

    useEffect(() => {
        warningRedirection();
    }, []);

    return (
        <>
            <WarningModalPage
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={warningPageVariants}
                onKeyDown={(e) => pressEnter(e)}
            >
                <motion.div
                    className='container'
                    variants={warningContainerVariants}
                >
                    <h1 className='title'>THINGS YOU NEED TO KNOW</h1>
                    <p className='warning'>
                        If you're in sanctioned countries like <b>Iran</b>, you
                        have to turn on your <b>VPN</b> in order to use this
                        app.
                    </p>
                    <p className='guide'>
                        In this app you can send message, reply to a message,
                        delete your messege, edit your message also edit your
                        message's replies. For doing those things you just need
                        to hit on one of your message to see the options. You
                        also can change background of the app.
                    </p>
                    <div
                        className='show-again'
                        onClick={() =>
                            setWarningModalCheckbox(!warningModalCheckbox)
                        }
                    >
                        <input
                            type='checkbox'
                            autoFocus
                            checked={warningModalCheckbox}
                            onChange={() =>
                                setWarningModalCheckbox(!warningModalCheckbox)
                            }
                        />
                        <p>Don't show this again.</p>
                    </div>
                    <button
                        type='submit'
                        className='submit'
                        onClick={() => warningPageSubmit(warningModalCheckbox)}
                    >
                        LET'S GO
                    </button>
                </motion.div>
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
            margin-bottom: 1.2rem;
            letter-spacing: -2px;
            word-spacing: 5px;
            white-space: nowrap;
            color: var(--normal-color);
        }

        .warning {
            font-size: 0.8rem;
            font-weight: 400;
            margin-bottom: 0.8rem;
            color: var(--red-color);
        }

        .guide {
            font-size: 0.6rem;
            max-width: 40%;
            font-weight: 400;
            line-height: 1.4;
            margin-bottom: 0.8rem;
            color: var(--pale-color);
        }

        .show-again {
            font-size: 0.6rem;
            font-weight: 400;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--pale-color);
            margin-bottom: 1.2rem;
            cursor: pointer;

            input {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.5rem;
                height: 0.5rem;
                margin: 0 0.2rem 0 0;
                cursor: pointer;
            }
        }

        .submit {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 25%;
            height: 2.3rem;
            background-color: var(--normal-bg);
            box-shadow: var(--normal-shadow);
            color: var(--normal-color);
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            word-spacing: 3px;
            letter-spacing: -1px;
            cursor: pointer;
            transition: background 0.2s;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--normal-bg-hover);
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
                font-size: 0.8rem;
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

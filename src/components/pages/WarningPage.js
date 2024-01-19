import React, { useState, useEffect } from 'react';
import { useWarningPage } from '../../hooks/useWarningPage';
import { useRedirection } from '../../hooks/useRedirection';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { warningPageVariants, warningContainerVariants } from '../../config/varitans';
import Toggle from '../Toggle';

const WarningPage = () => {
    const { warningPageSubmit } = useWarningPage();
    const { warningRedirection } = useRedirection();
    const [warningToggle, setWarningToggle] = useState(true);

    useEffect(() => {
        warningRedirection();
    }, []);

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            warningPageSubmit(warningToggle);
        }
    };

    return (
        <>
            <Warning initial='hidden' animate='visible' exit='exit' variants={warningPageVariants} onKeyDown={(e) => pressEnter(e)}>
                <motion.div className='container' variants={warningContainerVariants}>
                    <h1 className='title'>THINGS YOU NEED TO KNOW</h1>
                    <p className='warning'>
                        If you're in sanctioned countries like <b>Iran</b>, you
                        have to turn on your <b>VPN</b> in order to use this
                        app.
                    </p>
                    <p className='guide'>
                        Login, Sign up, Enter as a guest, Enter by Google.
                        Send, reply, edit you message, edit the reply you've choose for your message,
                        delete your message, copy the text of anyone's message,
                        select bunch of messages then delete or copy them together.
                        Change the background, decide when to recieve a notification,
                        change your username, bring back deleted messages from the trash or
                        delete them forever.
                    </p>
                    <div className='show-again' onClick={() => setWarningToggle(!warningToggle)}>
                        <p>Show the warning page everytime.</p>
                        <Toggle
                            toggleHandler={() => setWarningToggle(!warningToggle)}
                            toggleValue={warningToggle}
                            scale={0.6}
                        />
                    </div>
                    <button className='submit' onClick={() => warningPageSubmit(setWarningToggle)} autoFocus>
                        LET'S GO
                    </button>
                </motion.div>
            </Warning>
        </>
    );
};

const Warning = styled(motion.section)`
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
            letter-spacing: -2px;
            margin-bottom: 1.2rem;
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
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.6rem;
            font-weight: 400;
            margin-bottom: 1.2rem;
            color: var(--pale-color);
            cursor: pointer;
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
            transition: background .2s;

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
                max-width: 80%;
                font-size: 0.8rem;
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

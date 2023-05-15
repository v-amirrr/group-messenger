import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useRedirection } from '../../hooks/useRedirection';
import SettingsBackgrounds from './SettingsBackgrounds';
import SettingsUser from './SettingsUser';
import { TiArrowLeft } from "react-icons/ti";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const settingsPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4, when: "afterChildren" } }
};

const settingsContainerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } }
};

const Settings = () => {

    const { groupChatRedirection } = useRedirection();
    const { enterAsAGuest } = useSelector(store => store.userStore);

    useEffect(() => {
        groupChatRedirection();
    }, []);

    return (
        <>
            <SettingsPage initial='hidden' animate='visible' exit='exit' variants={settingsPageVariants}>
                <SettingsContainer variants={settingsContainerVariants}>
                    <header>
                        <h1>Settings</h1>
                        <Link to={-1}>
                            <i><TiArrowLeft /></i>
                        </Link>
                    </header>

                    <ul>
                        <SettingsBackgrounds />
                        {enterAsAGuest ? "" : <SettingsUser />}
                    </ul>
                </SettingsContainer>
            </SettingsPage>

        </>
    );
};

const SettingsPage = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0 0 0 0;
    background-color: var(--settings-page);
    backdrop-filter: var(--settings-blur);
    -webkit-backdrop-filter: var(--settings-blur);
    user-select: none;
`;

const SettingsContainer = styled(motion.section)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--settings-border-radius);
    background-color: var(--settings);
    width: 20rem;
    height: 30rem;
    position: relative;
    overflow: hidden;

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 0;
        padding: 1rem 0;
        border-bottom: solid 1px #ffffff10;

        a {
            position: absolute;
            left: .7rem;
            background-color: var(--settings-back);
            transition: background .4s;
            border-radius: 50%;
            
            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--settings-back-hover);
                }
            }
        }
    }

    ul {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

export default Settings;
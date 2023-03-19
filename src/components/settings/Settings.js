import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SettingsThemes from './SettingsThemes';
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
                        <SettingsThemes />
                    </ul>
                </SettingsContainer>
            <Outlet />
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
    background-color: #00000088;
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);
    user-select: none;
`;

const SettingsContainer = styled(motion.section)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    background-color: #000000bb;
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
        border-bottom: solid 1px #ffffff11;

        a {
            position: absolute;
            left: .7rem;
            background-color: #ffffff08;
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
                    background-color: #ffffff11;
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
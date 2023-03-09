import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const settingsPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween', when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween', when: "afterChildren" } }
};

const settingsContainerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, type: "spring", stiffness: 80 } },
    exit: { opacity: 0, y: 100, scaleY: 0.9, transition: { duration: 0.4 } }
};

const Settings = () => {
    return (
        <>
            <SettingsPage initial='hidden' animate='visible' exit='exit' variants={settingsPageVariants}>
                <SettingsContainer variants={settingsContainerVariants}>
                    <header>
                        <h3>Settings</h3>
                        <div className='settings-header-icon'>
                            <Link to="/">
                                <motion.i whileTap={{ scale: 0.8 }}><IoIosArrowBack /></motion.i>
                            </Link>
                        </div>
                    </header>
                </SettingsContainer>
            </SettingsPage>
        </>
    );
};

const SettingsPage = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    background-color: #000000aa;
    backdrop-filter: blur(15px) saturate(100%);
    -webkit-backdrop-filter: blur(15px) saturate(100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SettingsContainer = styled(motion.div)`
    border-radius: 25px;
    background-color: #020202bb;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 30rem;
    position: relative;
    overflow: hidden;
    user-select: none;

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 1rem;
        position: absolute;
        top: 0;
        border-bottom: solid 1px #141414;

        .settings-header-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1.2rem;
            position: absolute;
            left: 0;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                border-radius: 50%;
            }
        }
    }

    @media (max-width: 1400px) {
        width: 60%;
    }

    @media (max-width: 1000px) {
        width: 70%;
    }

    @media (max-width: 800px) {
        width: 80%;
    }
`;

export default Settings;
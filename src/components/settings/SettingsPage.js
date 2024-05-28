import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsUser from './SettingsUser';
import SettingsItem from './SettingsItem';
import SettingsNotification from './SettingsNotification';
import { TiArrowLeft } from 'react-icons/ti';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { settingsContainerVariants } from '../../config/varitans';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(false);

    const backClickHandler = () => {
        if (open) {
            setOpen(false);
            setHeight(false);
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <Settings>
                <motion.div className='settings-container' initial='hidden' animate='visible' exit='exit' variants={settingsContainerVariants}>
                    <header className='settings-header'>
                        <p className='header-text'>Settings</p>
                        <button className='header-button' onClick={backClickHandler}><TiArrowLeft /></button>
                    </header>
                    <SettingsItem
                        open={open == 'SETTINGS_NOTIFICATION'}
                        hide={open != 'SETTINGS_NOTIFICATION' && open}
                        component={
                            <SettingsNotification
                                open={open}
                                setOpen={setOpen}
                                setHeight={setHeight}
                            />
                        }
                        height={height}
                    />
                    <SettingsItem
                        openValue='SETTINGS_USER'
                        open={open == 'SETTINGS_USER'}
                        hide={open != 'SETTINGS_USER' && open}
                        component={
                            <SettingsUser
                                open={open}
                                setOpen={setOpen}
                                setHeight={setHeight}
                            />
                        }
                        height={height}
                    />
                </motion.div>
            </Settings>
        </>
    );
};

const Settings = styled.section`
    position: absolute;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .settings-container {
        position: relative;
        width: 20rem;
        height: 31rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: solid 2.5px #ffffff10;
        border-radius: 25px;
        background-color: #00000044;
        padding-top: 4rem;

        .settings-header {
            position: absolute;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem 0;

            .header-text {
                font-size: 1.2rem;
                font-weight: 600;
            }

            .header-button {
                position: absolute;
                left: .7rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2rem;
            }
        }

        @media (max-width: 768px) {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: none;
            background-color: #00000000;
        }
    }
`;

export default SettingsPage;

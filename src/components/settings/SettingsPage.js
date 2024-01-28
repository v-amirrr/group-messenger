import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedirection } from '../../hooks/useRedirection';
import SettingsBackgrounds from './SettingsBackgrounds';
import SettingsUser from './SettingsUser';
import SettingsTrash from './SettingsTrash';
import SettingsItem from './SettingsItem';
import SettingsNotification from './SettingsNotification';
import { TiArrowLeft } from 'react-icons/ti';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { settingsPageVariants, settingsContainerVariants } from '../../config/varitans';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { groupChatRedirection } = useRedirection();
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(false);

    useEffect(() => {
        groupChatRedirection();
    }, []);

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
            <Settings
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={settingsPageVariants}
            >
                <SettingsContainer variants={settingsContainerVariants}>
                    <header className='settings-header'>
                        <h1>Settings</h1>
                        <button className='back' onClick={backClickHandler}><TiArrowLeft /></button>
                    </header>
                    <SettingsItem
                        open={open == 'SETTINGS_BACKGROUND'}
                        hide={open != 'SETTINGS_BACKGROUND' && open}
                        component={
                            <SettingsBackgrounds
                                open={open}
                                setOpen={setOpen}
                                setHeight={setHeight}
                            />
                        }
                        height={height}
                    />
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
                    <SettingsItem
                        open={open == 'SETTINGS_TRASH'}
                        hide={open != 'SETTINGS_TRASH' && open}
                        component={
                            <SettingsTrash
                                open={open}
                                setOpen={setOpen}
                                setHeight={setHeight}
                            />
                        }
                        height={height}
                    />
                </SettingsContainer>
            </Settings>
        </>
    );
};

const Settings = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0 0 0 0;
`;

const SettingsContainer = styled(motion.section)`
    position: relative;
    width: 19.5rem;
    height: 31rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: solid 2.5px #ffffff20;
    border-radius: 25px;
    background-color: #00000088;
    padding-top: 4rem;

    .settings-header {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;

        .back {
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
        border: solid 2.5px #ffffff00;
        border-radius: 0;
    }
`;

export default SettingsPage;

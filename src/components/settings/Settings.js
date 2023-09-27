import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRedirection } from '../../hooks/useRedirection';
import SettingsBackgrounds from './SettingsBackgrounds';
import SettingsUser from './SettingsUser';
import SettingsTrash from './SettingsTrash';
import SettingsItem from './SettingsItem';
import SettingsNotification from './SettingsNotification';
import Notification from '../Notification';
import { TiArrowLeft } from "react-icons/ti";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { settingsPageVariants, settingsContainerVariants } from '../../config/varitans';

const Settings = () => {

    const { groupChatRedirection } = useRedirection();

    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(false);

    useEffect(() => {
        groupChatRedirection();
    }, []);

    return (
        <>
            <SettingsPage initial='hidden' animate='visible' exit='exit' variants={settingsPageVariants}>
                <Notification />
                <SettingsContainer variants={settingsContainerVariants}>
                    <header className='settings-header'>
                        <h1>Settings</h1>
                        <Link to={-1}>
                            <i><TiArrowLeft /></i>
                        </Link>
                    </header>

                        <SettingsItem openValue="SETTINGS_BACKGROUND" open={open} component={<SettingsBackgrounds open={open} setOpen={setOpen} setHeight={setHeight}/>} height={height}/>
                        <SettingsItem openValue="SETTINGS_NOTIFICATION" open={open} component={<SettingsNotification open={open} setOpen={setOpen} setHeight={setHeight}/>} height={height}/>
                        <SettingsItem openValue="SETTINGS_USER" open={open} component={<SettingsUser open={open} setOpen={setOpen} setHeight={setHeight}/>} height={height}/>
                        <SettingsItem openValue="SETTINGS_TRASH" open={open} component={<SettingsTrash open={open} setOpen={setOpen} setHeight={setHeight}/>} height={height}/>
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
    user-select: none;
`;

const SettingsContainer = styled(motion.section)`
    position: relative;
    width: 20rem;
    height: 32rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: var(--border-first);
    border-radius: 25px;
    background-color: var(--settings);
    padding-top: 4rem;
    overflow: hidden;

    .settings-header {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        border-bottom: var(--border-first);

        a {
            position: absolute;
            left: .7rem;
            transition: background .2s;
            border-radius: 50%;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2rem;
            }

            &:hover {
                background-color: var(--button-hover);
            }
        }
    }
`;

export default Settings;
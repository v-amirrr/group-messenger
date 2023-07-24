import React, { memo, useEffect } from 'react';
import { useNotification } from '../../hooks/useNotification';
import Toggle from "../Toggle";
import { FcAdvertising } from "react-icons/fc";
import { FaTrashRestore, FaUserCircle } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { TbTrashX } from 'react-icons/tb';
import { IoSend } from 'react-icons/io5';
import { MdWallpaper } from "react-icons/md";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { notificationSettingsVariants } from '../../config/varitans';

const SettingsNotification = ({ open, setOpen }) => {

    const { changeNotificationSettings, notificationSettings } = useNotification();

    const itemSwitch = () => {
        if (open == "SETTINGS_NOTIFICATION") {
            setOpen(false);
        } else {
            setOpen("SETTINGS_NOTIFICATION");
        }
    };

    useEffect(() => {
        localStorage.setItem('notification', JSON.stringify(notificationSettings));
    }, [notificationSettings]);

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcAdvertising /></i>
                <h4>Notification</h4>
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence exitBeforeEnter>
                {
                    open == "SETTINGS_NOTIFICATION" ?
                    <NotificationContainer initial='hidden' animate='visible' exit='exit' variants={notificationSettingsVariants}>
                        <div className='notification-item'>
                            <i><IoSend /></i>
                            <p>Sending</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("send", !notificationSettings.send)} toggleValue={notificationSettings.send}/>
                        </div>
                        <div className='notification-item'>
                            <i><AiFillDelete /></i>
                            <p>Moving to trash</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("trash", !notificationSettings.trash)} toggleValue={notificationSettings.trash}/>
                        </div>
                        <div className='notification-item'>
                            <i><AiFillEdit /></i>
                            <p>Editing</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("edit", !notificationSettings.edit)} toggleValue={notificationSettings.edit}/>
                        </div>
                        <div className='notification-item'>
                            <i><AiFillCopy /></i>
                            <p>Copying</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("copy", !notificationSettings.copy)} toggleValue={notificationSettings.copy}/>
                        </div>
                        <div className='notification-item'>
                            <i><FaTrashRestore /></i>
                            <p>Restoring</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("restore", !notificationSettings.restore)} toggleValue={notificationSettings.restore}/>
                        </div>
                        <div className='notification-item'>
                            <i><TbTrashX /></i>
                            <p>Deleting</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("delete", !notificationSettings.delete)} toggleValue={notificationSettings.delete}/>
                        </div>
                        <div className='notification-item'>
                            <i><MdWallpaper /></i>
                            <p>Changing backgrounds</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("background", !notificationSettings.background)} toggleValue={notificationSettings.background}/>
                        </div>
                        <div className='notification-item'>
                            <i><FaUserCircle /></i>
                            <p>Changing username</p>
                            <Toggle toggleHandler={() => changeNotificationSettings("username", !notificationSettings.username)} toggleValue={notificationSettings.username}/>
                        </div>
                    </NotificationContainer>
                    : ""
                }
            </AnimatePresence>
        </>
    );
};

const NotificationContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 16rem;
    margin-top: 2rem;

    .notification-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: .5rem;
        position: relative;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: .8rem;
        }

        p {
            font-size: .7rem;
            text-align: left;
            width: 100%;
            margin-left: 1.7rem;
        }

        .toggle {
            position: absolute;
            right: .8rem;
        }
    }
`;

export default memo(SettingsNotification);
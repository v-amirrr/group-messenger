import React, { useEffect } from 'react';
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

const SettingsNotification = ({ open, setOpen, setHeight }) => {
    const { changeNotificationSettings, notificationSettings } = useNotification();

    const itemSwitch = () => {
        if (open == "SETTINGS_NOTIFICATION") {
            setOpen(false);
        } else {
            setOpen("SETTINGS_NOTIFICATION");
            setHeight(18);
        }
    };

    useEffect(() => {
        localStorage.setItem('notification', JSON.stringify(notificationSettings));
    }, [notificationSettings]);

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcAdvertising /></i>
                <h4>Notifications</h4>
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence>
                {
                    open == 'SETTINGS_NOTIFICATION' ?
                    <NotificationContainer initial='hidden' animate='visible' exit='exit' variants={notificationSettingsVariants}>
                        <div className='notification-item' onClick={() => changeNotificationSettings('send', !notificationSettings.send)}>
                            <i><IoSend /></i>
                            <p>Sending</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('send', !notificationSettings.send)}
                                toggleValue={notificationSettings.send}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('trash', !notificationSettings.trash)}>
                            <i><AiFillDelete /></i>
                            <p>Moving to trash</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('trash', !notificationSettings.trash)}
                                toggleValue={notificationSettings.trash}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('edit', !notificationSettings.edit)}>
                            <i><AiFillEdit /></i>
                            <p>Editing</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('edit', !notificationSettings.edit)}
                                toggleValue={notificationSettings.edit}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('copy', !notificationSettings.copy)}>
                            <i><AiFillCopy /></i>
                            <p>Copying</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('copy', !notificationSettings.copy)}
                                toggleValue={notificationSettings.copy}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('restore', !notificationSettings.restore)}>
                            <i><FaTrashRestore /></i>
                            <p>Restoring</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('restore', !notificationSettings.restore)}
                                toggleValue={notificationSettings.restore}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('delete', !notificationSettings.delete)}>
                            <i><TbTrashX /></i>
                            <p>Deleting</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('delete', !notificationSettings.delete)}
                                toggleValue={notificationSettings.delete}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('background', !notificationSettings.background)}>
                            <i><MdWallpaper /></i>
                            <p>Changing background</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('background', !notificationSettings.background)}
                                toggleValue={notificationSettings.background}
                                scale={0.9}
                            />
                        </div>
                        <div className='notification-item' onClick={() => changeNotificationSettings('username', !notificationSettings.username)}>
                            <i><FaUserCircle /></i>
                            <p>Changing username</p>
                            <Toggle
                                toggleHandler={() => changeNotificationSettings('username', !notificationSettings.username)}
                                toggleValue={notificationSettings.username}
                                scale={0.9}
                            />
                        </div>
                    </NotificationContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const NotificationContainer = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 5rem;

    .notification-item {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5rem;
        cursor: pointer;

        i {
            position: absolute;
            left: .4rem;
            width: 2rem;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p {
            width: 100%;
            font-size: .7rem;
            font-weight: 400;
            text-align: left;
            margin-left: 1.7rem;
        }

        .toggle {
            position: absolute;
            right: .8rem;
        }

        &:nth-child(1) {
            i {
                font-size: .8rem;
            }
        }

        &:nth-child(2) {
            i {
                font-size: .95rem;
            }
        }

        &:nth-child(3) {
            i {
                font-size: .95rem;
            }
        }

        &:nth-child(4) {
            i {
                font-size: .95rem;
            }
        }

        &:nth-child(5) {
            i {
                font-size: .8rem;
            }
        }

        &:nth-child(6) {
            i {
                font-size: 1rem;
            }
        }

        &:nth-child(7) {
            i {
                font-size: .9rem;
            }
        }

        &:nth-child(8) {
            i {
                font-size: .85rem;
            }
        }
    }
`;

export default SettingsNotification;
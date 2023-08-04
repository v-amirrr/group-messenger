import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useChangeUsername } from '../../hooks/useChangeUsername';
import { useNotification } from '../../hooks/useNotification';
import { FcBusinessman, FcCheckmark, FcAddressBook } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { userVariants } from '../../config/varitans';

const SettingsUser = ({ open, setOpen, setHeight }) => {

    const { user, enterAsAGuest } = useSelector(store => store.userStore);

    const { changeUsername } = useChangeUsername();
    const { openNotification } = useNotification();

    const [changeUsernameInput, setChangeUsernameInput] = useState(user?.displayName);

    const submitHandler = () => {
        setOpen(false);
        changeUsername(changeUsernameInput);
    };

    const itemSwitch = () => {
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            if (open == "SETTINGS_USER") {
                setOpen(false);
            } else {
                setOpen("SETTINGS_USER");
                setHeight(10);
            }
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcBusinessman /></i>
                <h4>User</h4>
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence exitBeforeEnter>
                {
                    open == "SETTINGS_USER" ?
                    <div key="item-data" className='item-data'>
                        <UserContainer initial='hidden' animate='visible' exit='exit' variants={userVariants}>
                            <div className='change-username'>
                                <header className='user-item-header'>
                                    <i><FcAddressBook /></i>
                                    <h6>Username</h6>
                                </header>
                                <div className='change-username-input'>
                                    <input type='text' value={changeUsernameInput} onChange={(e) => setChangeUsernameInput(e.target.value)}/>
                                    <i onClick={submitHandler}><FcCheckmark /></i>
                                </div>
                            </div>
                        </UserContainer>
                    </div>
                    : ""
                }
            </AnimatePresence>
        </>
    );
};

const UserContainer = styled(motion.div)`
    .change-username {
        padding-bottom: .5rem;

        .user-item-header {
            display: flex;
            justify-content: center;
            align-items: center;
            h6 {
                margin-bottom: .2rem;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
            }
        }

        .change-username-input {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 100%;

            input {
                padding: .5rem;
                border: none;
                border-radius: 50px;
                background-color: #ffffff08;
            }

            i {
                position: absolute;
                right: .2rem;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--settings-back);
                transition: background .3s;
                border-radius: 50%;
                padding: .2rem;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: var(--settings-back-hover);
                    }
                }
            }
        }

    }
`;

export default memo(SettingsUser);
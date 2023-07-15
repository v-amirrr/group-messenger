import React, { memo, useEffect, useState } from 'react';
import { useChangeUsername } from '../../hooks/useChangeUsername';
import { useSelector } from 'react-redux';
import { FcBusinessman, FcCheckmark } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const userVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.6 } }
};

const SettingsUser = ({ open, setOpen }) => {

    const { changeUsername } = useChangeUsername();
    const { user } = useSelector(store => store.userStore);

    const [changeUsernameInput, setChangeUsernameInput] = useState(user.displayName);

    const submitHandler = () => {
        setOpen(false);
        changeUsername(changeUsernameInput);
    };

    const itemSwitch = () => {
        if (open == "SETTINGS_USER") {
            setOpen(false);
        } else {
            setOpen("SETTINGS_USER");
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
                                <h6>Change your username</h6>
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

        h6 {
            margin-bottom: .2rem;
        }

        .change-username-input {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            input {
                padding: .5rem;
                border: none;
                border-radius: 10px;
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
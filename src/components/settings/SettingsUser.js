import React, { memo, useEffect, useState } from 'react';
import { useChangeUsername } from '../../hooks/useChangeUsername';
import { useSelector } from 'react-redux';
import { FcBusinessman } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const userOpenVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const userCloseVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const userVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, staggerChildren: 0.2 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
};

const SettingsUser = ({ open, setOpen }) => {

    const { changeUsername } = useChangeUsername();
    const { user } = useSelector(store => store.userStore);

    const [changeUsernameInput, setChangeUsernameInput] = useState(user.displayName);

    const submitHandler = () => {
        setOpen(false);
        changeUsername(changeUsernameInput);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <>
            <SettingsUserContainer open={open == "SETTINGS_USER" ? 1 : 0}>
                <AnimatePresence exitBeforeEnter>
                    {open == "SETTINGS_USER" ? 
                    <motion.div key="item-open" className='item-open' initial='hidden' animate='visible' exit='exit' variants={userOpenVariants}>
                        <motion.div className='themes' variants={userVariants}>
                            <div className='change-username'>
                                <h6>Change your username</h6>
                                <input type='text' value={changeUsernameInput} onChange={(e) => setChangeUsernameInput(e.target.value)} autoFocus />
                            </div>
                        </motion.div>
                        <button className='item-open-submit' onClick={submitHandler}>Done</button>
                    </motion.div> :
                    <motion.div key="item-close" onClick={() => setOpen("SETTINGS_USER")} className='item-close' initial='hidden' animate='visible' exit='exit' variants={userCloseVariants}>
                        <i className='list-item-icon'><FcBusinessman /></i>
                        <p>User</p>
                        <i className='list-item-back'><RiArrowRightSLine /></i>
                    </motion.div>}
                </AnimatePresence>
            </SettingsUserContainer>
        </>
    );
};

const SettingsUserContainer = styled.div`
    width: 65%;
    height: ${props => props.open ? "18rem" : "2.2rem"};
    padding: ${props => props.open ? "" : "0 .5rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    cursor: ${props => props.open ? "" : "pointer"};
    overflow: hidden;
    position: relative;
    margin: .3rem;
    background-color: var(--settings-item);
    transition: background .2s, border .2s, height .8s cubic-bezier(.53,0,0,.98), padding .2s;

    .item-close {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;

        .list-item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .4rem;
        }
    
        p {
            font-size: .8rem;
            font-weight: 600;
        }
    
        .list-item-back {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: absolute;
            right: 0;
        }
    }

    .item-open {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .change-username {
            h6 {
                margin-bottom: .5rem;
            }
            input {
                padding: .5rem;
                border: none;
                border-radius: 10px;
                background-color: #ffffff08;
            }
        }

        .item-open-submit {
            position: absolute;
            bottom: 0;
            padding: .5rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--settings-submit);
            border: none;
            cursor: pointer;
            font-size: .8rem;
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        &:hover {
            background-color: ${props => props.open ? "" : "var(--settings-item-hover)"};
        }
    }
`;

export default memo(SettingsUser);
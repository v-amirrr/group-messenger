import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogin } from '../hooks/useLogin';
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { FcSettings, FcRightUp2 } from "react-icons/fc";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const backIconVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, x: 50, transition: { duration: 0.4 } }
};

const menuIconVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.5 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, delay: 0.5 } },
    exit: { opacity: 0, x: 50, scale: 0, transition: { duration: 0.4 } }
};

const menuListVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, type: 'tween' } },
    exit: { opacity: 0, scale: 0.5, x: 50, transition: { duration: 0.4, type: 'tween' } }
};

const MessengerMenu = () => {

    const { loginAsGuest } = useSelector(store => store.userStore);

    const { logoutAsGuest } = useLogin();

    const [openMenu, setOpenMenu] = useState(false);

    const logoutClickHandler = () => {
        setOpenMenu(false);
        setTimeout(() => {
            logoutAsGuest();
        }, 600);
    };

    return (
        <>
            <MessengerMenuContainer openmenu={openMenu ? 1 : 0}>
                <AnimatePresence>
                    {openMenu ?
                    <motion.i key="back-icon" className='back-icon' onClick={() => setOpenMenu(!openMenu)} initial='hidden' animate='visible' exit='exit' variants={backIconVariants}>
                        <FaArrowRight />
                    </motion.i> : 
                    <motion.i key="menu-icon" className='menu-icon' onClick={() => setOpenMenu(!openMenu)} initial='hidden' animate='visible' exit='exit' variants={menuIconVariants}>
                        <HiDotsVertical />
                    </motion.i>}
                </AnimatePresence>

                <AnimatePresence>
                    {openMenu ?
                    loginAsGuest ?
                    <motion.div key="menu" className='list' initial='hidden' animate='visible' exit='exit' variants={menuListVariants}>
                        <motion.div onClick={logoutClickHandler} className='list-item' whileTap={{ scale: 0.9 }}>
                            <i><FcRightUp2 /></i>
                            <p>Logout</p>
                        </motion.div>
                        <Link to="/settings">
                            <motion.div className='list-item' whileTap={{ scale: 0.9 }}>
                                <i><FcSettings /></i>
                                <p>Settings</p>
                            </motion.div>
                        </Link>
                    </motion.div> :
                    <motion.div key="menu" className='list' initial='hidden' animate='visible' exit='exit' variants={menuListVariants}>
                        <Link to="/settings">
                            <motion.div className='list-item' whileTap={{ scale: 0.9 }}>
                                <i><FcSettings /></i>
                                <p>Settings</p>
                            </motion.div>
                        </Link>
                    </motion.div>
                    : ""}
                </AnimatePresence>
            </MessengerMenuContainer>
        </>
    );
};

const MessengerMenuContainer = styled(motion.div)`
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem 1.5rem;
    z-index: 3;
    user-select: none;
    backdrop-filter: blur(10px) saturate(100%);
    -webkit-backdrop-filter: blur(15px) saturate(100%);
    background-color: var(--menu);
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.openmenu ? "8rem" : "2.5rem"};
    height: ${props => props.openmenu ? "8rem" : "2.5rem"};
    cursor: ${props => props.openmenu ? "" : "pointer"};
    overflow: hidden;
    transition: width .8s cubic-bezier(.53,0,0,.98), height .8s cubic-bezier(.53,0,0,.98);

    .back-icon, .menu-icon {
        position: absolute;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: background .4s;
    }

    .back-icon {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .45rem;
        background-color: var(--menu-back);
        padding: .4rem;
        font-size: 1.2rem;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--menu-back-hover);
            }
        }
    }

    .menu-icon {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--menu-back-hover);
            }
        }
    }

    .list {
        margin-top: 2.5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: .8rem;

        a {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            height: 2rem;

        }

        .list-item {
            width: 90%;
            border-radius: 15px;
            height: 2rem;
            background-color: var(--menu-item);
            white-space: nowrap;
            cursor: pointer;
            margin: .3rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background .4s;

            p {
                font-size: .8rem;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2rem;
                margin-right: .2rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--menu-item-hover);
                }
            }
        }
    }

    @media (max-width: 768px) {
        margin: 4rem .5rem;
    }
`;

export default memo(MessengerMenu);
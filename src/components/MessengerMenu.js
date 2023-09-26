import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { setMenuShow } from '../redux/appSlice';
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { FcSettings, FcRedo, FcInfo } from "react-icons/fc";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { menuVariants, menuItemVariants, menuIconVariants } from '../config/varitans';

const MessengerMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { menuShow, messageOptionsId } = useSelector(store => store.appStore);

    const { logout } = useAuth();

    const clickHandler = (type) => {
        dispatch(setMenuShow(false));
        if (type == "LOGOUT") {
            logout();
        } else if (type == "SETTINGS") {
            navigate("/settings");
        } else if (type == "GUIDANCE") {
            navigate("/guidance");
        }
    };

    useEffect(() => {
        dispatch(setMenuShow(false));
    }, [messageOptionsId]);

    return (
        <>
            <MessengerMenuContainer onHoverStart={() => dispatch(setMenuShow(true))} onHoverEnd={() => dispatch(setMenuShow(false))} openmenu={menuShow ? 1 : 0} initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                <AnimatePresence>
                    {menuShow ?
                    <motion.i key="back-icon" className='back-icon' onClick={() => dispatch(setMenuShow(false))} initial='hidden' animate='visible' exit='exit' variants={menuItemVariants}>
                        <FaArrowRight />
                    </motion.i>:
                    <motion.i key="menu-icon" className='menu-icon' onClick={() => dispatch(setMenuShow(true))} initial='hidden' animate='visible' exit='exit' variants={menuIconVariants}>
                        <HiDotsVertical />
                    </motion.i>}
                </AnimatePresence>

                <AnimatePresence>
                    {menuShow ?
                    <motion.div key="menu" className='list' initial='hidden' animate='visible' exit='exit' variants={menuItemVariants}>
                        <motion.button className='list-item' onClick={() => clickHandler("GUIDANCE")}>
                            <i className='features-icon'><FcInfo /></i>
                            <p>Guidance</p>
                        </motion.button>
                        <motion.button className='list-item' onClick={() => clickHandler("LOGOUT")}>
                            <i className='logout-icon'><FcRedo /></i>
                            <p>Logout</p>
                        </motion.button>
                        <motion.button className='list-item' onClick={() => clickHandler("SETTINGS")}>
                            <i><FcSettings /></i>
                            <p>Settings</p>
                        </motion.button>
                    </motion.div>
                    : ""}
                </AnimatePresence>
            </MessengerMenuContainer>
        </>
    );
};

const MessengerMenuContainer = styled(motion.div)`
    position: absolute;
    top: 1rem;
    right: 2.4rem;
    width: ${props => props.openmenu ? "7.2rem" : "2.5rem"};
    height: ${props => props.openmenu ? "9.4rem" : "2.5rem"};
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #ffffff18;
    border-radius: ${props => props.openmenu ? "25px" : "50px"};
    box-shadow: var(--shadow-second);
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    cursor: ${props => props.openmenu ? "" : "pointer"};
    user-select: none;
    overflow: hidden;
    z-index: 3;
    transition: width .4s cubic-bezier(.53,0,0,.98), height .4s cubic-bezier(.53,0,0,.98), ${props => props.openmenu ? "border-radius .2s" : "border-radius .2s .6s"};

    .back-icon, .menu-icon {
        position: absolute;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: var(--text-color-third);
    }

    .back-icon {
        position: absolute;
        top: .3rem;
        right: .3rem;
        padding: .4rem;
        font-size: 1.2rem;
        color: var(--text-color-second);
        transition: color .2s;

        &:hover {
            color: var(--text-color-third);
        }
    }

    .menu-icon {
        width: 2.4rem;
        height: 2.4rem;
        top: 0;
        right: 0;
        font-size: 1.5rem;
    }

    .list {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 2.3rem;

        .list-item {
            width: 90%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: .1rem 0;
            background-color: var(--button);
            border-radius: 50px;
            box-shadow: var(--shadow-second);
            color: var(--text-color-third);
            font-weight: var(--text-boldness-second);
            white-space: nowrap;
            cursor: pointer;
            transition: background .2s;

            p {
                font-size: .8rem;
                margin-left: 2.35rem;
                text-align: left;
                width: 100%;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.3rem;
                position: absolute;
                left: 1.2rem;
            }

            .logout-icon {
                transform: rotate(180deg);
            }

            .features-icon {
                font-size: 1.2rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--button-hover);
                }
            }
        }
    }

    @media (max-width: 500px) {
        right: .3rem;
    }
`;

export default memo(MessengerMenu);
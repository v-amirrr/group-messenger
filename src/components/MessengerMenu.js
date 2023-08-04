import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { setMenuShow } from '../redux/appSlice';
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { FcSettings, FcRedo } from "react-icons/fc";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { menuVariants, menuItemVariants, menuIconVariants } from '../config/varitans';

const MessengerMenu = () => {

    const dispatch = useDispatch();
    const { menuShow } = useSelector(store => store.appStore);

    const { logout } = useAuth();

    return (
        <>
            <MessengerMenuContainer openmenu={menuShow ? 1 : 0} initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                <AnimatePresence>
                    {menuShow ?
                    <motion.i key="back-icon" className='back-icon' onClick={() => dispatch(setMenuShow(false))} initial='hidden' animate='visible' exit='exit' variants={menuItemVariants}>
                        <FaArrowRight />
                    </motion.i> :
                    <motion.i key="menu-icon" className='menu-icon' onClick={() => dispatch(setMenuShow(true))} initial='hidden' animate='visible' exit='exit' variants={menuIconVariants}>
                        <HiDotsVertical />
                    </motion.i>}
                </AnimatePresence>

                <AnimatePresence>
                    {menuShow ?
                    <motion.div key="menu" className='list' initial='hidden' animate='visible' exit='exit' variants={menuItemVariants}>
                        <motion.button className='list-item' onClick={logout}>
                            <i className='logout-icon'><FcRedo /></i>
                            <p>Logout</p>
                        </motion.button>
                        <Link to="/settings">
                            <motion.button className='list-item'>
                                <i><FcSettings /></i>
                                <p>Settings</p>
                            </motion.button>
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
    top: 1rem;
    right: 2.4rem;
    width: ${props => props.openmenu ? "7.5rem" : "2.5rem"};
    height: ${props => props.openmenu ? "7.5rem" : "2.5rem"};
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border-first);
    border-radius: ${props => props.openmenu ? "25px" : "50px"};
    box-shadow: var(--shadow-second);
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    cursor: ${props => props.openmenu ? "" : "pointer"};
    user-select: none;
    overflow: hidden;
    z-index: 3;
    transition: width .5s cubic-bezier(.53,0,0,.98), height .5s cubic-bezier(.53,0,0,.98), ${props => props.openmenu ? "border-radius .2s" : "border-radius .2s .6s"};

    .back-icon, .menu-icon {
        position: absolute;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: var(--text-color-third);
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--button-hover);
            }
        }
    }

    .back-icon {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .45rem;
        padding: .4rem;
        font-size: 1.2rem;
    }

    .menu-icon {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        background-color: var(--button);
    }

    .list {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 2rem;

        a {
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
        }

        .list-item {
            width: 90%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: .3rem 0;
            background-color: var(--button);
            border-radius: 50px;
            box-shadow: var(--shadow-second);
            color: var(--text-color-third);
            font-weight: var(--text-boldness-second);
            white-space: nowrap;
            cursor: pointer;
            border-radius: ${props =>
                props.position == 0 ?
                    "20px" :
                    props.position == 1 ?
                    "20px 20px 20px 5px" :
                    props.position == 2 ?
                    "5px 20px 20px 5px" :
                    props.position == 3 &&
                    "5px 20px 20px 20px"
            };
            transition: background .2s;

            p {
                font-size: .8rem;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.4rem;
                margin-right: .2rem;
            }

            .logout-icon {
                transform: rotate(180deg);
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
        width: ${props => props.openmenu ? "9rem" : "3rem"};
        height: ${props => props.openmenu ? "8.8rem" : "3rem"};

        .back-icon {
            font-size: 1.5rem;
        }

        .menu-icon {
            font-size: 1.8rem;
        }

        .list {
            margin-top: 2.2rem;

            a {
                height: 2.5rem;
            }

            .list-item {
                height: 2.5rem;

                p {
                    font-size: 1rem;
                }

                i {
                    font-size: 1.8rem;
                }
            }
        }
    }
`;

export default memo(MessengerMenu);
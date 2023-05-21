import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import themeOneImageSRC from '../../assets/images/1.webp';
import themeTowImageSRC from '../../assets/images/2.webp';
import themeThreeImageSRC from '../../assets/images/3.webp';
import themeFourImageSRC from '../../assets/images/4.webp';
import { FcPicture } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const themesOpenVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themesCloseVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themesVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, staggerChildren: 0.2 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.6 } }
};

const SettingsBackgrounds = ({ open, setOpen }) => {

    const { theme } = useSelector(store => store.userStore);

    const { changeTheme } = useChangeTheme();

    return (
        <>
            <SettingsThemesContainer open={open == "SETINGS_BACKGROUND" ? 1 : 0} theme={theme}>
                <AnimatePresence exitBeforeEnter>
                    {open == "SETINGS_BACKGROUND" ? 
                    <motion.div key="theme-open" className='theme-open' initial='hidden' animate='visible' exit='exit' variants={themesOpenVariants}>
                        <motion.div className='themes' variants={themesVariants}>
                            <motion.div className='theme' onClick={() => changeTheme(1)} variants={themeVariants}>
                                <img src={themeOneImageSRC} />
                            </motion.div>
                            <motion.div className='theme' onClick={() => changeTheme(2)} variants={themeVariants}>
                                <img src={themeTowImageSRC} />
                            </motion.div>
                            <motion.div className='theme' onClick={() => changeTheme(3)} variants={themeVariants}>
                                <img src={themeThreeImageSRC} />
                            </motion.div>
                            <motion.div className='theme' onClick={() => changeTheme(4)} variants={themeVariants}>
                                <img src={themeFourImageSRC} />
                            </motion.div>
                        </motion.div>
                        <button className='theme-open-submit' onClick={() => setOpen(false)}>Done</button>
                    </motion.div> :
                    <motion.div key="theme-close" onClick={() => setOpen("SETINGS_BACKGROUND")} className='theme-close' initial='hidden' animate='visible' exit='exit' variants={themesCloseVariants}>
                        <i className='list-item-icon'><FcPicture /></i>
                        <p>Backgrounds</p>
                        <i className='list-item-back'><RiArrowRightSLine /></i>
                    </motion.div>}
                </AnimatePresence>
            </SettingsThemesContainer>
        </>
    );
};

const SettingsThemesContainer = styled.div`
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

    .theme-close {
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

    .theme-open {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        .theme-open-back {
            position: absolute;
            top: 0;
            left: 0;
            margin: .3rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 2rem;
            z-index: 99;
            cursor: pointer;
            background-color: var(--settings-back-hover);
            border-radius: 50%;
        }

        .themes {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 1rem 0 3rem 0;
            overflow: hidden scroll;

            .theme {
                border-radius: 20px;
                width: 80%;
                height: 8rem;
                margin: .4rem 0;
                cursor: pointer;
                border: solid 5px #ffffff00;
                transition: border .2s;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                }

                &:nth-child(1) {
                    border: ${props => props.theme == 1 ? "solid 5px #fff" : ""};
                }
    
                &:nth-child(2) {
                    border: ${props => props.theme == 2 ? "solid 5px #fff" : ""};
                }
    
                &:nth-child(3) {
                    border: ${props => props.theme == 3 ? "solid 5px #fff" : ""};
                }
    
                &:nth-child(4) {
                    border: ${props => props.theme == 4 ? "solid 5px #fff" : ""};
                }
            }
        }

        .theme-open-submit {
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

export default memo(SettingsBackgrounds);
import React, { useState } from 'react';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import themeOneImageSRC from '../../assets/images/1.webp';
import themeTowImageSRC from '../../assets/images/2.webp';
import themeThreeImageSRC from '../../assets/images/3.webp';
import themeFourImageSRC from '../../assets/images/4.webp';
import themeFiveImageSRC from '../../assets/images/5.webp';
import themeSixImageSRC from '../../assets/images/6.webp';
import themeSevenImageSRC from '../../assets/images/7.webp';
import { FcPicture } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import { TiArrowLeft } from "react-icons/ti";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const themesOpenVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4 } }
};

const themesCloseVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.2 } },
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

const SettingsThemes = () => {

    const { changeTheme } = useChangeTheme();

    const [open, setOpen] = useState(false);

    return (
        <>
            <SettingsThemesContainer open={open ? 1 : 0}>
                <AnimatePresence exitBeforeEnter>
                    {open ? 
                    <motion.div key="theme-open" className='theme-open' initial='hidden' animate='visible' exit='exit' variants={themesOpenVariants}>
                        <div className='theme-open-back' onClick={() => setOpen(false)}><TiArrowLeft /></div>
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
                            <motion.div className='theme' onClick={() => changeTheme(5)} variants={themeVariants}>
                                <img src={themeFiveImageSRC} />
                            </motion.div>
                            <motion.div className='theme' onClick={() => changeTheme(6)} variants={themeVariants}>
                                <img src={themeSixImageSRC} />
                            </motion.div>
                            <motion.div className='theme' onClick={() => changeTheme(7)} variants={themeVariants}>
                                <img src={themeSevenImageSRC} />
                            </motion.div>
                        </motion.div>
                    </motion.div> :
                    <motion.div key="theme-close" onClick={() => setOpen(true)} className='theme-close' initial='hidden' animate='visible' exit='exit' variants={themesCloseVariants}>
                        <i className='list-item-icon'><FcPicture /></i>
                        <p>Themes</p>
                        <i className='list-item-back'><RiArrowRightSLine /></i>
                    </motion.div>}
                </AnimatePresence>
            </SettingsThemesContainer>
        </>
    );
};

const SettingsThemesContainer = styled.div`
    width: ${props => props.open ? "80%" : "60%"};
    height: ${props => props.open ? "18rem" : "2rem"};
    border: ${props => props.open ? "solid 1px #ffffff00" : "solid 1px #ffffff11"};
    padding: ${props => props.open ? "" : "0 .5rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    cursor: ${props => props.open ? "" : "pointer"};
    overflow: hidden;
    position: relative;
    background-color: #ffffff08;
    transition: background .2s, border .2s, width 1s cubic-bezier(.53,0,0,.98), height 1s cubic-bezier(.53,0,0,.98), padding .2s;

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
            transition: font-size .2s;
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
            margin: .4rem;
            padding: .1rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 2rem;
            z-index: 99;
            cursor: pointer;
            background-color: #ffffff11;
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
            padding: 2rem 0;
            overflow: hidden scroll;

            .theme {
                border-radius: 20px;
                width: 70%;
                height: 8rem;
                margin: .4rem 0;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                }
            }
        }

    }
    
    &:hover {
        border: ${props => props.open ? "" : "solid 1px #ffffff00"};

        .list-item-back {
            font-size: 2rem;
        }
    }
`;

export default SettingsThemes;
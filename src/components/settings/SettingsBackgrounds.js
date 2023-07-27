import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import themeOneImageSRC from '../../assets/images/1.webp';
import themeTowImageSRC from '../../assets/images/2.webp';
import themeThreeImageSRC from '../../assets/images/3.webp';
import themeFourImageSRC from '../../assets/images/4.webp';
import { FcGallery } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundsVariants, backgroundVariants } from '../../config/varitans';

const SettingsBackgrounds = ({ open, setOpen }) => {

    const { theme } = useSelector(store => store.appStore);

    const { changeTheme } = useChangeTheme();

    const itemSwitch = () => {
        if (open == "SETTINGS_BACKGROUND") {
            setOpen(false);
        } else {
            setOpen("SETTINGS_BACKGROUND");
        }
    };

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcGallery /></i>
                <h4>Backgrounds</h4>
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence exitBeforeEnter>
                {
                    open== "SETTINGS_BACKGROUND" ?
                    <div key="item-data" className='item-data'>
                        <BackgroundsContainer theme={theme} initial='hidden' animate='visible' exit='exit' variants={backgroundsVariants}>
                            <motion.div className='background' onClick={() => changeTheme(1)} variants={backgroundVariants}>
                                <img src={themeOneImageSRC} />
                            </motion.div>
                            <motion.div className='background' onClick={() => changeTheme(2)} variants={backgroundVariants}>
                                <img src={themeTowImageSRC} />
                            </motion.div>
                            <motion.div className='background' onClick={() => changeTheme(3)} variants={backgroundVariants}>
                                <img src={themeThreeImageSRC} />
                            </motion.div>
                            <motion.div className='background' onClick={() => changeTheme(4)} variants={backgroundVariants}>
                                <img src={themeFourImageSRC} />
                            </motion.div>
                        </BackgroundsContainer>
                    </div>
                    : ""
                }
            </AnimatePresence>
        </>
    );
};

const BackgroundsContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 5rem;
    padding-bottom: 3rem;
    overflow: hidden scroll;

    /* width */
    ::-webkit-scrollbar {
        width: .3rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 50px;
        background: #ffffff04;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #ffffff14;
        border-radius: 50px;
    }

    .background {
        border-radius: 20px;
        width: 80%;
        height: 8rem;
        margin: .2rem 0;
        cursor: pointer;
        border: solid 5px #ffffff00;
        transition: border .2s;

        img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
        }

        &:nth-child(1) {
            border: ${props => props.theme == 1 ? "solid 3px #fff" : ""};
        }

        &:nth-child(2) {
            border: ${props => props.theme == 2 ? "solid 3px #fff" : ""};
        }

        &:nth-child(3) {
            border: ${props => props.theme == 3 ? "solid 3px #fff" : ""};
        }

        &:nth-child(4) {
            border: ${props => props.theme == 4 ? "solid 3px #fff" : ""};
        }
    }
`;

export default memo(SettingsBackgrounds);
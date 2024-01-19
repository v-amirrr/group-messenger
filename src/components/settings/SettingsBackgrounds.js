import React from 'react';
import { useSelector } from 'react-redux';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import themeTowImageSRC from '../../assets/images/2.webp';
import themeThreeImageSRC from '../../assets/images/3.webp';
import themeFourImageSRC from '../../assets/images/4.webp';
import { FcGallery } from 'react-icons/fc';
import { RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundsSettingsVariants } from '../../config/varitans';

const SettingsBackgrounds = ({ open, setOpen, setHeight }) => {
    const { theme } = useSelector(store => store.appStore);
    const { changeTheme } = useChangeTheme();

    const itemSwitch = () => {
        if (open == 'SETTINGS_BACKGROUND') {
            setOpen(false);
        } else {
            setOpen('SETTINGS_BACKGROUND');
            setHeight(24);
        }
    };

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'>
                    <FcGallery />
                </i>
                <h4>Backgrounds</h4>
                <i className='item-back'>
                    <RiArrowRightSLine />
                </i>
            </div>

            <AnimatePresence>
                {
                    open == 'SETTINGS_BACKGROUND' ?
                    <BackgroundsContainer
                        theme={theme}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={backgroundsSettingsVariants}
                    >
                        <div className='background' onClick={() => changeTheme(1)}>
                            <img src={themeTowImageSRC} />
                            <div className='select'>
                                <span className='checkmark-one'></span>
                                <span className='checkmark-two'></span>
                            </div>
                        </div>
                        <div className='background' onClick={() => changeTheme(2)}>
                            <img src={themeThreeImageSRC} />
                            <div className='select'>
                                <span className='checkmark-one'></span>
                                <span className='checkmark-two'></span>
                            </div>
                        </div>
                        <div className='background' onClick={() => changeTheme(3)}>
                            <img src={themeFourImageSRC} />
                            <div className='select'>
                                <span className='checkmark-one'></span>
                                <span className='checkmark-two'></span>
                            </div>
                        </div>
                    </BackgroundsContainer>
                    : ''
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

    .background {
        border-radius: 25px;
        width: 80%;
        height: 8rem;
        margin: 0.2rem 0;
        cursor: pointer;
        border: solid 3px #ffffff20;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            border-radius: 25px;
            filter: blur(5px);
        }

        .select {
            position: absolute;
            top: .4rem;
            right: .4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff15;
            border-radius: 50%;
            z-index: 999;
            width: 1.3rem;
            height: 1.3rem;
            transition: opacity .4s;

            .checkmark-one {
                margin: .3rem .18rem 0 0;
                transform: rotate(-40deg);
                background-color: #00b7ff;
                border-radius: 50px;
                width: .12rem;
                height: .35rem;
            }

            .checkmark-two {
                margin: .1rem .1rem 0 0;
                transform: rotate(45deg);
                background-color: #00b7ff;
                border-radius: 50px;
                width: .12rem;
                height: .7rem;
            }
        }

        &:nth-child(1) {
            .select {
                opacity: ${props => props.theme == 1 ? '1' : '0'};
            }
        }

        &:nth-child(2) {
            .select {
                opacity: ${props => props.theme == 2 ? '1' : '0'};
            }
        }

        &:nth-child(3) {
            .select {
                opacity: ${props => props.theme == 3 ? '1' : '0'};
            }
        }
    }
`;

export default SettingsBackgrounds;

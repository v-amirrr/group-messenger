import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backgroundTowImageSRC from '../assets/images/2.webp';
import backgroundThreeImageSRC from '../assets/images/3.webp';
import backgroundFourImageSRC from '../assets/images/4.webp';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundImageVariants } from '../config/varitans';

const MessengerBackground = () => {
    const location = useLocation();
    const { theme } = useSelector((store) => store.appStore);
    const { popupShow } = useSelector((store) => store.popupStore);

    return (
        <>
            <CoverContainer cover={location.pathname == '/warning' || location.pathname == '/enter' || location.pathname == '/login' || location.pathname == '/signup'}></CoverContainer>
            <BackgroundContainer scale={popupShow || location.pathname == '/warning' || location.pathname == '/settings' || location.pathname == '/guidance' || location.pathname == '/enter' || location.pathname == '/login' || location.pathname == '/signup'}>
                <AnimatePresence exitBeforeEnter>
                    {
                        theme == 1 ?
                        <motion.img
                            src={backgroundTowImageSRC}
                            key='first-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        /> : theme == 2 ?
                        <motion.img
                            src={backgroundThreeImageSRC}
                            key='second-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        /> : theme == 3 ?
                        <motion.img
                            src={backgroundFourImageSRC}
                            key='third-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        /> : ''
                    }
                </AnimatePresence>
            </BackgroundContainer>
        </>
    );
};

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${props => props.scale ? "scale(1.1)" : "scale(1)"};
    transition: transform 1s cubic-bezier(.53,0,0,.98);

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        z-index: -3;
    }

    @media (max-width: 768px) {
        transform: scale(1);

        img {
            position: absolute;
            width: 100vh !important;
            height: 100vw !important;
            transform: rotate(90deg) !important;
        }
    }
`;

const CoverContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.cover ? "#000000aa" : "#00000066"};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: background 1s .2s cubic-bezier(.53,0,0,.98);
`;

export default MessengerBackground;

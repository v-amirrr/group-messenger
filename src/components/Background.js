import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backgroundTowImageSRC from '../assets/images/2.webp';
import backgroundThreeImageSRC from '../assets/images/3.webp';
import backgroundFourImageSRC from '../assets/images/4.webp';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundImageVariants } from '../config/varitans';

const Background = () => {
    const location = useLocation();
    const { theme } = useSelector(store => store.appStore);
    const { loading } = useSelector(store => store.firestoreStore);
    return (
        <>
            <CoverContainer cover={location.pathname == '/warning' || location.pathname == '/login' || loading}></CoverContainer>
            <BackgroundContainer>
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
                        /> :
                        theme == 2 ?
                        <motion.img
                            src={backgroundThreeImageSRC}
                            key='second-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        /> :
                        theme == 3 ?
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
    width: 100vw;
    height: 100vh;
    z-index: -2;
    filter: blur(20px);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        z-index: -3;
    }

    @media (max-width: 768px) {
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
    background-color: ${props => props.cover ? "#000000dd" : "#000000aa"};
    position: absolute;
    z-index: -1;
    transition: background 1s .2s cubic-bezier(.53,0,0,.98);

    @media (max-width: 768px) {
        background-color: ${props => props.cover ? "#000000aa" : "#00000055"};
    }
`;

export default Background;

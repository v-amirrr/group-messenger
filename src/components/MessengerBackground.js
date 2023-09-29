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

    return (
        <>
            <BackgroundContainer cover={location.pathname == '/warning' || location.pathname == '/enter' || location.pathname == '/login' || location.pathname == '/signup'}>
                <motion.div className='cover'></motion.div>
                <AnimatePresence exitBeforeEnter>
                    {theme == 1 ? (
                        <motion.img
                            src={backgroundTowImageSRC}
                            key='first-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        />
                    ) : theme == 2 ? (
                        <motion.img
                            src={backgroundThreeImageSRC}
                            key='second-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        />
                    ) : theme == 3 ? (
                        <motion.img
                            src={backgroundFourImageSRC}
                            key='third-image'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        />
                    ) : (
                        ''
                    )}
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
    z-index: -1;
    filter: blur(20px);

    .cover {
        width: 100vw;
        height: 100vh;
        background-color: ${props => props.cover ? "#000000aa" : "#ffffff00"};
        position: absolute;
        top: 0;
        left: 0;
        transition: background 1s .2s cubic-bezier(.53,0,0,.98);
    }

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
    }
`;

export default MessengerBackground;

import React from 'react';
import { useSelector } from 'react-redux';
import backgroundTowImageSRC from '../assets/images/2.webp';
import backgroundThreeImageSRC from '../assets/images/3.webp';
import backgroundFourImageSRC from '../assets/images/4.webp';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundImageVariants } from '../config/varitans';

const MessengerBackground = () => {
    const { theme } = useSelector((store) => store.appStore);

    return (
        <>
            <Background>
                <AnimatePresence exitBeforeEnter>
                    {theme == 1 ? (
                        <motion.img
                            src={backgroundTowImageSRC}
                            key='image-two'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        />
                    ) : theme == 2 ? (
                        <motion.img
                            src={backgroundThreeImageSRC}
                            key='image-three'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        />
                    ) : theme == 3 ? (
                        <motion.img
                            src={backgroundFourImageSRC}
                            key='image-four'
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={backgroundImageVariants}
                        />
                    ) : (
                        ''
                    )}
                </AnimatePresence>
            </Background>
        </>
    );
};

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    filter: blur(var(--background-blur));

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
    }
`;

export default MessengerBackground;

import React from 'react';
import { useSelector } from 'react-redux';
import backgroundOneImageSRC from '../assets/images/1.webp';
import backgroundTowImageSRC from '../assets/images/2.webp';
import backgroundThreeImageSRC from '../assets/images/3.webp';
import backgroundFourImageSRC from '../assets/images/4.webp';
import backgroundFiveImageSRC from '../assets/images/5.webp';
import backgroundSixImageSRC from '../assets/images/6.webp';
import backgroundSevenImageSRC from '../assets/images/7.webp';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const backgroundImageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const MessengerBackground = () => {

    const { theme } = useSelector(store => store.userStore);

    return (
        <>
            <Background>
                <AnimatePresence exitBeforeEnter>
                    {theme == 1 ?
                    <motion.img src={backgroundOneImageSRC} key="image-one" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> :
                    theme == 2 ?
                    <motion.img src={backgroundTowImageSRC} key="image-two" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> :
                    theme == 3 ?
                    <motion.img src={backgroundThreeImageSRC} key="image-three" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> :
                    theme == 4 ?
                    <motion.img src={backgroundFourImageSRC} key="image-four" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> :
                    theme == 5 ?
                    <motion.img src={backgroundFiveImageSRC} key="image-five" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> :
                    theme == 6 ?
                    <motion.img src={backgroundSixImageSRC} key="image-six" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> :
                    theme == 7 ?
                    <motion.img src={backgroundSevenImageSRC} key="image-seven" initial='hidden' animate='visible' exit='exit' variants={backgroundImageVariants} /> 
                    : ""}
                </AnimatePresence>
            </Background>
        </>
    );
};

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(10px);

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
    }
`;

export default MessengerBackground;
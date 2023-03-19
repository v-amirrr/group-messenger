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

const MessengerBackground = () => {

    const { theme } = useSelector(store => store.userStore);

    return (
        <>
            <Background>
                {theme == 1 ?
                <img src={backgroundOneImageSRC} /> :
                theme == 2 ?
                <img src={backgroundTowImageSRC} /> :
                theme == 3 ?
                <img src={backgroundThreeImageSRC} /> :
                theme == 4 ?
                <img src={backgroundFourImageSRC} /> :
                theme == 5 ?
                <img src={backgroundFiveImageSRC} /> :
                theme == 6 ?
                <img src={backgroundSixImageSRC} /> :
                theme == 7 ?
                <img src={backgroundSevenImageSRC} /> 
                : ""}
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
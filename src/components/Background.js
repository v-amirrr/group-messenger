import React from 'react';
import backgroundImageSRC from '../assets/images/r.jpg';
import styled from 'styled-components';

const Background = () => {
    return (
        <>
            <BackgroundContainer>
                <div></div>
                <img src={backgroundImageSRC} />
            </BackgroundContainer>
        </>
    );
};

const BackgroundContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    filter: blur(30px);
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        background-color: #00000088;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    img {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        z-index: -3;
    }

    @media (max-width: 768px) {
        div {
            background-color: #00000000;
        }

        img {
            position: absolute;
            width: 100vh !important;
            height: 100vw !important;
            transform: rotate(90deg) !important;
        }
    }
`;

export default Background;

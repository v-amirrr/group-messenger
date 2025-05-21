import React from 'react';
import backgroundImageSRC from '../assets/images/c.jpg';
import styled from 'styled-components';

const Background = () => {
    return (
        <>
            <BackgroundContainer>
                <div className='layer'></div>
                <img className='image' src={backgroundImageSRC} />
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

    .layer {
        background-color: #000000cc;
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .image {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        z-index: -3;
    }

    @media (max-width: 768px) {
        .layer {
            background-color: #00000000;
        }

        .image {
            position: absolute;
            width: 100vh !important;
            height: 100vw !important;
            transform: rotate(90deg) !important;
        }
    }
`;

export default Background;

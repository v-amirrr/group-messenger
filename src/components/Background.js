import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backgroundImageSRC from '../assets/images/r.jpg';
import styled from 'styled-components';

const Background = () => {
    const location = useLocation();
    const { loading } = useSelector(store => store.firestoreStore);
    return (
        <>
            <CoverContainer cover={location.pathname == '/warning' || location.pathname == '/login' || loading}></CoverContainer>
            <BackgroundContainer>
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
    position: absolute;
    z-index: -1;
    transition: background .8s;
    background-color: ${props => props.cover ? "#000000aa" : "#00000088"};

    @media (max-width: 768px) {
        background-color: ${props => props.cover ? "#000000aa" : "#00000055"};
    }
`;

export default Background;

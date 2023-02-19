import React from 'react';
import Messenger from './components/Messenger';
import Modals from './components/Modals';
import backgroundSRC from './assets/images/bg.webp';
import styled from 'styled-components';

const App = () => {
    return (
        <>
            <Modals />
            <Messenger />
            <Background><img src={backgroundSRC} /></Background>
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

export default App;
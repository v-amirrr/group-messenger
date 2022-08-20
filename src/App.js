import React from 'react';

import styled from 'styled-components';

import Messenger from "./components/Messenger";

const App = () => {
    return (
        <>
            <Background><img src='/img/bg.jpg' /></Background>
            <Messenger />
        </>
    );
};

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: -5;
    position: absolute;
    inset: 0 0 0 0;
    filter: blur(30px);

    img {
        width: 100%;
        height: 100%;
    }
`;

export default App;
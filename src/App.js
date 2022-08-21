import React from 'react';

// import styled from 'styled-components';

import Messenger from "./components/Messenger";
import PopUp from './components/PopUp';

const App = () => {
    return (
        <>
            {/* <Background><img src='/img/bg.jpg' /></Background> */}
            <PopUp />
            <Messenger />
        </>
    );
};

// const Background = styled.div`
//     width: 100vw;
//     height: 100vh;
//     z-index: -5;
//     position: absolute;
//     inset: 0 0 0 0;
//     filter: blur(30px);

//     img {
//         width: 100vw;
//         height: 100vh;
//     }
// `;

export default App;
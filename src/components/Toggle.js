import React from 'react';
import styled from 'styled-components';

const Toggle = ({ toggleHandler, toggleValue }) => {
    return (
        <>
            <ToggleContainer
                onClick={toggleHandler}
                toggle={toggleValue ? 1 : 0}
                className='toggle'
            >
                <span></span>
            </ToggleContainer>
        </>
    );
};

const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 50px;
    width: 2rem;
    height: 1.2rem;
    background-color: ${(props) => (props.toggle ? '#00ff00' : '#ffffff20')};
    cursor: pointer;
    transition: background 0.2s;

    span {
        position: absolute;
        left: ${(props) => (props.toggle ? '43%' : '8%')};
        border-radius: 50px;
        width: 1rem;
        height: 1rem;
        background-color: ${(props) => (props.toggle ? '#fff' : '#ffffff20')};
        box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: left 0.1s, background 0.2s;
    }
`;

export default Toggle;

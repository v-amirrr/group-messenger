import React from 'react';
import styled from 'styled-components';

const Toggle = ({ toggleHandler, toggleValue, scale }) => {
    return (
        <>
            <ToggleContainer
                className='toggle'
                onClick={toggleHandler}
                toggle={toggleValue ? 1 : 0}
                scale={scale}
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
    height: 1.15rem;
    background-color: ${props => props.toggle ? 'var(--blue)' : '#ffffff20'};
    cursor: pointer;
    transition: background .2s;
    transform: ${props => `scale(${props.scale})`};

    span {
        position: absolute;
        left: ${props => !props.toggle ? '-3%' : '39%'};
        margin: .2rem;
        border-radius: 50%;
        width: .9rem;
        height: .9rem;
        background-color: ${props => props.toggle ? 'var(--text)' : 'var(--bg-hover)'};
        box-shadow: var(--shadow);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: left .2s cubic-bezier(0.53, 0, 0, 0.98), background .2s;
    }
`;

export default Toggle;

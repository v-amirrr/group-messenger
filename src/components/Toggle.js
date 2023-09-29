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
    background-color: ${(props) => (props.toggle ? 'var(--green-color)' : '#ffffff20')};
    cursor: pointer;
    transition: background 0.2s;

    span {
        position: absolute;
        left: ${(props) => (!props.toggle ? '0' : '35%')};
        margin: .2rem;
        border-radius: 50%;
        width: .9rem;
        height: .9rem;
        background-color: ${(props) => (props.toggle ? 'var(--normal-color)' : '#ffffff20')};
        box-shadow: var(--bold-shadow);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: left 0.2s, background 0.2s;
    }
`;

export default Toggle;

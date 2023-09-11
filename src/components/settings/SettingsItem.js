import React from 'react';
import styled from 'styled-components';

const SettingsItem = ({ open, openValue, component, height }) => {
    return (
        <>
            <SettingsItemContainer open={open == openValue ? 1 : 0} height={height}>
                {component}
            </SettingsItemContainer>
        </>
    );
};

const SettingsItemContainer = styled.div`
    width: 65%;
    height: ${props => props.open ? `${props.height}rem` : "2.2rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: var(--border-first);
    border-radius: ${props => props.open ? "15px" : "50px"};
    overflow: hidden;
    position: relative;
    margin: .15rem;
    background-color: var(--settings-item);
    box-shadow: var(--shadow-first);
    transition: ${props => props.open ? "height .6s, border-radius .1s" : "height .4s, border-radius 2s"}, background .2s;

    .item-header {
        position: absolute;
        top: ${props => props.open ? ".5rem" : "23%"};
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: ${props => props.open ? "var(--border-first)" : "solid .1px #ffffff00"};
        padding: 0 .5rem .4rem .8rem;
        z-index: 2;
        cursor: pointer;
        transition: ${props => props.open ? "top .1s" : "top .4s .6s"}, border-bottom .4s;

        .item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .5rem;
        }

        h4 {
            font-size: .9rem;
            font-weight: 600;
        }

        .item-back {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: absolute;
            right: .4rem;
            transform: ${props => props.open ? "rotate(90deg)" : ""};
            transition: transform .4s;
        }

        .deleted-messages-counter {
            margin: 0 .3rem;
            font-size: .6rem;
            font-weight: 600;
            width: 1rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: #ff0000;
        }
    }

    .item-data {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        /* &:hover {
            background-color: ${props => props.open ? "" : "var(--settings-item-hover)"};
        } */
    }
`;

export default SettingsItem;
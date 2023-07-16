import React from 'react';
import styled from 'styled-components';

const SettingsItem = ({ open, openValue, component }) => {
    return (
        <>
            <SettingsItemContainer open={open == openValue ? 1 : 0}>
                {component}
            </SettingsItemContainer>
        </>
    );
};

const SettingsItemContainer = styled.div`
    width: 65%;
    height: ${props => props.open ? "18rem" : "2.2rem"};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    margin: .3rem;
    background-color: var(--settings-item);
    transition: height .6s cubic-bezier(.53,0,0,.98), background .3s;

    .item-header {
        padding: 0 .5rem .5rem .5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        position: absolute;
        top: ${props => props.open ? "3%" : "23%"};
        border-bottom: ${props => props.open ? "solid .1px #ffffff22" : "solid .1px #ffffff00"};
        z-index: 2;
        cursor: pointer;
        transition: ${props => props.open ? "top .4s" : "top .4s .2s"}, border-bottom .4s;

        .item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .4rem;
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
            margin: 0 .5rem;
            font-size: .7rem;
            width: .9rem;
            height: .9rem;
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
        &:hover {
            background-color: ${props => props.open ? "" : "var(--settings-item-hover)"};
        }
    }
`;

export default SettingsItem;